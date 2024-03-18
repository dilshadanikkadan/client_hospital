import { useAnimation, motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

const NumberCard = () => {
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

            <div className="cardContainer w-[60%]  items-center justify-center m-auto flex flex-wrap gap-5">
               <div className="card font-info rounded-xl py-10 w-full md:w-56 bg-[#F3C7D2] flex items-center justify-center flex-col gap-3">
                  <p className='text-2xl font-bold'>850</p>
                  <p className='font-normal text-xl'>Verified Physicians</p>
                  <p className='font-normal'>Highly verified</p>
               </div>

               <div className="card font-info rounded-xl py-10 w-full md:w-56 bg-[#D1DDE3] flex items-center justify-center flex-col gap-3">
                  <p className='text-2xl font-bold'>850</p>
                  <p className='font-normal text-xl'>Verified Physicians</p>
                  <p className='font-normal'>Highly verified</p>
               </div>
               <div className="card font-info rounded-xl py-10 w-full md:w-56 bg-[#E8DADA] flex items-center justify-center flex-col gap-3">
                  <p className='text-2xl font-bold'>850</p>
                  <p className='font-normal text-xl'>Verified Physicians</p>
                  <p className='font-normal'>Highly verified</p>
               </div>

            </div>

         </motion.div>

      </>
   )
}

export default NumberCard
