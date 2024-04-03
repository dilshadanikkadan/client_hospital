import React, { useContext, useRef, useState } from "react";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import { SocketContext } from "../../../store/redux/slices/SocketContext";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage } from "../../../services/api/userRoute";

const VoiceRecordePage = ({
  currentChat,
  setVoiceOn,
  voiceOn,
  recieverId,
  sender,
}) => {
  console.log("sender" + sender);
  console.log("sender" + recieverId);
  const audioChunk = useRef([]);
  const { sendDataToServer, socket, onlineUsers } = useContext(SocketContext);
  const [audioBlobOne, setAudioBlobOne] = useState(null);

  const mediaRecordREf = useRef(null);
  const [recordings, setRecordings] = useState([]);
  const queryClient = useQueryClient();
  const startRec = async () => {
    setVoiceOn(!voiceOn);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        audioChunk.current.push(e.data);
      }
    };
    mediaRecorder.onstop = async (e) => {
      const audioBlob = new Blob(audioChunk.current, { type: "audio/wav" });
      console.log(audioBlob);
      setAudioBlobOne(audioBlob);

      const audioUrl = URL.createObjectURL(audioBlob);
      console.log(audioUrl);
      const audioData = new FormData();
      audioData.append("file", audioBlob);
      audioData.append("upload_preset", "application");
      console.log(audioData);
      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dvqq5x5x6/raw/upload/",
          audioData,
          {
            withCredentials: false,
          }
        );
        socket.emit("sendMessage", {
          recieverId,
          sender,
          text: res.data.url,
        });
        sendMessageMutate({
          sender,
          chatRoom: currentChat?._id,
          text: res.data.url,
          typeOfMessage: "audio",
        });
      } catch (error) {}

      audioChunk.current = [];
    };
    mediaRecorder.start();
    mediaRecordREf.current = mediaRecorder;
  };

  const endRec = async () => {
    setVoiceOn(!voiceOn);
    console.log(mediaRecordREf);
    console.log(audioChunk);
    if (
      mediaRecordREf.current &&
      mediaRecordREf.current.state === "recording"
    ) {
      // console.log(audioBlobOne);
      mediaRecordREf.current.stop();

      try {
        console.log(res.data.url);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const { mutate: sendMessageMutate } = useMutation({
    mutationFn: sendMessage,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries(["allMessages"]);
      }
    },
  });
  return (
    <div
      style={{ width: "80px", height: "50px", overflow: "hidden" }}
      className=""
    >
      {voiceOn ? (
        <dotlottie-player
          src="https://lottie.host/d137ed19-a9a5-4174-92ac-d44dcae87e28/sXT6vgiIEp.json"
          background="transparent"
          speed={1}
          style={{
            width: "500px",
            height: "500px",
            marginLeft: "-230px",
            marginTop: "-230px",
          }} // Adjust margins to position the animation
          loop=""
          autoPlay=""
          onClick={endRec}
        />
      ) : (
        <div className="bg-secondary  py-1 w-[40px] flex justify-center rounded-full">
          <KeyboardVoiceIcon
            onClick={startRec}
            className="text-white cursor-pointer"
            style={{ fontSize: "2rem" }}
          />
        </div>
      )}

      <div className="">
        {recordings.map((rec, i) => (
          <audio key={i} controls src={rec} />
        ))}
      </div>
    </div>
  );
};

export default VoiceRecordePage;
