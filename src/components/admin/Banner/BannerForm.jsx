import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { openEditor } from "react-profile";
import "react-profile/themes/default";
import {
  addbanner,
  getBanners,
  updateBanner,
} from "../../../services/api/adminRoute";

const BannerForm = ({ selectBannerObj }) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectBanner, setSelecteBanner] = useState("");
  const [showForm, setShowForm] = useState(true);
  const queryClient = useQueryClient();

  const handleChange = (e) => {
    setSelecteBanner(e.target.value);
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result;
      setImage(dataURL);
    };
    reader.readAsDataURL(file);
  };

  const { mutate: addbannerMutate } = useMutation({
    mutationFn: updateBanner,
    onSuccess: (data) => {
      if (data) {
        setImage(null);
        setTitle("");
        setDescription("");
        setShowForm(false);
        // Invalidate queries
        queryClient.invalidateQueries(["all banners"]);
      }
    },
  });

  useEffect(() => {
    if (selectBannerObj?.title) {
      setTitle(selectBannerObj.title);
      setDescription(selectBannerObj.description);
      setSelecteBanner(selectBannerObj?.type);
    }
  }, [selectBannerObj]);

  const hanleUpdate = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "application");
    try {
      let res;
      let bannerImage;
      if (image) {
        res = await axios.post(
          "https://api.cloudinary.com/v1_1/dvqq5x5x6/image/upload",
          data,
          {
            withCredentials: false,
          }
        );
        const { url } = res?.data;
        bannerImage = url;
      }

      addbannerMutate({
        title,
        image: bannerImage,
        description,
        type: selectBanner,
      });
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      {showForm && selectBannerObj ? (
        <div className="w-[40%]   mt-10 ml-10">
          <div className="border-dashed border-2 border-secondary rounded-2xl h-[40vh] flex flex-col items-center justify-center">
            {!image ? (
              <img
                src={selectBannerObj?.image || ""}
                className="h-36  object-contain  w-[60%] m-auto"
                alt=""
              />
            ) : (
              ""
            )}
            {image && (
              <div>
                <img
                  src={image}
                  className="h-40  object-cover object-center w-[90%] m-auto"
                  alt=""
                />
              </div>
            )}
            <label className="block mb-3">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                onChange={handleImage}
                className="mt-3 block w-full text-sm text-gray-500
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

          <div className="mt-3">
            <h3>Title</h3>
            <textarea
              onChange={(e) => setTitle(e.target.value)}
              className="textarea textarea-bordered h-14 w-[100%]"
              placeholder="Title"
              value={title}
            ></textarea>
          </div>

          <div className="mt-3">
            <h3>Description</h3>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              className="textarea textarea-bordered h-24 w-[100%]"
              placeholder="Description"
              value={description}
            ></textarea>
          </div>
          <select
            disabled
            id="doctorSelect"
            value={selectBanner}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a type</option>
            <option> introPart</option>
            <option> health requirement</option>
            <option> check up banner</option>
            <option> treatment banner</option>
          </select>
          <button
            onClick={hanleUpdate}
            className="py-1 rounded-lg px-5 mt-5 relative ml-[40%] bg-secondary text-white"
          >
            Update
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default BannerForm;
