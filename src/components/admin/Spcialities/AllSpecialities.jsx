import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import {
  deleteSpecialities,
  getSpecialities,
} from "../../../services/api/adminRoute";
import DeleteIcon from "@mui/icons-material/Delete";

const AllSpecialities = () => {
  const queryClient = useQueryClient();
  const { data: allSpecialities } = useQuery({
    queryKey: ["all specialities"],
    queryFn: getSpecialities,
  });

  const { mutate: deleteSpecialityMutate } = useMutation({
    mutationFn: deleteSpecialities,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["all specialities"]);
    },
  });
  const handleDelete = (id) => {
    console.log("hey");
    deleteSpecialityMutate(id);
  };
  return (
    <div className="mt-10  ml-20 w-[30%] flex flex-col  h-[75vh] overflow-y-scroll pb-10 border-[1px] border-gray-200">
      {allSpecialities?.map((item, i) => (
        <div
          key={i}
          className="w-[90%]  mx-auto mt-10  pb-5 rounded-md border-[1px] border-gray-300 "
        >
          <DeleteIcon
            className="text-secondary"
            onClick={() => handleDelete(item?._id)}
          />
          <div className="w-full h-full flex flex-col mt-4">
            <img
              className="h-[8rem] object-cover px-3 "
              src={item?.image}
              alt=""
            />
            <div className="info  px-3 mt-3 ">
              <h3 className="font-semibold">{item?.title}</h3>
              <p className="line-clamp-4 mt-3">{item?.description}</p>
              <button className="border-[1px] border-gray-200  text-gray-700 px-3 rounded-md py-2 mt-3 text-xs">
                Read More
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllSpecialities;
