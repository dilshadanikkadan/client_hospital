import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getBanners } from "../../../services/api/adminRoute";

const AllBanners = ({ setSelectedBannerObj }) => {
  const { data: Allbanners } = useQuery({
    queryKey: ["all banners"],
    queryFn: getBanners,
  });
  // console.log("selceted banners", selectBanner);
  return (
    <div className="mt-10 w-[50%] flex flex-col  h-[75vh] overflow-y-scroll pb-10 border-[1px] border-gray-200">
      {Allbanners?.filter((x) => x.type === "introPart").map((item) => (
        <div
          onClick={() => setSelectedBannerObj(item)}
          className="w-[90%]  mx-auto mt-10 h-[35vh] border-[1px] border-gray-300 rounded-lg"
        >
          <div className="w-full h-full flex mt-4">
            <div className="info flex-[1] pl-10 ">
              <h3 className="font-semibold">{item?.title}</h3>
              <p className="line-clamp-4 mt-3">{item?.description}</p>
              <button className="bg-secondary text-white px-3 rounded-md py-1 mt-3 text-xs">
                Make Appointment
              </button>
            </div>
            <img
              className="h-[85%] object-cover flex-[1]"
              src={item?.image}
              alt=""
            />
          </div>
        </div>
      ))}

      {Allbanners?.filter((x) => x.type === "health requirement").map(
        (item) => (
          <div
            onClick={() => setSelectedBannerObj(item)}
            className="w-[90%]  mx-auto mt-10 h-[35vh] border-[1px] border-gray-300 rounded-lg"
          >
            <div className="w-full h-full flex mt-3 ">
              <div className="info flex-[2] pl-10 ">
                <h3 className="font-semibold">{item?.title}</h3>
                <p className="line-clamp-3 mt-3">{item?.description}</p>
                <button className="bg-secondary text-white px-3 rounded-md py-1 mt-3 text-xs">
                  Make Appointment
                </button>
              </div>
              <img
                className="h-[85%] object-cover flex-[1]"
                src={item?.image}
                alt=""
              />
            </div>
          </div>
        )
      )}
      {Allbanners?.filter((x) => x.type === "check up banner").map((item) => (
        <div
          onClick={() => setSelectedBannerObj(item)}
          className="w-[90%]  mx-auto mt-10 h-[35vh] border-[1px] border-gray-300 rounded-lg "
        >
          <div className="w-full h-full flex mt-3 ">
            <img
              className="h-[85%] object-cover flex-[1]"
              src={item?.image}
              alt=""
            />
            <div className="info flex-[2] pl-10 ">
              <h3 className="font-semibold">
                Protect your Health With Simple Checkup
              </h3>
              <p className="line-clamp-3 mt-3">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Dignissimos, rem ad quo voluptates sapiente, nobis dolorum neque
                saepe quae consectetur at ratione obcaecati. Voluptas asperiores
                enim animi odit. Corporis, nemo.
              </p>
              <button className="bg-secondary text-white px-3 rounded-md py-1 mt-3 text-xs">
                Make Appointment
              </button>
            </div>
          </div>
        </div>
      ))}

      {Allbanners?.filter((x) => x.type === "treatment banner").map((item) => (
        <div
          onClick={() => setSelectedBannerObj(item)}
          className="w-[90%]  mx-auto mt-10 h-[35vh] border-[1px] border-gray-300 rounded-lg "
        >
          <div className="w-full h-full flex mt-0  flex-col ">
            <h3 className="text-xs w-[60%] ml-5">{item?.title}</h3>
            <img
              className="h-[100px] object-cover flex-[1] mt-3 px-5"
              src={item?.image}
              alt=""
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllBanners;
