import React from 'react'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { singleuser } from '../../../services/api/adminRoute';
import { getRequest } from '../../../services/axios';
const UserProfile = () => {
    const user = useParams()
    const {data:singleUser} =useQuery({
        queryKey:["user",user.id],
        queryFn:singleuser
    })
    return (
        <div className=' w-[90%] mx-auto  max-h-[60vh]'>


            <div className="wrapper w-full mt-10">

                <h3 className='text-secondary text-3xl font-info  font-semibold'>User Profile</h3>

                <div className="usercard border-[1px] border-gray-200 h-[43vh] mt-5 min-w-[28%] rounded-lg flex flex-col gap-5">
                    <div className="div ml-6 flex   items-center mt-10 gap-5">
                        <img className='w-12 h-12 object-cover rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPjGnnelatTe1FbI6RHusiWG4wkbtmnjVC9uTBkSBX_g&s" alt="" />
                        <p className='font-semibold'>{singleUser?.username}</p>
                    </div>

                    <div className="info ml-6 flex flex-col gap-3">
                        <p className='font-info font-semibold'>Contact Details</p>

                        <div className="phone flex gap-4">
                            <LocalPhoneIcon  className='text-secondary'/>
                            <p className='text-secondary'>+9847139243</p>
                        </div>
                        <div className="phone flex gap-4">
                            <EmailIcon className='text-secondary' />
                            <p className='text-secondary'>{singleUser?.email}</p>
                        </div>
                        <div className="phone flex gap-4">
                            <AddLocationIcon className='text-secondary' />
                            <p className='text-secondary'>hosptal@gmail.com</p>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default UserProfile
