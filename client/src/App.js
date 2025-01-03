import "./App.css";
import { BrowserRouter, useNavigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import VerifyEmail from "./pages/VerifyEmail";
import { Suspense, useEffect } from 'react';
import { apiConnector } from "./services/apiConnector";
import { categories } from "./services/apis";
import LoginForm from "./components/core/Auth/LoginForm";
import SignupForm from "./components/core/Auth/SignUpForm";
import OpenRoute from "./components/core/Auth/OpenRoute";
import ForgotPassword from "./pages/ForgetPassowrd";
import About from "./pages/About";
import Error from "./pages/Error";
import UpdatePassword from "./pages/UpdatePassword";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/dashboard/MyProfile";
import Settings from "./components/core/dashboard/Settings/index";
import {getUserDetails} from "./services/operations/profileAPI";
import Cart from "./components/core/dashboard/Cart";
import { useSelector, useDispatch } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import EnrolledCourses from "./components/core/dashboard/EnrolledCourses";
function App() {
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  const { user } = useSelector((state) => state.profile)

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     const token = JSON.parse(localStorage.getItem("token"))
  //     dispatch(getUserDetails(token, navigate))
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
  
  return (
    <div className="flex flex-col font-inter min-h-screen w-screen  bg-richblack-900">
      <BrowserRouter>
      <Suspense fallback={<div className="container">Loading...</div>}></Suspense>
        <Routes>
          <Route path="/" element={<HomePage />} />
      <Route
          path="/signup"
          element={
            <OpenRoute>
              <SignupForm />
            </OpenRoute>
          }
        />
    <Route
          path="/login"
          element={
            <OpenRoute>
              <LoginForm />
            </OpenRoute>
          }
        />

    <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />  

      <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />  

    <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />  

    <Route
          path="about"
          element={
              <About />
          }
        />
     <Route path="/contact" element={<Contact />} />

    <Route 
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    >
      <Route path="dashboard/my-profile" element={<MyProfile />} />
      <Route path="dashboard/Settings" element={<Settings />} />
      

      {/* {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route path="dashboard/cart" element={<Cart />} />
          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
          </>
        )
      } */}

      {/* Route only for Students */}
      {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              />
              <Route path="/dashboard/cart" element={<Cart />} />
            </>
          )}


    </Route>

    

    <Route path="*" element={<Error />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
