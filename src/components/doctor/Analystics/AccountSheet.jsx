import React from 'react'
import { currentUser } from '../../../services/hooks/CuurentUser'
import { singleuser } from '../../../services/api/adminRoute'
import { useQuery } from '@tanstack/react-query'

const AccountSheet = () => {
    let userId = currentUser()
    const { data: doctor } = useQuery({
        queryKey: ["user", userId],
        queryFn: singleuser
    })
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
            <p className='text-gray-600'>Available Balance</p>
            <p className='text-lg font-semibold'>₹ 8,500</p>
        </div>
        <div>
            <p className='text-gray-600'>Pending Balance</p>
            <p className='text-lg font-semibold'>₹1,500</p>
        </div>
    </div>
</div>
  )
}

export default AccountSheet