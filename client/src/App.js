import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useSelector } from "react-redux";
function App() {
  const {token} = useSelector((state) => state.auth)
  console.log("tkn",token);
  return (
    <div className="flex flex-col font-inter min-h-screen w-screen  bg-richblack-900">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
