import React from "react";

const VideoChatBox = () => {
  return (
    <div className="w-[80%] m-auto h-[80vh] mt-10">
      <div className="h-[25vh] w-[20rem] border-[1px] border-gray-200 rounded-md mt-3"></div>

      <div className=" flex gap-10">
        <button className="bg-secondary py-1 px-5  rounded-lg">
          {" "}
          Vidio Call
        </button>
        <button className="bg-secondary py-1 px-5  rounded-lg"> end</button>
      </div>
    </div>
  );
};

export default VideoChatBox;
