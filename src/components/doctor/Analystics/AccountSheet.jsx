import React from 'react'
import { currentUser } from '../../../services/hooks/CuurentUser'
import { singleuser } from '../../../services/api/adminRoute'
import { useQuery } from '@tanstack/react-query'
import { patientsAnalystics } from '../../../services/api/doctorRoute'

const AccountSheet = () => {
    let userId = currentUser()
    const { data: doctor } = useQuery({
        queryKey: ["user", userId],
        queryFn: singleuser
    })
    const { data: userDataAnalstics } = useQuery({
        queryKey: ["patinets Analaystics", userId],
        queryFn: patientsAnalystics
    });

    console.log(userDataAnalstics[userDataAnalstics.length -1].amount);
  return (
    <div className='w-[30vw] h-[40vh] bg-white shadow-md rounded-lg p-6 mt-10'>
    <h2 className='text-xl font-semibold mb-4'>Account Balance</h2>
    <div className='flex justify-between items-center mb-4'>
        <p className='text-gray-600'>Total Balance</p>
        <p className='text-lg font-semibold text-green-600'>₹ {doctor?.accountBalance}</p>
    </div>
    <hr className='border-gray-300 mb-4' />
    <div className='flex justify-between items-center'>
        <div>
            <p className='text-gray-600'>Last Month  </p>
            <p className='text-lg font-semibold'>₹ {userDataAnalstics[userDataAnalstics.length -1].amount}</p>
        </div>
        <div>
            <p className='text-gray-600'>Pending Balance</p>
            <p className='text-lg font-semibold'>₹0</p>
        </div>
    </div>
</div>
  )
}

export default AccountSheet