import React, { useContext, useEffect, useRef, useState } from "react";
import Peer from "simple-peer/simplepeer.min.js";
import { SocketContext } from "../../../store/redux/slices/SocketContext";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setCallerId,
  setCallStatus,
} from "../../../store/redux/slices/DoctorSlice";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import CallEndIcon from "@mui/icons-material/CallEnd";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import CallIcon from "@mui/icons-material/Call";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import DuoIcon from "@mui/icons-material/Duo";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import ChatIcon from "@mui/icons-material/Chat";
import { currentUser } from "../../../services/hooks/CuurentUser";
const ChatVideoBox = () => {
  const { isDoctor, isCalling, callerId, callingStatus } = useSelector(
    (state) => state.doctor
  );
  const { sendDataToServer, socket, onlineUsers, mySocketId } =
    useContext(SocketContext);
  const dispatch = useDispatch();
  const userId = currentUser();
  const [hide, setHide] = useState(false);
  const [callingPeer, SetcallingPeer] = useState(false);
  const [me, setMe] = useState("");
  const [meCalling, setCallingMe] = useState("");
  const [mute, setMute] = useState(false);
  const [stream, setStream] = useState(true);
  const [caller, setcaller] = useState("");
  const [callerSignal, setCallerSignal] = useState("");
  const [idToCall, SetIdToCall] = useState("");
  const [callAccept, setCallAccept] = useState(false);
  const [callRecieve, setCallRecieve] = useState(false);
  const [callEnd, setCallEnd] = useState(false);
  const [name, Setname] = useState("");
  const { state } = useLocation();
  const [userStream, setUserStream] = useState();
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef(null);
  const navigate = useNavigate();
  console.log(state, "state is  here");

  useEffect(() => {
    console.log(myVideo.current);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        myVideo.current.srcObject = stream;

        setStream(stream);
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
      });
    socket?.on("me", (id) => {
      console.log("reached");
      console.log("socket id " + id);
      setMe(id);
    });
    socket?.on("offer", (offerSignal) => {
      // console.log("reached here maaaaaaan");
    });

    socket?.on("endVideoCall", () => {
      endCall();
    });
    socket?.on("callUser", (data) => {
      setCallRecieve(true);
      setcaller(data.from);
      Setname(data.name);
      setCallerSignal(data.signal);
    });
  }, [socket]);

  const callHandle = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    dispatch(setCallerId(state));
    dispatch(setCallStatus(true));
    console.log("iam calling to this number:" + state);
    socket.emit("sendCalling", { msg: `Video from  ...  `, recieverId: state });
    peer.on("signal", (data) => {
      console.log(state, "statis is here man");
      console.log("this is data");
      console.log(data);
      socket.emit("callUser", {
        userToCall: state,
        signalData: data,
        from: mySocketId,
        name: name,
      });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccept(true);
      peer.signal(signal);
    });
    SetcallingPeer(true);
    setCallingMe(state);
    connectionRef.current = peer;
  };
  const answerCall = () => {
    setCallAccept(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", {
        signal: data,
        to: caller,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);

    connectionRef.current = peer;
  };

  const endCall = () => {
    setCallEnd(true);
    dispatch(setCallStatus(false));
    if (connectionRef.current) {
      console.log("ended ya hooo");
      connectionRef.current.destroy();
    }
    socket.emit("videoEnd", {
      userToCall: state,
    });
    console.log("dilshad");
    isDoctor
      ? navigate("/doctor/chat?callEnd=true", {
          replace: true,
          state: { endcall: true },
        })
      : navigate("/chat_doctors?callEnd=true", {
          replace: true,
          state: { endcall: true },
        });
  };

  const hideCamera = () => {
    setHide(true);
    const stream = myVideo.current.srcObject;
    if (stream) {
      const tracks = (stream.getTracks()[1].enabled = false);
    }
  };
  const showCamera = () => {
    setHide(false);
    if (stream) {
      console.log(stream.getTracks());
      const tracks = (stream.getTracks()[1].enabled = true);
    }
  };
  const muteAudio = () => {
    setMute(false);
  };
  const unMuteAudio = () => {
    setMute(true);
  };
  // console.log("myVideo",myVideo.current);
  console.log("me calling", meCalling);
  console.log("this is satte", state);

  return (
    <div className="w-[100%] m-auto h-[80vh] mt-3">
      <div className="w-[100%] md:w-[60%] m-auto h-[70vh] mt-3">
        <div className="h-[65vh] m-auto full flex gap-10 relative rounded-md mt-3">
          {stream && (
            <video
              playsInline
              muted={!mute ? true : false}
              ref={myVideo}
              autoPlay
              className={`w-[40%] border-[5px]  h-[20vh] absolute top-0 left-0 z-10 object-cover ${
                callAccept
                  ? "lg:w-[21vw] lg:h-[40%] z-[999]"
                  : "w-full h-full  object-cover rounded-md "
              }`}
            ></video>
          )}
          {callAccept && (
            <video
              playsInline
              muted={!mute ? true : false}
              ref={userVideo}
              autoPlay
              className="w-full h-full border-[5px]  bg-black object-cover rounded-md  lg:w-[100%] md:h-[100%] lg:z-50"
            ></video>
          )}
        </div>
      </div>

      <div className="call-button flex gap-10  m-auto w-[80%]">
        <div className="wrapper   flex  justify-center w-[60%] mx-auto">
          {callAccept && !callEnd ? (
            <div className=" flex gap-5">
              <div className=" bg-red-500 flex items-center justify-center rounded-xl px-2">
                <CallEndIcon
                  onClick={endCall}
                  className="text-white"
                  style={{ fontSize: "3rem" }}
                />
              </div>
              {mute ? (
                <div className=" bg-blue-500 flex items-center justify-center rounded-xl px-2">
                  <VolumeUpIcon
                    onClick={muteAudio}
                    className="text-white"
                    style={{ fontSize: "3rem" }}
                  />
                </div>
              ) : (
                <div className=" bg-blue-500 flex items-center justify-center rounded-xl px-2">
                  <VolumeOffIcon
                    onClick={unMuteAudio}
                    className="text-white"
                    style={{ fontSize: "3rem" }}
                  />
                </div>
              )}

              {!hide ? (
                <div className="bg-blue-500 items-center flex justify-center rounded-xl px-2">
                  <VideoCameraBackIcon
                    className="text-white bg-blue-500"
                    onClick={hideCamera}
                    style={{ fontSize: "3rem" }}
                  />
                </div>
              ) : (
                <div className=" bg-blue-500 flex items-center justify-center rounded-xl px-2">
                  <VideocamOffIcon
                    className=" text-white"
                    onClick={showCamera}
                    style={{ fontSize: "3rem" }}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className=" bg-green-500 flex items-center justify-center rounded-xl px-2">
              {isDoctor && (
                <CallIcon
                  className="text-white"
                  onClick={() => callHandle(idToCall)}
                  style={{ fontSize: "3rem" }}
                />
              )}
            </div>
          )}
          {/* {idToCall} */}
        </div>
      </div>
      <div className="absolute top-[73%] left-[25%] md:left-[40%] ">
        {/* mnaging calls */}
        {callRecieve && !callAccept && !isDoctor ? (
          <div className="calle gap-5 items-center flex  flex-col  ">
            <h1 className="capitalize font-semibold animate-">Calling....</h1>
            <div className="flex gap-7">
              <div className=" bg-gray-400 flex items-center justify-center rounded-xl px-2">
                <CallEndIcon
                  onClick={endCall}
                  className="text-white"
                  style={{ fontSize: "2.5rem" }}
                />
              </div>

              <div className="bg-blue-500 rounded-xl py-1 px-2 animate-bounce">
                <DuoIcon
                  onClick={answerCall}
                  className="text-white  "
                  style={{ fontSize: "2.5rem" }}
                />
              </div>
              <div className=" bg-gray-400 flex items-center justify-center rounded-xl px-2">
                <ChatIcon
                  className="text-white"
                  style={{ fontSize: "2.5rem" }}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ChatVideoBox;
