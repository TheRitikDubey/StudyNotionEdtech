import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"
import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { Auth } from "../apis"

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
  OAuthVerify
} = Auth

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  phoneNumber,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        phoneNumber,
        otp,
      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function login(email, password, accountType, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading('Logging in...')
    try {
      dispatch(setLoading(true))

      const response = await apiConnector('POST', LOGIN_API, {
        email,
        password,
        accountType,
      })

      console.log('LOGIN API RESPONSE:', response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      const { token, user } = response.data

      const userImage = user?.image
        ? user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName} ${user.lastName}`

      const userData = { ...user, image: userImage }

      // Set data in Redux
      dispatch(setToken(token))
      dispatch(setUser(userData))

      // Set data in local storage
      localStorage.setItem('token', JSON.stringify(token))
      localStorage.setItem('user', JSON.stringify(userData))

      // Success toast and navigate
      toast.success('Login Successful')
      navigate('/dashboard/my-profile')
    } catch (error) {
      console.error('LOGIN API ERROR:', error)
      toast.error(error?.response?.data?.message || error.message || 'Login Failed')
    } finally {
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/login")
  }
}



export function getPasswordResetToken(email , setEmailSent) {
  return async(dispatch) => {
    dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {email,})

      console.log("RESET PASSWORD TOKEN RESPONSE....", response);

      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);
    }
    catch(error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Failed to send email for resetting password");
    }
    dispatch(setLoading(false));
  }
}

export function resetPassword(password, confirmPassword, token,navigate) {
  return async(dispatch) => {
    dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST", RESETPASSWORD_API, {password, confirmPassword, token});

      console.log("RESET Password RESPONSE ... ", response);


      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password has been reset successfully");
      navigate('/login');
    }
    catch(error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Unable to reset password");
    }
    dispatch(setLoading(false));
  }
}

export function SignInWithGoogle() {
    const val = window.location.href = 'http://localhost:9521/auth/google'; // Your backend URL
    console.log(val);
    
}

export function sigInWithOauth(token,navigate) {
  return async(dispatch) => {
    dispatch(setLoading(true));
    try{
      // Optional: Save token first
      localStorage.setItem('token', JSON.stringify(token));
      dispatch(setToken(token));

      // Fetch user profile from backend (optional step)
      const response = await apiConnector('GET', OAuthVerify, null, {
        Authorization: `Bearer ${token}`,
      });

      const user = response.data.user; // Adjust based on your backend

      const userImage = user?.image
        ? user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName} ${user.lastName}`;

      const userData = { ...user, image: userImage };

      // Save user data
      localStorage.setItem('user', JSON.stringify(userData));
      dispatch(setUser(userData));

      toast.success('Login Successful!');
      navigate('/dashboard/my-profile');
    }
    catch(error) {
      console.log("Login Error", error);
      toast.error("Unable to login with Google");
    }
    dispatch(setLoading(false));
  }
}

