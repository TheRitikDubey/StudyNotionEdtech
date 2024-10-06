import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import VerifyEmail from "./pages/VerifyEmail";
import { lazy, Suspense } from 'react';
import { useEffect } from "react";
import { apiConnector } from "./services/apiConnector";
import { categories } from "./services/apis";
import LoginForm from "./components/core/Auth/LoginForm";
import SignupForm from "./components/core/Auth/SignUpForm";
import OpenRoute from "./components/core/Auth/OpenRoute";
import ForgotPassword from "./pages/ForgetPassowrd";
import About from "./pages/About";
import Error from "./pages/Error";
import UpdatePassword from "./pages/UpdatePassword";
function App() {
  const getCourse = (async() =>{
    try {
      const response = await apiConnector("GET",categories.CATEGORIES_API)
      console.log("res",response);
    } catch (error) {
      console.error("ERROR___occur")
    }
  })
  useEffect(() => {
    getCourse();
  }, [])
  
  return (
    <div className="flex flex-col font-inter min-h-screen w-screen  bg-richblack-900">
      <BrowserRouter>
      <Suspense fallback={<div className="container">Loading...</div>}></Suspense>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
      <Route
          path="/signup"
          element={
            <OpenRoute>
              <SignupForm />
            </OpenRoute>
          }
        />
    <Route
          path="login"
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
            <OpenRoute>
              <About />
            </OpenRoute>
          }
        />
    {/* <Route path="/contact" element={<Contact />} />

    <Route 
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    >
      <Route path="dashboard/my-profile" element={<MyProfile />} />
      <Route path="dashboard/Settings" element={<Settings />} />
      

      {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route path="dashboard/cart" element={<Cart />} />
          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
          </>
        )
      }


    </Route> */}

    

    <Route path="*" element={<Error />} />

        </Routes>
        <Suspense/>
      </BrowserRouter>
    </div>
  );
}

export default App;
