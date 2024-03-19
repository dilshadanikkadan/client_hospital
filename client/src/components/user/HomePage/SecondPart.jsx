import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


const SecondPart = () => {
    const controls = useAnimation();
    const { ref, inView } = useInView({ threshold: 0 });

    useEffect(() => {
        if (inView) {
            controls.start({ y: 0 });
            controls.start({opacity:1})
        } else {
            controls.start({ y: 300 });
        }
    }, [inView, controls]);
    return (
        <div>
            <motion.div className="wrapper w-[100vw] sm:w-full bg-primary  overflow-hidden"
                ref={ref}
            >

                <div className="introPart w-[83%]  h-full items-center  m-auto flex flex-col-reverse md:flex-row ">
                    <motion.div className='left flex-[1] flex flex-col  gap-3 lg:gap-6'
                        ref={ref}
                        initial={{ y: 700, opacity:0 }}
                        animate={controls }
                        transition={{ duration:0.8 }}
                    >
                        <h3 className='font-logo  text-3xl mt-3 font-bold md:text-1xl md:mt-0'>Your <span className='text-secondary'>Health</span>  Requirement Is
                            <br />
                            Our First Focus</h3>
                        <div className="info  w-[80%]">

                            <p className='text-lg font-desc'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos, rem ad quo voluptates sapiente, nobis dolorum neque saepe quae consectetur .</p>
                        </div>
                        <div className="chack flex flex-col">
                            <div className="item1 flex gap-2 font-desc">
                                <CheckBoxIcon />
                                <p className='font-desc'>Top-notch Facilities</p>

                            </div>
                            <div className="item1 flex gap-2 font-desc">
                                <CheckBoxIcon />
                                <p className='font-desc'>Top-notch Facilities</p>

                            </div>
                            <div className="item1 flex gap-2 font-desc">
                                <CheckBoxIcon />
                                <p className='font-desc'>Top-notch Facilities</p>

                            </div>
                        </div>
                        <div className="wrap w-full flex gap-10">

                            <button className=' border-[1px] border-gray-500 rounded-md  px-6 py-3'>Read More </button>
                        </div>
                    </motion.div>


                    <motion.div className='right flex-[1] h-full '
                        ref={ref}
                        initial={{ y: 700 }}
                        animate={controls}
                        transition={{ duration:0.8}}
                    >
                        <div className="doctor">
                            <img className=' object-cover' src="https://naziya-hospital.netlify.app/assets/img/about/about-img.png" alt="" />
                        </div>
                    </motion.div>

                </div>
            </motion.div>
        </div>
    )
}

export default SecondPart
