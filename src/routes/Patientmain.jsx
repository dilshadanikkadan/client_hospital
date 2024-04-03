import React, { useEffect } from "react";
import Navbar from "../components/user/HomePage/Navbar";
import {
  createBrowserRouter,
  Router,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import Home from "../pages/patient/Home";
import About from "../pages/patient/About";
import Contact from "../pages/patient/Contact";
import VeifyEmail from "../pages/patient/VeifyEmail";
import { ProtectedRoute } from "../store/others/ProtecteRoute";
import SignUp from "../pages/patient/SignUp";
import Login from "../pages/patient/Login";
import ForgotPassword from "../pages/patient/ForgotPassword";
import ForgotOtpVerify from "../pages/patient/ForgotOtpVerify";
import ResetPassword from "../pages/patient/ResetPassword";
import Service from "../pages/patient/Service";
import ApllicationPartOne from "../pages/doctor/ApllicationPartOne";
import ApplicationpartTwo from "../pages/doctor/ApplicationpartTwo";
import ApplicationPartThree from "../pages/doctor/ApplicationPartThree";
import ApplicationSuccessPage from "../pages/doctor/ApplicationSuccessPage";
import { ApplicationProtectRoute } from "../store/others/ApplicationProtectRoute";
import PatientProfile from "../pages/patient/PatientProfile";
import CheckPage from "../pages/patient/CheckPage";
import { AnimatePresence } from "framer-motion";
import { BlockeduserCheck } from "../store/others/BlockedUserCheck";
import Notification from "../pages/patient/Notification";
import SingleNotification from "../pages/patient/SingleNotification";
import AppointmentPageOne from "../pages/patient/AppointmentPageOne";
import AppointmentPageTwo from "../pages/patient/AppointmentPageTwo";
import AppointmentSucessPage from "../pages/patient/AppointmentSucessPage";
import ViewAppointment from "../pages/patient/ViewAppointment";
import SingleDoctorView from "../pages/patient/SingleDoctorView";
import DoctorsPage from "../pages/patient/DoctorsPage";
import LoadingPage from "../pages/common/LoadingPage";
import PaymentSuccessPage from "../pages/patient/PaymentSuccessPage";
import PaymentRecievedPage from "../pages/patient/PaymentRecievedPage";
import VerifiedPage from "../pages/patient/VerifiedPage";
import ResheduleAppointmentPage from "../pages/patient/ResheduleAppointmentPage";
import ChatPatientPage from "../pages/patient/ChatPatientPage";
import ChatWithPatients from "../pages/doctor/ChatWithPatients";
import VideoChatPage from "../pages/doctor/VideoChatPage";
import { CallStateRoute } from "../store/others/CallState";
import AppointmentHistoryPage from "../pages/patient/AppointmentHistoryPage";
import AppointmentHistorySingleView from "../pages/patient/AppointmentHistorySingleView";
import Error from "../components/common/Error";
import ContactPage from "../pages/patient/ContactPage";
const Patientmain = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <BlockeduserCheck>
          <CallStateRoute>
            <Home />
          </CallStateRoute>
        </BlockeduserCheck>
      ),
      errorElement: <Error />,
    },
    {
      path: "/check",
      element: <LoadingPage />,
    },
    {
      path: "/about",
      element: (
        <BlockeduserCheck>
          <CallStateRoute>
            <About />
          </CallStateRoute>
        </BlockeduserCheck>
      ),
    },
    {
      path: "/Ourdoctors",
      element: (
        <BlockeduserCheck>
          <CallStateRoute>
            <DoctorsPage />
          </CallStateRoute>
        </BlockeduserCheck>
      ),
    },
    {
      path: "/service",
      element: (
        <BlockeduserCheck>
          <CallStateRoute>
            <Service />
          </CallStateRoute>
        </BlockeduserCheck>
      ),
    },
    {
      path: "/signup",
      element: (
        <ProtectedRoute>
          <SignUp />
        </ProtectedRoute>
      ),
    },

    {
      path: "/about/allDoctors/:id",
      element: (
        <CallStateRoute>
          <SingleDoctorView />
        </CallStateRoute>
      ),
    },
    {
      path: "/allDoctors/:id",
      element: (
        <CallStateRoute>
          <SingleDoctorView />
        </CallStateRoute>
      ),
    },
    {
      path: "/makeAppointment",
      element: (
        <ApplicationProtectRoute>
          <AppointmentPageTwo />
        </ApplicationProtectRoute>
      ),
    },
    {
      path: "/makeAppointment/_2",
      element: <AppointmentPageOne />,
    },
    {
      path: "/makeAppointment/_2/sucess",
      element: <AppointmentSucessPage />,
    },
    {
      path: "/reshedule_appointment",
      element: <ResheduleAppointmentPage />,
    },
    {
      path: "/payment/sucess",
      element: <PaymentSuccessPage />,
    },
    {
      path: "/payment/recieved",
      element: <PaymentRecievedPage />,
    },
    {
      path: "/application/verified",
      element: <VerifiedPage />,
    },

    {
      path: "/viewAppointment",
      element: <ViewAppointment />,
    },
    {
      path: "/appointmentHistory",
      element: <AppointmentHistoryPage />,
    },
    {
      path: "/appointmentHistory/:id",
      element: <AppointmentHistorySingleView />,
    },
    {
      path: "/chat_doctors",
      element: (
        <CallStateRoute>
          <ChatWithPatients />
        </CallStateRoute>
      ),
    },
    {
      path: "/chat_doctors/videoCall",
      element: <VideoChatPage />,
    },
    {
      path: "service/application_1",
      element: (
        <ApplicationProtectRoute>
          <ApllicationPartOne />
        </ApplicationProtectRoute>
      ),
    },
    {
      path: "service/application_1/_2",
      element: (
        <ApplicationProtectRoute>
          <ApplicationpartTwo />
        </ApplicationProtectRoute>
      ),
    },
    {
      path: "service/application_1/_2/_3",
      element: (
        <ApplicationProtectRoute>
          <ApplicationPartThree />
        </ApplicationProtectRoute>
      ),
    },
    {
      path: "service/application_1/_2/_3/success",
      element: (
        <ApplicationProtectRoute>
          <ApplicationSuccessPage />
        </ApplicationProtectRoute>
      ),
    },

    {
      path: "/login",
      element: (
        <ProtectedRoute>
          <Login />
        </ProtectedRoute>
      ),
    },
    {
      path: "/profile",
      element: (
        <BlockeduserCheck>
          <ApplicationProtectRoute>
            <PatientProfile />
          </ApplicationProtectRoute>
        </BlockeduserCheck>
      ),
    },
    {
      path: "/verifyEmail",
      element: (
        <ProtectedRoute>
          <VeifyEmail />
        </ProtectedRoute>
      ),
    },
    {
      path: "/forgotPassword",
      element: (
        <ProtectedRoute>
          <ForgotPassword />
        </ProtectedRoute>
      ),
    },
    {
      path: "/verifyOtp",
      element: (
        <ProtectedRoute>
          <ForgotOtpVerify />
        </ProtectedRoute>
      ),
    },
    {
      path: "/resetPassword",
      element: (
        <ProtectedRoute>
          <ResetPassword />
        </ProtectedRoute>
      ),
    },

    {
      path: "/notification",
      element: (
        <BlockeduserCheck>
          <Notification />
        </BlockeduserCheck>
      ),
    },
    {
      path: "/error",
      element: <Error />,
    },
    {
      path: "/notification/:id",
      element: (
        <BlockeduserCheck>
          <SingleNotification />
        </BlockeduserCheck>
      ),
    },
    {
      path: "/contact",
      element: <ContactPage />,
    },
  ]);
  return (
    <div>
      <AnimatePresence onExitComplete>
        <RouterProvider key={window.location.pathname} router={router} />
      </AnimatePresence>
    </div>
  );
};

export default Patientmain;
