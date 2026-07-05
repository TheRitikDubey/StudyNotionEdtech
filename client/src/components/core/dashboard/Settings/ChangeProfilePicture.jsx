import { useRef, useState } from "react"
import { FiUpload } from "react-icons/fi"
import { toast } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"

import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)

  const fileInputRef = useRef(null)

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      previewFile(file)
    }
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleCancelSelection = () => {
    setImageFile(null)
    setPreviewSource(null)
    fileInputRef.current.value = ""
  }

  const handleFileUpload = () => {
    if (!imageFile) {
      toast.error("Please choose a photo first")
      return
    }
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("displayPicture", imageFile)
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false)
        setImageFile(null)
        setPreviewSource(null)
        fileInputRef.current.value = ""
      })
    } catch (error) {
      setLoading(false)
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-6 text-richblack-5 sm:px-12">
      <div className="flex items-center gap-x-4">
        <a
          href={previewSource || user?.Image}
          target="_blank"
          rel="noreferrer"
          title="View full size photo"
          className="group relative shrink-0"
        >
          <img
            src={previewSource || user?.Image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover ring-2 ring-richblack-700 transition-all duration-200 group-hover:ring-yellow-50 group-hover:brightness-75"
          />
        </a>
        <div className="space-y-2">
          <p className="font-semibold text-richblack-5">
            Change Profile Picture
          </p>
          <p className="text-xs text-richblack-300">
            {imageFile
              ? `Selected: ${imageFile.name}`
              : "PNG, JPG or GIF. Click the photo to view it full size."}
          </p>
          <div className="flex flex-row gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/gif, image/jpeg"
            />
            {!imageFile ? (
              <button
                onClick={handleClick}
                disabled={loading}
                className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50 transition-all duration-200 hover:bg-richblack-600"
              >
                Choose Photo
              </button>
            ) : (
              <>
                <IconBtn
                  text={loading ? "Uploading..." : "Upload"}
                  onclick={handleFileUpload}
                  disabled={loading}
                >
                  {!loading && (
                    <FiUpload className="text-lg text-richblack-900" />
                  )}
                </IconBtn>
                <button
                  onClick={handleCancelSelection}
                  disabled={loading}
                  className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50 transition-all duration-200 hover:bg-richblack-600"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
