import { useAnimation, motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

const CardsService = () => {
  const { inView, ref } = useInView()
  const controls = useAnimation()
  useEffect(() => {

    if (inView) {
      controls.start({ opacity: 1, translatex: 0, translateY: 0 })
    } else {
      controls.start({ translateX: -100 })
    }
  }, [inView, controls])

  const specialties = [
    {
        specialty: "Cardiology",
        id: "cardiology",
        image: "https://naziya-hospital.netlify.app/assets/img/departments/cardiology.jpg",
        description: "Cardiology is the branch of medicine that deals with the disorders of the heart as well as some parts of the circulatory system."
      },
      {
        specialty: "Neurology",
        id: "neurology",
        image: "https://naziya-hospital.netlify.app/assets/img/departments/neurology.jpg",
        description: "Neurology is the branch of medicine concerned with the study and treatment of disorders of the nervous system."
    },
    {
        specialty: "Dermatology",
        id: "dermatology",
        image: "https://charlestondermatology.com/wp-content/uploads/2023/03/skin-care.png",
        description: "Dermatology is the branch of medicine dealing with the skin, nails, hair (functions & structures) and its diseases."
    },
    {
        specialty: "Pediatrics",
        id: "pediatrics",
        image: "https://naziya-hospital.netlify.app/assets/img/departments/pediatric.jpg",
        description: "Pediatrics is the branch of medicine that involves the medical care of infants, children, and adolescents."
    }
];

  return (
    <div>
      <motion.div
        ref={ref}
 
        className="w-full mb-10 mt-10">
        <div className="cardWrapper w-[83%] ml-[17%]  -500 flex gap-3 flex-wrap">

          {
            specialties .map((item, i) => (
              <motion.div
                initial={{ opacity: 0, translateX: -100, translateY: -100 }}
                animate={controls}
                transition={{ duration: 0.7, delay: i * 0.4 }}
                key={i} className="card ml-10 w-[90%] m-auto md:m-0  md:w-[32%] rounded-lg  border-[1px] border-gray-100 flex flex-col gap-5 pb-5 mt-10">
                <img className='flex-[1] w-[90%] m-auto mt-3' src={item?.image} alt="" />
                <div className=" flex-[1] info ml-3 flex flex-col gap-3">
                  <h3 className='text-xl font-bold font-logo'>{item.specialty}</h3>
                  <p className='font-info'>{item.description}</p>
                  <button className=' border-[1px] border-gray-500 rounded-md  w-28 py-2'>Read More </button>
                </div>
              </motion.div>
            ))
          }






        </div>
      </motion.div>
    </div>
  )
}

export default CardsService
