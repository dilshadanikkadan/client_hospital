import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Link, useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="footer overflow-hidden md:h-[110vh] bg-[#14457B] flex flex-col mt-20">
        <div
          className={`top h-[90%] hidden w-[83%] border-b-2 border-white m-auto bg-[url(/images/bg.png)] bg-cover xl:flex items-center relative`}
        >
          <div className="newsLetter absolute right-[5%] flex justify-center items-center flex-col gap-3">
            <h3 className="text-white font-logo text-3xl text-center">
              Subscribe To News Letter
            </h3>
            <p className="text-white font-info">
              Stay Up to date with out latest news, update, services and offers.
            </p>
            <div className="">
              <input
                placeholder="   Enter your name"
                className="rounded-l-md py-[6px]"
                type="text"
              />
              <button className="bg-[#2684C8] py-[6px] px-5 text-white font-info rounded-r-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div
          className={`top h-[30vh] xl:hidden w-[83%] border-b-2 border-white m-auto bg-[#14457B] bg-cover mt-20 flex items-center relative`}
        >
          {/* <img src="https://multimedia.3m.com/mws/media/1566301J/littmann-classic-iii-monitoring-stethoscope-5861.jpg?width=506" alt="" /> */}
          <div className="newsLetter absolute right-[5%] flex justify-center items-center flex-col gap-3">
            <h3 className="text-white font-logo text-3xl text-center">
              Subscribe To News Letter
            </h3>
            <p className="text-white font-info">
              Stay Up to date with out latest news, update, services and offers.
            </p>
            <div className="">
              <input
                placeholder="   Enter your name"
                className="rounded-l-md py-[6px]"
                type="text"
              />
              <button className="bg-[#2684C8] py-[6px] px-5 text-white font-info rounded-r-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="center w-[83%] h-[54%] m-auto border-b-2 border-white flex flex-col md:flex-row gap-6 mb-5">
          <div className="left flex-[1] text-white flex  flex-col gap-5">
            <h3 className="text-4xl font-info capitalize mt-[25%]">E-care</h3>
            <p className=" font-desc">
              we prioritize your health with personalized care from skilled
              professionals, ensuring a warm, compassionate environment for
              comprehensive wellnes
            </p>

            <div className="incons flex gap-4">
              <FacebookIcon />
              <InstagramIcon />
              <XIcon />
              <LinkedInIcon />
            </div>
          </div>
          <div className="centr flex-[1]">
            <div className="  text-white flex  flex-col gap-5 pb-10">
              <h3 className="text-4xl font-info capitalize mt-[25%]">
                Quick Links
              </h3>
              <nav className="flex flex-col">
                <div>
                  <KeyboardArrowRightIcon />
                  <Link className="hover:underline" to="/">
                    Home
                  </Link>
                </div>
                <div>
                  <KeyboardArrowRightIcon />
                  <Link className="hover:underline" to="/about">
                    About
                  </Link>
                </div>
                <div>
                  <KeyboardArrowRightIcon />
                  <Link className="hover:underline" to="/service">
                    Service
                  </Link>
                </div>
                <div>
                  <KeyboardArrowRightIcon />
                  <Link className="hover:underline" to="/contact">
                    Contact
                  </Link>
                </div>
                <div>
                  <KeyboardArrowRightIcon />
                  <Link className="hover:underline" to="/makeAppointment">
                    Appointment
                  </Link>
                </div>
              </nav>
            </div>
          </div>
          <div className="right hidden xl:block flex-[1]">
            <div className="h-full  text-white flex  flex-col gap-5">
              <h3 className="text-4xl font-info capitalize mt-[25%] subpixel-antialiased">
                specialities
              </h3>
              <div className="posts h-full ">
                <div
                  onClick={() => navigate("/service")}
                  className="post cursor-pointer  h-[40%] flex gap-4  justify-center"
                >
                  <img
                    className="h-14 w-14 object-cover"
                    src="https://naziya-hospital.netlify.app/assets/img/departments/cardiology.jpg"
                    alt=""
                  />
                  <div className="info">
                    <p> Cardiology</p>
                    <p>Cardiology is great one the merits also good</p>
                  </div>
                </div>
                <div
                  onClick={() => navigate("/service")}
                  className="post cursor-pointer h-[40%] flex gap-4  justify-center"
                >
                  <img
                    className="h-14 w-14 object-cover"
                    src="https://naziya-hospital.netlify.app/assets/img/departments/neurology.jpg"
                    alt=""
                  />
                  <div className="info">
                    <p> Neurology</p>
                    <p>Neurology is great one actually</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="right flex-[1]">
            <div className=" text-white flex  flex-col gap-5">
              <h3 className="text-4xl font-info capitalize mt-[25%]">
                Contact Us
              </h3>

              <div className="phone flex gap-4">
                <LocalPhoneIcon />
                <p>+9847139243</p>
              </div>
              <div className="phone flex gap-4">
                <EmailIcon />
                <p>hosptal@gmail.com</p>
              </div>
              <div className="phone flex gap-4">
                <AddLocationIcon />
                <p>hosptal@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom center  w-[83%] h-[4%] m-auto flex items-center justify-center text-white">
          <p className="text-lg">
            Copyright 2023 Dilshad | All Rights Reserved
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
