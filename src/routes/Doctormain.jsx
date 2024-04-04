import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../pages/doctor/Dashboard";
import DoctorLogin from "../pages/doctor/DoctorLogin";
import { DoctorProtectLoginRoute } from "../store/others/DoctorLoginProtectRoute";
import { DoctorProtectRoute } from "../store/others/doctorProtectRoute";
import SetdatesPage from "../pages/doctor/SetdatesPage";
import PendingAppointment from "../pages/doctor/PendingAppointment";
import ViewPendingAppointment from "../pages/doctor/ViewPendingAppointment";
import ChatWithPatients from "../pages/doctor/ChatWithPatients";
import VideoChatPage from "../pages/doctor/VideoChatPage";
import PrescriptionPage from "../pages/doctor/PrescriptionPage";
import CompletedPatientsPage from "../pages/doctor/CompletedPatientsPage";
import PatientsAnalysticsPage from "../pages/doctor/PatientsAnalysticsPage";
import Error from "../components/common/Error";

const Doctormain = () => {
  const router = createBrowserRouter([
    {
      path: "/doctor",
      element: (
        <DoctorProtectRoute>
          <Dashboard />
        </DoctorProtectRoute>
      ),
      errorElement: <Error />,
    },
    {
      path: "/doctor/setdates",
      element: <SetdatesPage />,
    },
    {
      path: "/doctor/prescription",
      element: <PrescriptionPage />,
    },
    {
      path: "/doctor/patients",
      element: <PendingAppointment />,
    },
    {
      path: "/doctor/patientHistory",
      element: <CompletedPatientsPage />,
    },
    {
      path: "/doctor/chat",
      element: <ChatWithPatients />,
    },
    {
      path: "/doctor/analystics",
      element: <PatientsAnalysticsPage />,
    },
    {
      path: "/doctor/chat/videoCall",
      element: <VideoChatPage />,
    },
    {
      path: "/doctor/patients/:id",
      element: <ViewPendingAppointment />,
    },
    {
      path: "/doctor/login",
      element: (
        <DoctorProtectLoginRoute>
          <DoctorLogin />
        </DoctorProtectLoginRoute>
      ),
    },
  ]);
  return (
    <div>
      <RouterProvider key={window.location.pathname} router={router} />
    </div>
  );
};

export default Doctormain;
