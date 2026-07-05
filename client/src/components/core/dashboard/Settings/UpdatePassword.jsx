import { useNavigate } from "react-router-dom"

export default function UpdatePassword() {
  const navigate = useNavigate()

  return (
    <div className="my-10 flex flex-col items-start justify-between gap-4 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-6 text-richblack-25 sm:flex-row sm:items-center sm:px-12">
      <div>
        <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
        <p className="mt-1 text-sm text-richblack-300">
          Change your password anytime to keep your account secure.
        </p>
      </div>
      <button
        onClick={() => navigate("/dashboard/settings/change-password")}
        className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50 transition-all duration-200 hover:bg-richblack-600"
      >
        Change Password
      </button>
    </div>
  )
}
