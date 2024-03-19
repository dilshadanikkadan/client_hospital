import React, { useState } from 'react';
import Navbar from '../../components/user/HomePage/Navbar';
import DoctorList from '../../components/user/HomePage/DoctorList';

const DoctorsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);

    };
    console.log(searchTerm);

    return (
        <div>
            <Navbar />
            <div className="w-[80%] mx-auto">
                <div className="my-4 float-left flex flex-col justify-end w-[40%]">

                    <label className="input input-bordered flex items-center gap-2">
                        <input onChange={handleSearchChange} type="text" className="grow" placeholder="Search" />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                    </label>
                </div>
                <DoctorList searchTerm={searchTerm} />
            </div>
        </div>
    );
};

export default DoctorsPage;
