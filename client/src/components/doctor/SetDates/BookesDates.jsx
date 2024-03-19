import React from 'react';

const BookesDates = ({ dates }) => {
    const successfulBookings = dates?.flatMap(date => {
        return date.time.filter(item => item.status === "success").map(booking => ({
            date: date.date,
            month: date.month,
            from: booking.from,
            to: booking.to
        }));
    });

    return (
        <div className='w-[90%] m-auto h-[30vh]'>
            <h3 className='text-2xl font-semibold font-info'>Booked Dates</h3>
            {
                successfulBookings?.map((booking, i) => (
                    <p key={i} className='bg-base-300 w-[20%] py-2 text-center mt-3 font-semibold rounded-md'>
                        {booking.date} - {booking.month} {booking.from} - {booking.to}
                    </p>
                ))
            }
        </div>
    );
};

export default BookesDates;
    