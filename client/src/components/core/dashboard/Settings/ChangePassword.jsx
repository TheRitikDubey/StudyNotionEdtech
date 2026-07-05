import { useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { changePassword } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"

export default function ChangePassword() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const submitPasswordForm = async (data) => {
    try {
      setLoading(true)
      await changePassword(token, data)
      setLoading(false)
      navigate("/dashboard/settings")
    } catch (error) {
      setLoading(false)
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Change Password
      </h1>
      <form onSubmit={handleSubmit(submitPasswordForm)}>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-6 text-richblack-25 sm:px-12">
          <div>
            <h2 className="text-lg font-semibold text-richblack-5">
              Update your password
            </h2>
            <p className="mt-1 text-sm text-richblack-300">
              Enter your current password, then choose and confirm a new one.
            </p>
          </div>
          <div className="flex flex-col gap-5 lg:max-w-[500px]">
            <div className="relative flex flex-col gap-2">
              <label htmlFor="oldPassword" className="lable-style">
                Current Password
              </label>
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter current password"
                className="form-style"
                {...register("oldPassword", { required: true })}
              />
              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              {errors.oldPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your current password.
                </span>
              )}
            </div>
            <div className="relative flex flex-col gap-2">
              <label htmlFor="newPassword" className="lable-style">
                New Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Enter new password"
                className="form-style"
                {...register("newPassword", {
                  required: {
                    value: true,
                    message: "Please enter your new password.",
                  },
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters.",
                  },
                })}
              />
              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              {errors.newPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.newPassword.message}
                </span>
              )}
            </div>
            <div className="relative flex flex-col gap-2">
              <label htmlFor="confirmNewPassword" className="lable-style">
                Confirm New Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmNewPassword"
                id="confirmNewPassword"
                placeholder="Re-enter new password"
                className="form-style"
                {...register("confirmNewPassword", {
                  required: {
                    value: true,
                    message: "Please confirm your new password.",
                  },
                  validate: (value) =>
                    value === watch("newPassword") ||
                    "Passwords do not match.",
                })}
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              {errors.confirmNewPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.confirmNewPassword.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => {
              navigate("/dashboard/settings")
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50 transition-all duration-200 hover:bg-richblack-600"
          >
            Cancel
          </button>
          <IconBtn
            type="submit"
            text={loading ? "Updating..." : "Update Password"}
            disabled={loading}
          />
        </div>
      </form>
    </>
  )
}
