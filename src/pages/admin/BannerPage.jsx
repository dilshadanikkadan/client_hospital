import React, { useState } from "react";
import SideBar from "../../components/admin/SideBar";
import AllBanners from "../../components/admin/Banner/AllBanners";
import BannerForm from "../../components/admin/Banner/BannerForm";

const BannerPage = () => {
  const [selectBannerObj, setSelectedBannerObj] = useState(null);

  return (
    <div className="flex w-full">
      <SideBar />
      <div className="w-[80%] flex">
        <AllBanners setSelectedBannerObj={setSelectedBannerObj} />
        <BannerForm selectBannerObj={selectBannerObj} />
      </div>
    </div>
  );
};

export default BannerPage;
