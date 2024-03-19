import { useQuery } from '@tanstack/react-query';
import { useAnimation, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { getAllDoctors } from '../../../services/api/userRoute';
import { Link } from 'react-router-dom';

const DoctorList = ({ searchTerm }) => {
    let newSearchValue = searchTerm
    if (newSearchValue === undefined) {
        newSearchValue = ""
    }
    const { inView, ref } = useInView();
    const controls = useAnimation();
    const [filteredDoctors, setFilteredDoctors] = useState([]);

    useEffect(() => {
        if (inView) {
            controls.start({ opacity: 1, x: 0 });
        } else {
            controls.start({ x: 300 });
        }
    }, [inView, controls]);

    const { data: allDoctors } = useQuery({
        queryKey: ["allDoctors"],
        queryFn: getAllDoctors
    });

    useEffect(() => {
        if (allDoctors) {
            const filtered = allDoctors.filter(doctor =>
                doctor?.speciality?.toLowerCase().includes(newSearchValue?.toLowerCase())
            );
            setFilteredDoctors(filtered);
        }
    }, [allDoctors, searchTerm]);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, x: 300 }}
                animate={controls}
                ref={ref}
                transition={{ duration: 1.5 }}
            >
                <div className='w-full m-auto mt-10 flex flex-col items-center'>
                    <div className="info w-[60%]">
                        <h3 className="title text-center text-4xl">Our Doctors</h3>
                        <p className='text-xl text-center mt-5'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt dolores officia similique </p>
                    </div>
                    <div className="listContainer w-full flex gap-5 mt-10 flex-wrap">
                        {filteredDoctors.map((doctor, i) => (
                            <Link to={`/allDoctors/${doctor._id}`} key={i} className="card rounded-3xl w-full md:w-[48%] xl:w-[23%] h-[53vh] md:h-[53vh] bg-[#ECEFF2] gap-3 flex flex-col items-center justify-center">
                                <img className='h-[70%] rounded-xl object-cover' src={doctor?.profileImage} alt="" />
                                <h3 className="name text-info text-xl font-info">{doctor?.lastname}</h3>
                                <p className='capitalize'>{doctor?.speciality}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default DoctorList;
