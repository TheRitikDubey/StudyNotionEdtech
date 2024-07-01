import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { apiConnector } from "./services/apiConnector";
import { categories } from "./services/apis";
import LoginPage from "./pages/LoginPage";
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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
