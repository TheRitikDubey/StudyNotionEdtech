import React, {useEffect, useState} from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'
import {IoIosArrowDropdownCircle} from "react-icons/io"
import { useSelector } from 'react-redux'
import {AiOutlineShoppingCart} from "react-icons/ai"
import { apiConnector } from '../../services/apiConnector'
import { categories } from '../../services/apis'
import toast from 'react-hot-toast'
import ProfileDropdown from './ProfileDropDown'
import { useDispatch } from 'react-redux'
import { setAllCourses } from '../../slices/allCourseSlice'

export  const Navbar = ({screen}) => {

  const {token} = useSelector(state => state.auth)
  const {user} = useSelector(state => state.auth)
  const {totalItems} = useSelector( (state) => state.cart )
  const { allCourses } = useSelector( (state) => state.allCourses)
  
  const [subLinks,setSubLinks] = useState( allCourses || []);
  const location = useLocation();
  const dispatch = useDispatch()
  
  useEffect(() => {
    if(allCourses.length === 0){
      fetchSublinks()
    }
  }, [])

  const fetchSublinks = async() => {
    // fetch sublinks
    try {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
      };
      const response = await apiConnector("GET",categories.CATEGORIES_API,"",config)
      setSubLinks(response.data.data)
      dispatch(setAllCourses(response.data.data));
    } catch (error) {
      toast.error("Error occured while fetching sublinks")
      console.log("ERROR___occur",error);
    }
  }
 
  const matchRoute = (route)=>{
    return matchPath({path:route},location.pathname)
  }

  return (
    <div className='flex h-16 items-center justify-center border-b-[1px] border-b-richblack-700'>
      <div className='flex p-4 w-11/12 max-w-maxContent items-center justify-between'>
        {/* Image */}
      <Link to="/">
        <img src={logo} alt='studynotion' width={160} height={42} loading='lazy'/>
      </Link>

      {/* Nav Links */}
      <nav>
        <ul className='flex gap-x-6 text-richblack-25'>
        {
            NavbarLinks.map( (link, index) => (
                 <li key={index}>
                    {
                        link.title === "Catalog" ? (
                            <div className='relative flex items-center gap-2 group'>
                                <p className="">{link.title}</p>
                                <IoIosArrowDropdownCircle/>

                                <div className='invisible z-[100] absolute left-[50%]
                                    translate-x-[-50%] translate-y-[40%]
                                 top-[50%]
                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                opacity-0 transition-all duration-200 group-hover:visible
                                group-hover:opacity-100 lg:w-[300px]'>

                                <div className='absolute left-[50%] top-0
                                translate-x-[80%]
                                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                                </div>

                                {
                                    subLinks.length ? (
                                            subLinks.map( (subLink, index) => (
                                                <Link to={`${subLink.link}`} key={index}>
                                                    <p>{subLink.courseName}</p>
                                                </Link>
                                            ) )
                                    ) : (<div></div>)
                                }

                                </div>


                            </div>

                        ) : (
                            <Link to={link?.path}>
                                <p className={`${ matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                    {link.title}
                                </p>
                            </Link>
                        )
                    }
                </li>
             ) )
        }

        </ul>
      </nav>


        {/* Login/SignUp/Dashboard */}
        <div className='flex gap-x-4 items-center'>
            
            {
                user && user?.accountType != "Instructor" && (
                    <Link to="/dashboard/cart" className='relative'>
                        <AiOutlineShoppingCart />
                        {
                            totalItems > 0 && (
                                <span>
                                    {totalItems}
                                </span>
                            )
                        }
                    </Link>
                )
            }
            {
                token === null && screen !== "login" && (
                    <Link to="/login">
                        <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            Log in
                        </button>
                    </Link>
                )
            }
            {
                token === null && screen !== "signup" && (
                    <Link to="/signup">
                        <button  className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            Sign Up
                        </button>
                    </Link>
                )
            }
             {
              token !== null && <ProfileDropdown />
            }
            
        </div>


      </div>
    </div>  

  )
}

