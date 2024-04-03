import React from "react";
import Navbar from "../user/HomePage/Navbar";

const Loading = () => {
  return (
    <div>
      <div className="w-full flex items-center justify-center h-[76vh]">
        <dotlottie-player
          src="https://lottie.host/cf1429da-4f07-4b54-b71e-ccaec4d43331/WytaJnToCA.json"
          background="transparent"
          speed={1}
          style={{ width: 400, height: 500 }}
          loop=""
          autoPlay=""
        />
      </div>
    </div>
  );
};

export default Loading;
