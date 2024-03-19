import React from 'react'

const DashBoardBoxDoctor = () => {
  return (
    <>
         <div className="wrapper  w-[90%] ml-auto mr-auto  h-[40vh] flex flex-col  justify-center gap-7">
                <p className='ml-10 mt-10 font-info text-xl font-semibold'>Welcome Anna Jenna</p>

                <div className='flex w-full gap-7'>
                    <div className="box rounded-lg shadow-md flex-[1] h-40 bg-[#F2E8E9] ml-10">
                        <div className="info w-[70%] m-auto flex flex-col  justify-center h-full font-desc">

                            <h3 className='text-lg font-semibold'>Total Patients</h3>
                            <p className='text-lg font-semibold'>5000</p>
                            <p className='text-green-500  font-semibold'>+25</p>
                        </div>
                    </div>

                    <div className="box rounded-lg shadow-md flex-[1] h-40 bg-[#F2E8E9]">
                        <div className="info w-[70%] m-auto flex flex-col  justify-center h-full font-desc">

                            <h3 className='text-lg font-semibold'>Total Patients</h3>
                            <p className='text-lg font-semibold'>5000</p>
                            <p className='text-green-500  font-semibold'>+25</p>
                        </div>
                    </div>
                    <div className="box rounded-lg shadow-md flex-[1] h-40 bg-[#F2E8E9] ">
                        <div className="info w-[70%] m-auto flex flex-col  justify-center h-full font-desc">

                            <h3 className='text-lg font-semibold'>Total Patients</h3>
                            <p className='text-lg font-semibold'>5000</p>
                            <p className='text-green-500  font-semibold'>+25</p>
                        </div>
                    </div>
                    <div className="box rounded-lg shadow-md flex-[1] h-40 bg-[#F2E8E9] mr-10">
                        <div className="info w-[70%] m-auto flex flex-col  justify-center h-full font-desc">

                            <h3 className='text-lg font-semibold'>Total Patients</h3>
                            <p className='text-lg font-semibold'>5000</p>
                            <p className='text-green-500  font-semibold'>+25</p>
                        </div>
                    </div>  
                </div>

            </div>
    </>
  )
}

export default DashBoardBoxDoctor
