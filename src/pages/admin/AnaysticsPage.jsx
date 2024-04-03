import React, { useState } from 'react'
import SideBar from '../../components/admin/SideBar'
import UserGraph from '../../components/admin/Analaystics/UserGraph'
import DoctorProfitGraph from '../../components/admin/Analaystics/DoctorProfitGraph'
import AccountBalance from '../../components/admin/Analaystics/AccountBalance'

const AnaysticsPage = () => {
    const [profit,setProfit]= useState("")
    return (
        <div className='w-full flex'>
            <SideBar />
            <div className="div w-[45%] ">
                <div className=''>

                    <UserGraph />
                    <DoctorProfitGraph setProfit={setProfit} />
                </div>
            </div>
            <AccountBalance profit={profit} />
        </div>
    )
}

export default AnaysticsPage