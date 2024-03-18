import React, { useContext, useEffect } from 'react'
import Navbar from '../../components/user/HomePage/Navbar'
import NotificationBox from '../../components/user/NotificationPage/NotificationBox'
import { notificationService } from "../../services/socketservice/notificationService"
import { SocketContext } from '../../store/redux/slices/SocketContext'
import { useQuery } from '@tanstack/react-query'
import { viewAppointment } from '../../services/api/userRoute'
import AppointmentApproved from '../../components/user/NotificationPage/AppointmentApproved'
import AnimatedPage from '../../services/Animation/AnimatedPage'


const Notification = () => {
  // const { sendDataToServer } = useContext(SocketContext);

  let iduser;
  const jwtToken = localStorage.getItem('persist:root');

  if (JSON.parse(jwtToken).user !== "null") {
    const decodedToken = JSON.parse(atob(jwtToken.split('.')[1]));

    const userId = decodedToken.id;
    iduser = userId
  }

  const { data: myAppointment } = useQuery({
    queryKey: ["appointment", iduser],
    queryFn: viewAppointment

  })
  console.log(myAppointment);
  return (
    <div>
      <AnimatedPage>

        <Navbar />
        {myAppointment?.status === "approved" ?
          <AppointmentApproved />
          :
          <NotificationBox />
        }
      </AnimatedPage>
    </div>
  )
}

export default Notification
