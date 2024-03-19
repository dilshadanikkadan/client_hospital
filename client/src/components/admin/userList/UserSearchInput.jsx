import React, { useState } from 'react'
import UserListBox from './UserListBox'

const UserSearchInput = () => {
    const [searchValue,setSearchValue]=useState("")
   const handleCahnge=(e)=>{
     setSearchValue(e.target.value)
     
   }

    return (
        <div>
            <div className='w-[90%] mx-auto mt-10'>
                <h3 className='text-2xl font-info font-semibold'>Users</h3>

                <label  onChange={handleCahnge} className="input input-bordered flex items-center gap-2 mt-5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>                    <input type="text" className="grow" placeholder="Search" />
                </label>
            </div>

            <UserListBox value={searchValue}/>

        </div>
    )
}

export default UserSearchInput
