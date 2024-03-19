import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import AddLocationIcon from '@mui/icons-material/AddLocation';
const Footer = () => {
  return (
    <>
      <div className="footer overflow-hidden md:h-[110vh] bg-[#14457B] flex flex-col mt-20">
        <div className={`top h-[90%] hidden w-[83%] border-b-2 border-white m-auto bg-[url(/images/bg.png)] bg-cover md:flex items-center relative`}>
          <div className="newsLetter absolute right-[5%] flex justify-center items-center flex-col gap-3">
            <h3 className='text-white font-logo text-3xl text-center'>Subscribe To News Letter</h3>
            <p className='text-white font-info'>Stay Up to date with out latest news, update, services and offers.</p>
            <div className="">

              <input placeholder='   Enter your name' className='rounded-l-md py-[6px]' type="text" />
              <button className='bg-[#2684C8] py-[6px] px-5 text-white font-info rounded-r-lg'>Subscribe</button>
            </div>
          </div>
        </div>

        <div className={`top h-[30vh] md:hidden w-[83%] border-b-2 border-white m-auto bg-[#14457B] bg-cover mt-20 flex items-center relative`}>
          <div className="newsLetter absolute right-[5%] flex justify-center items-center flex-col gap-3">
            <h3 className='text-white font-logo text-3xl text-center'>Subscribe To News Letter</h3>
            <p className='text-white font-info'>Stay Up to date with out latest news, update, services and offers.</p>
            <div className="">

              <input placeholder='   Enter your name' className='rounded-l-md py-[6px]' type="text" />
              <button className='bg-[#2684C8] py-[6px] px-5 text-white font-info rounded-r-lg'>Subscribe</button>
            </div>
          </div>
        </div>



        <div className="center w-[83%] h-[54%] m-auto border-b-2 border-white flex flex-col md:flex-row gap-6 mb-5">
          <div className="left flex-[1] text-white flex  flex-col gap-5">
            <h3 className='text-4xl font-info capitalize mt-[25%]'>E-care</h3>
            <p className=' font-desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae labore, sequi impedit quod  adipisicing elit. Beatae labore, sequi impedit quod !</p>

            <div className="incons flex gap-4">
              <FacebookIcon />
              <InstagramIcon />
              <XIcon />
              <LinkedInIcon />

            </div>
          </div>
          <div className="centr flex-[1]">

            <div className="  text-white flex  flex-col gap-5">
              <h3 className='text-4xl font-info capitalize mt-[25%]'>Quick Links</h3>
              <nav>
                <li>Home</li>
                <li>About</li>
                <li>Service</li>
                <li>Contact</li>
                <li>Appointment</li>
                <li>Appointment</li>
                <li>Appointment</li>
                <li>Appointment</li>
              </nav>

            </div>
          </div>
          <div className="right flex-[1]">
            <div className="h-full  text-white flex  flex-col gap-5">
              <h3 className='text-4xl font-info capitalize mt-[25%]'>Recent Post</h3>
              <div className="posts h-full">
                <div className="post h-[40%] flex gap-4  justify-center">
                  <img className='h-14' src="https://naziya-hospital.netlify.app/assets/img/footer/news-1.jpg" alt="" />
                  <div className="info">
                    <p> DECEMBER 12, 2022</p>
                    <p> Get The Exercise Limited Mobility</p>
                  </div>

                </div>
                <div className="post h-[40%] flex gap-4  justify-center">
                  <img className='h-14' src="https://naziya-hospital.netlify.app/assets/img/footer/news-1.jpg" alt="" />
                  <div className="info">
                    <p> DECEMBER 12, 2022</p>
                    <p> Get The Exercise Limited Mobility</p>
                  </div>

                </div>




              </div>

            </div>

          </div>
          <div className="right flex-[1]">
            <div className=" text-white flex  flex-col gap-5">
              <h3 className='text-4xl font-info capitalize mt-[25%]'>Contact Us</h3>

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
          <p className='text-lg'>Copyright 2023 naziya | All Rights Reserved</p>
        </div>
      </div>
    </>
  )
}

export default Footer
