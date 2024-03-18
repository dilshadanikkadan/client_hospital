import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getConversation } from '../../../services/api/userRoute'
import { currentUser } from '../../../services/hooks/CuurentUser'
import ChatMessages from './ChatMessages'

const DcotorsViewBar = ({ allConversation,SetCurrentChat  ,user,SetUser ,sendDataToParent}) => {
    const userId = currentUser()
    
    console.log(allConversation);

    return (
        <>
            <div className=' hidden md:flex w-[30%] flex-col h-[82vh] rounded-md border-[1px] border-gray-200 mt-3'>
                <div className='w-[90%] mx-auto '>
                    <label className="input input-bordered flex items-center gap-2 mt-5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>                    <input type="text" className="grow" placeholder="Search" />
                    </label>
                </div>
                <div className="cardwrapper cursor-pointer flex flex-col gap-3 mt-3">
                    {

                        allConversation?.map((item,i) => (
                            <div key={i} onClick={()=>  SetCurrentChat(item)}>


                            <ChatMessages  sendDataToParent={sendDataToParent}  user={user} SetUser={SetUser} chatsMembers={item} currentUser={userId} />
                            </div>
                        ))
                    }


                </div>
            </div>

        </>
    )
}

export default DcotorsViewBar