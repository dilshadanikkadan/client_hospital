import React, { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { delteUserClient, getAllUsers } from '../../../services/api/adminRoute'
import { Link } from 'react-router-dom'
import UserSearchInput from './UserSearchInput'
const UserListBox = ({ value }) => {
    const [data, setData] = useState([]);
    const [render,setRender]=useState(false)
    const [name, setName] = useState(null)
    const [userId, setUserId] = useState(null)
    const queryClient = useQueryClient()

    const { data: allUsers, isLoading, isError } = useQuery({
        queryKey: ["users",[render]],
        queryFn: getAllUsers,

    })
    
    useEffect(() => {
      setRender(true)
    }, [])
    

    const [filteredUser, setFilteredUser] = useState([])


    const { mutate: delete_user } = useMutation({
        mutationFn: delteUserClient,
        mutationKey: ["users"],
        onSuccess: (id) => {
            queryClient.invalidateQueries(["users"])
        }
    })

    useEffect(() => {
        if (allUsers?.userData) {
            const filteredData = allUsers.userData.filter(user => user.username.toLowerCase().trim().includes(value));
            setData(filteredData);
        }
    }, [value,allUsers]);

    const handleDelete = (id, username) => {
        document.getElementById('my_modal_5').showModal()
        setUserId(id)
        setName(username)

    }

    const handleDeleteUser = () => {
        delete_user(userId)
    }
    return (
        <div>


            <div className="wrapper w-[90%] mt-10 border-[1px] h-[64vh] overflow-y-scroll  border-gray-200 mx-auto shadow-md">

                {isLoading && <p>loading</p>}
                {isError && <p>error.</p>}


                {

                    data.length > 0 ?

                        data?.map((user, i) => (
                            <div key={i} className="user  flex  gap-5 items-center mt-7 justify-between mx-4 mb-1 border-b-[1px] border-gray-200 pb-2">
                                <div className="div flex items-center justify-center gap-5">
                                    <img className='w-12 h-12 object-cover rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPjGnnelatTe1FbI6RHusiWG4wkbtmnjVC9uTBkSBX_g&s" alt="" />
                                    <p className='text-lg  font-semibold capitalize'>{user.username}</p>
                                </div>
                                <div className="edit flex gap-3">
                                    <button className={`${user?.status === "active" ? "bg-green-500 " : "bg-red-400"}  font-info px-5 py-1 rounded-md`} >{user?.status}</button>
                                    <Link className='bg-secondary text-white  font-info px-5 py-2 rounded-md' to={`/admin/users/${user._id}`}>View Details</Link>
                                    <button className='bg-red-400  font-info px-5 py-1 rounded-md' onClick={() => handleDelete(user._id, user.username)}>Delete</button>
                                </div>
                            </div>



                        ))

                        :

                        allUsers?.userData?.map((user, i) => (
                            <div key={i} className="user  flex  gap-5 items-center mt-7 justify-between mx-4 mb-1 border-b-[1px] border-gray-200 pb-2">
                                <div className="div flex items-center justify-center gap-5">
                                    <img className='w-12 h-12 object-cover rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPjGnnelatTe1FbI6RHusiWG4wkbtmnjVC9uTBkSBX_g&s" alt="" />
                                    <p className='text-lg  font-semibold capitalize'>{user.username}</p>
                                </div>
                                <div className="edit flex gap-3">
                                    <button className={`${user?.status === "active" ? "bg-green-500 " : "bg-red-400"}  font-info px-5 py-1 rounded-md`} >{user?.status}</button>
                                    <Link className='bg-secondary text-white  font-info px-5 py-2 rounded-md' to={`/admin/users/${user._id}`}>View Details</Link>
                                    <button className='bg-red-400  font-info px-5 py-1 rounded-md' onClick={() => handleDelete(user._id, user.username)}>Delete</button>
                                </div>
                            </div>



                        ))
                }



                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Hello!</h3>
                        <p className="py-4">are you sure want to delete {name}</p>
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn bg-base-300">Cancel</button>
                                <button className="btn  bg-red-400 ml-3" onClick={handleDeleteUser}>Delete</button>
                            </form>
                        </div>
                    </div>
                </dialog>








            </div>

        </div>
    )
}

export default UserListBox
