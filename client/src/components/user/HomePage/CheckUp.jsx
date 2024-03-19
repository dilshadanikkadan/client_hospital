import { useAnimation, motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
const CheckUp = () => {
    const { inView, ref } = useInView()
    const controls = useAnimation()
    useEffect(() => {

        if (inView) {
            controls.start({ opacity: 1, x: 0 })
        } else {
            controls.start({ x: -300 })
        }
    }, [inView, controls])
    return (
        <>
               <motion.div
                initial={{ opacity: 0, x: 300 }}
                animate={controls}
                ref={ref}
                transition={{ duration: 1.5 }}
            >

        
            <div className="wrapper w-[83%] h-[100vh] md:h-[80vh] lg:h-[100vh] mt-10 flex flex-col md:flex-row m-auto">
                <div className="left flex-[1] flex h-full items-center justify-center">
                    <img className='h-[60%]   %] md:h-[37%] xl:h-[60%] object-cover' src="https://naziya-hospital.netlify.app/assets/img/about/about-img-4.png" alt="" />
                </div>
                <div className="right flex-[1] flex  justify-center flex-col gap-1 ml-5">
                    <p className='w-36 py-1 bg-slate-200 px-2 rounded-md'>Health Equity</p>
                    <h3 className='font-info text-4xl'>Protect your Health With Simple Checkup</h3>


                    <div className="card w-[70%] font-desc flex flex-col  gap-5 mt-5">
                        <h3 className="title text-2xl ">Medical Best Treatment</h3>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi illum distinctio quo earum repudiandae quam aut! Odit accusantium dolorem rerum.</p>
                    </div>




                    <div className="card w-[70%] font-desc flex flex-col  gap-5 mt-5">
                        <h3 className="title text-2xl ">Medical Best Treatment</h3>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi illum distinctio quo earum repudiandae quam aut! Odit accusantium dolorem rerum.</p>
                    </div>
                </div>



            </div>
            </motion.div>

        </>
    )
}

export default CheckUp
