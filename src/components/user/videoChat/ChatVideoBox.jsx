import React, { useContext, useEffect, useRef, useState } from 'react'
import Peer from "simple-peer"
import { SocketContext } from '../../../store/redux/slices/SocketContext';
import { CopyToClipboard } from "react-copy-to-clipboard"
import { useLocation } from 'react-router-dom';


const ChatVideoBox = () => {
    const { sendDataToServer, socket, onlineUsers, mySocketId } = useContext(SocketContext);
    const [me, setMe] = useState("");
    const [stream, setStream] = useState();
    const [caller, setcaller] = useState("");
    const [callerSignal, setCallerSignal] = useState("");
    const [idToCall, SetIdToCall] = useState("")
    const [callAccept, setCallAccept] = useState(false)
    const [callRecieve, setCallRecieve] = useState(false)
    const [callEnd, setCallEnd] = useState(false);
    const [name, Setname] = useState('')
    const { state } = useLocation()
    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()
    console.log(state);
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                setStream(stream);
                if (myVideo.current) {
                    myVideo.current.srcObject = stream;
                }
            });
        console.log(mySocketId);
        socket?.on("me", (id) => {
            console.log("reached");
            console.log("socket id " + id);
            setMe(id)
        })
        socket?.on('offer', (offerSignal) => {
            console.log("reached here maaaaaaan");
            // Handle the offer signal here
        });
        socket?.on("callUser", (data) => {
            console.log(data);
            setCallRecieve(true);
            setcaller(data.from);
            Setname(data.name);
            setCallerSignal(data.signal);
        });
    }, [socket]);
    const callHandle = (id) => {
        console.log(id);
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        });

        socket.emit("sendCalling", { msg: `Video from  ...  `, recieverId:state })
        peer.on("signal", (data) => {
            socket.emit("callUser", {
                userToCall: state,
                signalData: data,
                from: mySocketId,
                name: name
            });
        });

        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream
        })

        socket.on("callAccepted", (signal) => {
            setCallAccept(true)
            peer.signal(signal)
        })
        connectionRef.current = peer;
    };

    const answerCall = () => {
        setCallAccept(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        });

        peer.on("signal", (data) => {
            socket.emit("answerCall", {
                signal: data,
                to: caller
            });
        });
        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream
        })

        peer.signal(callerSignal);

        connectionRef.current = peer;
    };

    const endCall = () => {
        setCallEnd(true);
        if (connectionRef.current) {
            connectionRef.current.destroy();
        }
    };
    return (
        <div className='w-[80%] m-auto h-[80vh] mt-3'>
            <div className='h-[75vh] m-auto w-[40rem] border-dashed border-[3px] flex gap-10 relative border-[#1567A3] rounded-md mt-3'>
                {stream && <video playsInline muted ref={myVideo} autoPlay className='w-full'> </video>}
                {
                    callAccept ?
                        <video playsInline muted  ref={userVideo} autoPlay className='w-[50%] absolute h-[20vh] top-0 left-0 z-10'> </video> : ""
                }

            </div>
            <div className="call-button flex gap-10  m-auto w-[80%]">
                <div className="wrapper   w-[60%] mx-auto">

                    <div className='mt-3'>

                        <CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
                            <button className='py-2 px-5 rounded-lg bg-secondary text-white'>Copy Id</button>
                        </CopyToClipboard>
                        <input
                            hidden
                            className='border-2 border-gray-300'
                            id="filled-basic"
                            label="Name"
                            value={name}
                            onChange={(e) => Setname(e.target.value)}
                        />
                    </div>

                    <input onChange={(e) => SetIdToCall(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    {callAccept && !callEnd ? (
                        <button className=' bg-red-500 py-3 px-7 ml-3  rounded-lg text-white' onClick={endCall}>leave Call</button>
                    ) : (

                        <button className='bg-secondary py-3 px-7 ml-3  rounded-lg text-white' onClick={() => callHandle(idToCall)}>Call</button>

                    )}
                    {/* {idToCall} */}
                </div>

            </div>
            <div className='absolute top-[78%] left-[58%]'>
                {callRecieve && !callAccept ? (
                    <div className="calle gap-3 items-center flex ">
                        <h1 className='capitalize' >{name} dilshad is calling...</h1>
                        <button className='bg-green-500  py-3 px-5 rounded-lg' onClick={answerCall}>
                            Answer
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default ChatVideoBox