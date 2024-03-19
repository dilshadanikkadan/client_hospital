import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { blockUser, singleuser, unBlockUser } from '../../../services/api/adminRoute'
import { useParams } from 'react-router-dom'

const UserOverView = () => {
    const UserId = useParams()
    const { data: user } = useQuery({
        queryKey: ["user", UserId.id],
        queryFn: singleuser
    })
    const queryClient = useQueryClient()
    const [block, setBlock] = useState(false)

    //block 
    const { mutate: unblock_userMutate } = useMutation({
        mutationFn: unBlockUser,
        onSuccess: (data) => {
            if (data.success) {
                queryClient.invalidateQueries(["user"])
            }


        }
    })

    const { mutate: block_userMutate } = useMutation({
        mutationFn: blockUser,
        onSuccess: (data) => {
            if (data.success) {
                queryClient.invalidateQueries(["user"])
            }


        }
    })

    const unBloackUser = () => {
        setBlock(true)
        unblock_userMutate(user.email)
    }

    const blockUserCurrent=()=>{
        block_userMutate(user.email)
    }

    return (
        <>
            <div className=' w-[90%] mx-auto  max-h-[100vh] mt-5 relative'>

                <div className="wrapper w-full border-[1px] h-[28vh] rounded-lg border-gray-200">

                    <div className="ingo ml-5 mt-5 flex flex-col gap-3">
                        <h3 className='text-xl text-secondary font-semibold '>OverView</h3>
                        <h3 className='text-lg  '>Gender:  Male</h3>
                        <h3 className='text-lg text-secondary  '>Latest Appointment On: 05-02-2004 </h3>

                    </div>

                </div>

                {
                    user?.status === "active" ?
                        <button onClick={blockUserCurrent} className='px-5 py-1 bg-secondary mt-3 absolute text-white  right-4 rounded-md'>Block user</button>
                        :
                        <button onClick={unBloackUser} className='px-5 py-1 bg-secondary mt-3 absolute text-white  right-4 rounded-md'>UnBlock User</button>
                }

            </div>
        </>
    )
}

export default UserOverView
