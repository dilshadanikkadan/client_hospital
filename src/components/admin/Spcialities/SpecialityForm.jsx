import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { addSpecialities } from "../../../services/api/adminRoute";

const SpecialityForm = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  const handleImage = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result;
      setImage(dataURL);
    };
    reader.readAsDataURL(file);
  };

  const { mutate: addSpecialitieMutate } = useMutation({
    mutationFn: addSpecialities,
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries(["all specialities"]);
      }
    },
  });

  const handleAdd = async () => {
    if (!title.trim() || !image || !description.trim()) {
      setError("All fields are required.");
      return;
    }

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

      const { url: specialityImage } = res?.data;

      addSpecialitieMutate({
        title,
        image: specialityImage,
        description,
      });

      setImage(null);
      setTitle("");
      setDescription("");
      setError(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[40%] mt-10 ml-10">
      <div className="border-dashed border-2 border-secondary rounded-2xl h-[40vh] flex flex-col items-center justify-center">
        {!image ? <p>Upload Image</p> : ""}
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
            onChange={handleImage}
            type="file"
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

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <button
        onClick={handleAdd}
        className="py-1 rounded-lg px-5 mt-3 relative ml-[40%] bg-secondary text-white"
      >
        Add
      </button>
    </div>
  );
};

export default SpecialityForm;
