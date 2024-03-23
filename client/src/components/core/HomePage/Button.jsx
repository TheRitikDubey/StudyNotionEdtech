import React from 'react'
import { Link } from 'react-router-dom'

function Button({children,active,linkTo}) {
  return (
        <Link to={linkTo}>
            <div className={`rounded-md text-[14px] text-center px-4 py-3 lg:px-7 font-semibold ${active?"bg-yellow-50 text-black":"bg-richblack-800"} hover:scale-95 transition-all duration-200 `}>
                    {children}
            </div>
        </Link>
  )
}

export default Button