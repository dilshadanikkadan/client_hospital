import { useAnimation, motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
const TreatMentBanner = () => {
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
    <motion.div
    initial={{ opacity: 0, x: 300 }}
    animate={controls}
    ref={ref}
    transition={{ duration: 1.5 }}
 >
      <div className="wrapper w-[80%] m-auto mt-10 mb-10">
        <div className="info w-[60%]">

        <h3 className='uppercase text-3xl font-info font-semibold '>Best Treatment for your Health, Your Health is Happines for Us</h3>
        </div>

        <div className="banne mt-10 rounded-2xl w-full h-[40vh] md:h-[60vh] bg-cover bg-center bg-[url(https://naziya-hospital.netlify.app/assets/img/about/bg.jpg)] ">

        </div>

      </div>
      </motion.div>
  )
}

export default TreatMentBanner
