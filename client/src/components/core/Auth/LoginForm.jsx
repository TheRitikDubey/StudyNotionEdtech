import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../../common/Navbar";
import loginImg from "../../../assets/Images/login.webp";
import { login } from "../../../services/operations/authAPI";
import { ACCOUNT_TYPE } from "../../../utils/constants"
import Tab from "../../common/Tab"
import { tabData } from "./SignUpForm";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  // const [isStudent,setIsStudent] = useState(true);
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, accountType, navigate));
  };

  return (
    <div className="overflow-x-hidden h-full">
      <Navbar screen="login" />
      <div className="text-white h-[75vh] flex justify-evenly items-center">
        <div className="flex flex-col justify-evenly">
          <div className="flex justify-start flex-col gap-2 w-[25rem]" style={{textWrap:'wrap'}}>
            <div className="text-2xl font-bold">Welcome Back</div>
            <div className="text-pure-greys-200 text-wrap">
              Build skills for today, tomorrow and beyond.{" "}
              <span className="text-blue-100 font-mono">Education to future-proof your career</span>{" "}
            </div>
          </div>
          <Tab tabData={tabData} field={accountType} setField={setAccountType} />
          <form
            onSubmit={handleOnSubmit}
            className="mt-6 flex w-[100%] flex-col gap-y-4"
          >
            <label className="w-full">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Email Address <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type="text"
                name="email"
                value={email}
                onChange={handleOnChange}
                placeholder="Enter email address"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              />
            </label>
            <label className="relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              <Link to="/forgot-password">
                <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
                  Forgot Password
                </p>
              </Link>
            </label>
            <button
              type="submit"
              className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
            >
              Sign In
            </button>
          </form>
        </div>
        <div>
            <img src={loginImg} className="w-[30rem]" alt="LOGIN IMG" loading='lazy' />
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
