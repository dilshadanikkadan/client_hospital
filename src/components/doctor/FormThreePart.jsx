import React, { useState } from "react";
import { useFormik, Form, Formik, Field } from "formik";
import { openEditor } from "react-profile";
import "react-profile/themes/default";
import { useLocation, useNavigate } from "react-router-dom";
import { postRequest } from "../../services/axios";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { applyDoctorApplication } from "../../services/api/userRoute";
import LoadingPage from "../../pages/common/LoadingPage";

const FormThreePart = () => {
  let iduser;
  const jwtToken = localStorage.getItem("persist:root");

  if (jwtToken) {
    const decodedToken = JSON.parse(atob(jwtToken.split(".")[1]));

    const userId = decodedToken.id;
    iduser = userId;
  }

  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [image, setImage] = useState(null);
  const [licenseImage, setLicsenseImage] = useState(null);
  const [submit, SetSubmit] = useState(false);
  const { state } = useLocation();
  console.log(state);
  const { mutate: applicationMutate } = useMutation({
    mutationFn: applyDoctorApplication,
    onSuccess: (data) => {
      if (data.success) {
        setIsPending(false);
        navigate("success", { replace: true, state: "" });
      }
    },
  });

  //handle profile image
  const handleImage = async (e) => {
    const img = await openEditor({ src: e.target.files[0] });
    setImage(img?.editedImage?.getDataURL());
  };

  //handle lisence image
  const handleLicenseImage = async (e) => {
    const img = await openEditor({ src: e.target.files[0] });
    setLicsenseImage(img?.editedImage?.getDataURL());
  };

  const handleSubmit = async (e) => {
    setIsPending(true);
    e.preventDefault();
    SetSubmit(true);

    if (!image && !licenseImage) {
      return;
    }

    //lisence image
    const dataOne = new FormData();
    dataOne.append("file", licenseImage);
    dataOne.append("upload_preset", "application");

    //profile image  manage
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "application");
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dvqq5x5x6/image/upload",
        data,
        {
          withCredentials: false,
        }
      );
      const { url: profileImg } = res.data;
      const resOne = await axios.post(
        "https://api.cloudinary.com/v1_1/dvqq5x5x6/image/upload",
        dataOne,
        {
          withCredentials: false,
        }
      );
      const { url: licenseImg } = resOne.data;

      applicationMutate({
        ...state,
        profileImage: profileImg,
        licenseImage: licenseImg,
        user: iduser,
      });
    } catch (error) {}
  };
  return (
    <div>
      {isPending && licenseImage && image ? (
        <LoadingPage />
      ) : (
        <div>
          {state ? (
            <form className="form w-[80%] md:w-[28%] m-auto mt-10 flex flex-col relative gap-8">
              {isPending && licenseImage && image ? <p>please wait...</p> : ""}

              {!image && !licenseImage && submit ? (
                <p className="text-red-500 font-info">
                  Please Upload this two images
                </p>
              ) : (
                ""
              )}

              <div className="border-dashed border-2 border-secondary rounded-2xl h-[40vh] flex flex-col items-center justify-center">
                {!image ? (
                  <p className="text-secondary font-info ">
                    Upload A profile Photo
                  </p>
                ) : (
                  ""
                )}
                {image && (
                  <div>
                    <img
                      src={image}
                      className="h-44 object-cover object-center w-[90%] m-auto"
                      alt=""
                    />
                  </div>
                )}
                <label className="block">
                  <span className="sr-only">Choose profile photo</span>
                  <input
                    type="file"
                    onChange={handleImage}
                    className="mt-5 block w-full text-sm text-gray-500
                        file:me-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                          file:text-sm file:font-semibold
                             file:bg-blue-600 file:text-white
                                   hover:file:bg-blue-700
                                   file:disabled:opacity-50 file:disabled:pointer-events-none
                                  dark:file:bg-blue-500
                                     dark:hover:file:bg-blue-400
                                "
                  />
                </label>
              </div>

              <div className="border-dashed border-2 border-secondary rounded-2xl h-[40vh] flex flex-col items-center justify-center">
                {!licenseImage ? (
                  <p className="text-secondary font-info ">
                    Upload Your Licesnce Image
                  </p>
                ) : (
                  ""
                )}
                {licenseImage && (
                  <div>
                    <img
                      src={licenseImage}
                      className="h-44 object-cover object-center w-[90%] m-auto"
                      alt=""
                    />
                  </div>
                )}

                <label className="block">
                  <span className="sr-only">Choose profile photo</span>
                  <input
                    type="file"
                    onChange={handleLicenseImage}
                    className="mt-5 block w-full text-sm text-gray-500
                      file:me-4 file:py-2 file:px-4
                          file:rounded-lg file:border-0
                              file:text-sm file:font-semibold
                                file:bg-blue-600 file:text-white
                            hover:file:bg-blue-700
                            file:disabled:opacity-50 file:disabled:pointer-events-none
                         dark:file:bg-blue-500
                            dark:hover:file:bg-blue-400
                                 "
                  />
                </label>
              </div>
              <input
                type="submit"
                onClick={handleSubmit}
                className="py-3 w-[50%] rounded-xl font-desc text-white bg-secondary cursor-pointer  ml-[50%] mt-5"
                value={
                  isPending && licenseImage && image && submit
                    ? "Submitting"
                    : "submit"
                }
              />
            </form>
          ) : (
            <div className="info w-[50%] m-auto mt-10 flex flex-col items-center gap-10">
              <p className="text-center text-2xl">Please Fill Form First</p>
              <button
                onClick={() => navigate("/application_1", { replace: true })}
                className="py-3 cursor-pointer  px-6 rounded-lg text-black bg-base-200 m-auto"
              >
                Return to Form
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FormThreePart;
