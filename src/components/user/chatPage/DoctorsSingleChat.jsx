import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useEffect, useId, useRef, useState } from "react";
import { getAllMessage, sendMessage } from "../../../services/api/userRoute";
import { singleuser } from "../../../services/api/adminRoute";
import { currentUser } from "../../../services/hooks/CuurentUser";
import { SocketContext } from "../../../store/redux/slices/SocketContext";
import { format } from "timeago.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import VideoChatButton from "./VideoChatButton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { openEditor } from "react-profile";
import "react-profile/themes/default";
import axios from "axios";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import VoiceRecordePage from "./VoiceRecordePage";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteChatModal from "./DeleteChatModal";
import SendIcon from "@mui/icons-material/Send";
import SummarizeIcon from "@mui/icons-material/Summarize";
const DoctorsSingleChat = ({ isOpen, selectedUser, currentChat, userId }) => {
  const { isDoctor, isCalling } = useSelector((state) => state.doctor);
  const [voiceOn, setVoiceOn] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [pdf, setPdf] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { sendDataToServer, socket, onlineUsers } = useContext(SocketContext);
  const [typing, setTyping] = useState(false);
  const [arrivedMsg, setarrivedMsg] = useState(null);
  const messageRef = useRef();
  const [messages, setMessages] = useState([]);
  const [messageValue, setMessageValue] = useState("");
  const [isOptionOn, setIsOptionOn] = useState(false);
  const [currentMsId, setCurrentMessageId] = useState("");
  const [seinderId, setSenderId] = useState("");
  const location = useLocation();
  const queryClient = useQueryClient();

  const { data: allMsg, refetch } = useQuery({
    queryKey: currentChat?._id ? ["allMessages", currentChat?._id] : undefined,
    queryFn: getAllMessage,
  });

  const { mutate: sendMessageMutate } = useMutation({
    mutationFn: sendMessage,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries(["allMessages"]);
      }
    },
  });

  useEffect(() => {
    if (allMsg) {
      messageRef.current?.scrollIntoView({ behavior: "smooth" });
      setMessages(allMsg);
    }
  }, [allMsg, queryClient, messages]);

  const friend = messages[0]?.chatRoom?.participants.find(
    (user) => user !== userId
  );
  const newFriend = onlineUsers?.find((user) => user._id !== userId);

  const handleMessageSend = () => {
    console.log(newFriend);
    console.log(friend);
    console.log("sending id is" + friend);
    socket.emit("sendMessage", {
      recieverId: friend,
      sender: userId,
      text: messageValue,
    });
    sendMessageMutate({
      sender: userId,
      chatRoom: currentChat?._id,
      text: messageValue,
      typeOfMessage: "message",
    });
    setMessageValue("");
  };

  useEffect(() => {
    if (socket) {
      socket.on("getMessage", (data) => {
        console.log(data);
        setMessages((prev) => [
          ...prev,
          {
            sender: data.sender,
            text: data.text,
            createdAt: Date.now(),
          },
        ]);
        setarrivedMsg({
          sender: data.sender,
          text: data.text,
          createdAt: Date.now(),
        });
        queryClient && queryClient.invalidateQueries(["allMessages"]);
        setTyping(false);
      });
      socket.on("getTyping", ({ text }) => {
        text.length > 0 ? setTyping(true) : setTyping(false);
      });
    }
  }, [socket, queryClient]);
  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, queryClient]);
  useEffect(() => {
    arrivedMsg &&
      currentChat?.participants.includes(arrivedMsg.sender) &&
      setMessages((prev) => [...prev, arrivedMsg]);
    queryClient.invalidateQueries(["allMessages"]);
  }, [arrivedMsg, queryClient, socket]);

  const handlePdf = async (e) => {
    setPdf(e.target.files[0]);
    setModalOpen(true);
  };

  const handleSendPdf = async () => {
    setModalOpen(false);
    const dataOne = new FormData();
    dataOne.append("file", pdf);
    dataOne.append("upload_preset", "application");
    console.log(pdf);
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dvqq5x5x6/upload",
        dataOne,
        {
          withCredentials: false,
        }
      );

      socket.emit("sendMessage", {
        recieverId: friend,
        sender: userId,
        text: res.data.url,
      });
      sendMessageMutate({
        sender: userId,
        chatRoom: currentChat?._id,
        text: res.data.url,
        typeOfMessage: "pdf",
      });
    } catch (error) {}
  };

  console.log("friend", friend);
  const isOnline = onlineUsers?.map((x) => x._id).includes(friend);

  return (
    <div className={`${isOpen ? "block" : "hidden md:block"} w-full  `}>
      {currentChat ? (
        <div
          className={`  w-full h-[85vh] md:h-[75vh] border-[1px] border-gray-200 mt-3  rounded-md ml-2`}
        >
          <div className="div h-[4rem] md:h-[5rem] border-b-[1px] border-gray-200 flex items-center">
            <div className="userview ml-5 flex items-center gap-8">
              <img
                className="w-12 h-12 md:w-16 md:h-16 object-cover object-top rounded-full"
                src={selectedUser?.profilePicture}
                alt=""
              />
              <div className="info flex flex-col">
                <p className="font-semibold text-sm capitalize">
                  {selectedUser?.username}{" "}
                </p>
                <p>{isOnline ? "Online" : "offline"}</p>
              </div>
              <VideoChatButton
                username={selectedUser?.username}
                recieverId={friend}
              />
            </div>
          </div>
          <div className="chatpreview w-[90%] mx-auto mt-3 h-[80%] sm:h-[70%]  md:h-[67%]   overflow-y-auto pr-5">
            {messages?.map((msg, i) => {
              return (
                <>
                  {msg?.deleteForMe === "false"  ? (
                    <div
                      key={i}
                      ref={messageRef}
                      className={`chat  ${
                        msg?.sender === userId ? "chat-end" : "chat-start"
                      } `}
                    >
                      <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                          <div
                            className={` h-32 Tailwind CSS chat bubble component rounded-full flex relative ${
                              msg?.sender == userId
                                ? "bg-secondary"
                                : "bg-[#1567A3]"
                            }   `}
                          >
                            <p
                              className={`text-center absolute top-[8%] left-[20%] text-white text-sm `}
                            >
                              {" "}
                              {msg?.sender == userId
                                ? "You"
                                : selectedUser?.username.charAt(0)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        {msg?.typeOfMessage == "pdf" ? (
                          <div
                            className={` h-16  w-56 flex items-center relative text-gray-500 rounded-md ${
                              msg?.sender === userId
                                ? "bg-[#E8F1F3]"
                                : "bg-[#EFEFEF]"
                            } `}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                          >
                            {isHovered && (
                              <div className="absolute top-2 right-2">
                                <KeyboardArrowDownIcon
                                  onClick={() => {
                                    setSenderId(msg?.sender);
                                    setIsOptionOn(true);
                                    setCurrentMessageId(msg?._id);
                                  }}
                                  className="text-gray-500 cursor-pointer"
                                />
                              </div>
                            )}
                       
                            <div className="h-[80%] flex items-center w-[90%] m-auto bg-gray-300  rounded-lg">
                              <SummarizeIcon  className="ml-2"/>
                              <p>document</p>
                            </div>
                            <a
                              href={msg?.text}
                              download="prescription.pdf"
                              target="_blank"
                            >
                              <FileDownloadIcon className="absolute bottom-3  right-3 border-[1px] border-white rounded-full py-1" />
                            </a>
                          </div>
                        ) : msg?.typeOfMessage == "audio" ? (
                          <div
                            className={`chat-bubble relative min-w-[70px!important] ${
                              msg?.sender === userId
                                ? "bg-[#E8F1F3]"
                                : "bg-[#E4E6EB]"
                            } rounded-lg p-2 mb-2 flex items-center`}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                          >
                            <audio controls className="mr-2">
                              <source src={msg?.text} type="audio/mpeg" />
                              Your browser does not support the audio element.
                            </audio>
                            {isHovered && (
                              <KeyboardArrowDownIcon
                                onClick={() => {
                                  setSenderId(msg?.sender);
                                  setIsOptionOn(true);
                                  setCurrentMessageId(msg?._id);
                                }}
                                className="text-gray-500 cursor-pointer"
                              />
                            )}
                          </div>
                        ) : msg?.typeOfMessage == "message" ? (
                          <div className="relative">
                            <div
                              className={`chat-bubble text-gray-600 relative min-w-[70px!important] ${
                                msg?.sender === userId
                                  ? "bg-[#E8F1F3]"
                                  : "bg-[#EFEFEF]"
                              }`}
                              onMouseEnter={() => setIsHovered(true)}
                              onMouseLeave={() => setIsHovered(false)}
                            >
                              {isHovered && (
                                <KeyboardArrowDownIcon
                                  onClick={() => {
                                    setSenderId(msg?.sender);
                                    setIsOptionOn(true);
                                    setCurrentMessageId(msg?._id);
                                  }}
                                  className="absolute top-[0px] right-[2px]"
                                />
                              )}
                              {msg?.text}
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="chat-footer opacity-50">
                        {format(msg?.createdAt)}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </>
              );
            })}
          </div>
          {isOptionOn && (
            <DeleteChatModal
              sender={seinderId}
              userId={userId}
              currentMsId={currentMsId}
              isOptionOn={isOptionOn}
              setIsOptionOn={setIsOptionOn}
            />
          )}
          <div className="w-[90%] mx-auto  flex  gap-3  relative items-center">
            {typing && (
              <p className="mb-1 text-secondary font-semibold absolute top-[-30px] ">
                Typing...
              </p>
            )}

            {/* <div className="cursor-pointer">
            <AttachFileIcon />
            <input
            className="w-1 absolute left-0"
            // hidden
            type="file"
            onChange={handlePdf}
            name=""
            id=""
            />
          </div> */}
            <div className="rounded-md border bg-gray-50 p-4 shadow-md w-5">
              <label
                htmlFor="upload"
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <AttachFileIcon />
              </label>
              <input
                id="upload"
                type="file"
                className="hidden"
                onChange={handlePdf}
              />
            </div>

            <label className="input input-bordered flex items-center gap-2 w-[95%]  md:w-[93%]">
              <input
                value={messageValue}
                onChange={(e) => {
                  setMessageValue(e.target.value);
                  socket.emit("typing", {
                    data: "typing",
                    recieverId: friend,
                    text: e.target.value,
                  });
                }}
                type="text"
                className="grow w-[80%]"
                placeholder="message here"
              />

              <button
                className="rounded-lg py-1 hidden md:block px-4 bg-secondary text-white"
                onClick={handleMessageSend}
              >
                {" "}
                Send
              </button>
              <div className="md:hidden ">
                <SendIcon
                  onClick={handleMessageSend}
                  className="md:hidden py-1"
                />
              </div>
            </label>
            <VoiceRecordePage
              currentChat={currentChat}
              sender={userId}
              recieverId={friend}
              voiceOn={voiceOn}
              setVoiceOn={setVoiceOn}
            />
          </div>
        </div>
      ) : (
        <div className="w-full h-[75vh]  border-[1px] border-gray-200 mt-3  flex items-center justify-center rounded-md ml-2">
          <span className="text-3xl text-[rgba(0,0,0,0.39)] capitalize font-semibold">
            Open A chat to conversate{" "}
          </span>
        </div>
      )}

      {modalOpen && (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50" />

          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg z-50 shadow-md">
            <div className="mb-4">
              <h2 className="text-center text-lg font-bold">
                Document Preview
              </h2>
              <div className="w-72 opacity-100 h-20 bg-gray-200 rounded-lg border border-gray-300 flex items-center justify-center">
                <p className="text-gray-500"> Document File</p>
              </div>
            </div>

            <button
              onClick={handleSendPdf}
              className="bg-blue-500  text-white py-2 px-4 rounded-md"
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default DoctorsSingleChat;
