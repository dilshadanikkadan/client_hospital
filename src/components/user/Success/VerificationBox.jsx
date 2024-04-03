import React from "react";

const VerificationBox = () => {
  return (
    <div className="container mx-auto mt-10 px-10">
      <div
        id="alert-additional-content-5"
        className="p-6 shadow-md border border-gray-300 rounded-lg bg-white dark:border-gray-600 dark:bg-gray-800"
        role="alert"
      >
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-300">
            Verified SuccessFully
          </h3>
        </div>
        <div className="my-6 ml-10   text-gray-800 dark:text-gray-300 text-lg leading-loose">
          <p className="font-semibold"></p>
          <p>We are pleased to inform you have been Verified Sucessfully</p>
          <p className="mt-5">
            Please feel free to reach out to us if you have any questions or
            concerns regarding this veriifcation
          </p>

          <p classname="mt-3">Best regards,</p>
          <div classname="mt-3">
            <p className="mt-4"> James</p>
            <p>E-care</p>
            <p>dilshad</p>
          </div>
        </div>
        <div className="flex justify-center gap-10"></div>
      </div>
    </div>
  );
};

export default VerificationBox;
