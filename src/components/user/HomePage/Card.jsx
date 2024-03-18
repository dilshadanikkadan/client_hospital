import React, { useEffect } from 'react'
import { motion ,useAnimation} from "framer-motion"
import { useInView } from 'react-intersection-observer'


const Card = () => {
    const { ref, inView } = useInView({ threshold: 0 });
    const controls =useAnimation()
    useEffect(() => {
      if(inView){
            controls.start({opacity:1,x:1})
      }else{
        controls.start({ x: 300 });
      }
    }, [inView,controls])
    return (
        <>
            <motion.div
                initial={{ x: 700, opacity: 0 }}
                animate={controls}
                transition={{ duration: 1.5 }}
                ref={ref}
            >

                <motion.div className=" w-full mb-10"
                
                ref={ref}
                >
                    <div className="cardWrapper w-[85%] m-auto -500 flex flex-wrap">


                        <div className="card ml-3  w-full  md:w-[31%] mt-3  rounded-lg  border-[1px] border-gray-100 flex flex-col gap-5 pb-5">
                            <img className='flex-[1] w-[90%] m-auto mt-3' src="https://naziya-hospital.netlify.app/assets/img/departments/cardiology.jpg" alt="" />
                            <div className=" flex-[1] info ml-3 flex flex-col gap-3">
                                <h3 className='text-xl font-bold font-logo'>Cardiology</h3>
                                <p className='font-info  '>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat natus neque perferendis voluptates quaerat voluptatibus reiciendis tenetur, delectus cupiditate, </p>
                                <button className=' border-[1px] border-gray-500 rounded-md  w-28 py-2'>Read More </button>
                            </div>
                        </div>

                        <div className="card ml-3  w-full  md:w-[31%] mt-3 rounded-lg  border-[1px] border-gray-100 flex flex-col gap-5 pb-5">
                            <img className='flex-[1] w-[90%] m-auto mt-3' src="https://naziya-hospital.netlify.app/assets/img/departments/neurology.jpg" alt="" />
                            <div className=" flex-[1] info ml-3 flex flex-col gap-3">
                                <h3 className='text-xl font-bold font-logo'>Neurology</h3>
                                <p className='font-info'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat natus neque perferendis voluptates quaerat voluptatibus reiciendis tenetur, delectus cupiditate, </p>
                                <button className=' border-[1px] border-gray-500 rounded-md  w-28 py-2'>Read More </button>
                            </div>
                        </div>

                        <div className="card ml-3  w-full  md:w-[31%] mt-3 rounded-lg  border-[1px] border-gray-100 flex flex-col gap-5 pb-5">
                            <img className='flex-[1] w-[90%] m-auto mt-3' src="https://charlestondermatology.com/wp-content/uploads/2023/03/skin-care.png" alt="" />
                            <div className=" flex-[1] info ml-3 flex flex-col gap-3">
                                <h3 className='text-xl font-bold font-logo'>Dermitology</h3>
                                <p className='font-info'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat natus neque perferendis voluptates quaerat voluptatibus reiciendis tenetur, delectus cupiditate, </p>
                                <button className=' border-[1px] border-gray-500 rounded-md  w-28 py-2'>Read More </button>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </motion.div>
        </>
    )
}

export default Card
