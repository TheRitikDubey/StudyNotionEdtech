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
import MyCourses from "./components/core/dashboard/MyCourses";
import EnrolledCourses from "./components/core/dashboard/EnrolledCourses";
// import Settings from "./components/core/dashboard/Settings"
import VideoDetails from "./components/core/ViewCourse/VideoDetails"
import EditCourse from "./components/core/dashboard/EditCourse"
import Catalog from "./pages/Catalog"
import CourseDetails from "./pages/CourseDetails"
import Instructor from "./components/core/dashboard/Instructor";
import AddCourse from "./components/core/dashboard/AddCourse"
// import Home from "./pages/"
// import Login from "./pages/Login"
// import Signup from "./pages/Signup"
import ViewCourse from "./pages/ViewCourse"
function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  const { user } = useSelector((state) => state.profile)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"))
      dispatch(getUserDetails(token, navigate))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <div className="flex flex-col font-inter min-h-screen w-screen  bg-richblack-900">
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
        

        {
          user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
            <Route path="dashboard/cart" element={<Cart />} />
            <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
            <Route path="/dashboard/cart" element={<Cart />} />
            </>
          )
        }
        {
          user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="/dashboard/my-courses" element={<MyCourses/>} />
              <Route path="dashboard/instructor" element={<Instructor />} />
                <Route path="dashboard/add-course" element={<AddCourse />} />
                <Route
                  path="dashboard/edit-course/:courseId"
                  element={<EditCourse />}
                />
            </>
          )
        }

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

      {/* For the watching course lectures */}
        <Route
            element={
              <PrivateRoute>
                <ViewCourse />
              </PrivateRoute>
            }
          >
            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route
                  path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                  element={<VideoDetails />}
                />
              </>
            )}
          </Route>

      

      

      <Route path="*" element={<Error />} />

          </Routes>
    </div>
  );
}

export default App;
