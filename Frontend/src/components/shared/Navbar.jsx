import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { LogOut, User2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { setUser } from '@/redux/authSlice'
import { USER_API_POINT } from '../utils/constant'

const Navbar = () => {
  const { user } = useSelector((store) => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${USER_API_POINT}/logout`, {
        withCredentials: true,
      })
      dispatch(setUser(null))
      navigate('/')
      toast.success(data?.message)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <div className="bg-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto md:flex-row flex-col">
        {/* Logo */}
        <div className="mb-3 md:mb-0">
          <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-red-500">
            Job <span className="text-red-500">Portal</span>
          </Link>
        </div>

        {/* Links and User Section */}
        <div className="flex items-center gap-8 w-full md:w-auto justify-between">
          {/* Navigation Links */}
          <ul className="flex font-medium items-center gap-5 flex-wrap">
            {user && user.role === 'recruiter' ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className="hover:text-red-500 transition duration-300"
                  >
                    Company
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className="hover:text-red-500 transition duration-300"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className="hover:text-red-500 transition duration-300"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="hover:text-red-500 transition duration-300"
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/brows"
                    className="hover:text-red-500 transition duration-300"
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Authentication & User Info */}
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="outline" className="text-gray-700 hover:bg-gray-100">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                  <AvatarFallback>
                    <img
                      src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
                      alt="Fallback Avatar"
                      className="rounded-full"
                    />
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 shadow-lg bg-white">
                <div className="flex items-center p-4">
                  <Avatar className="mr-4">
                    <AvatarImage src={user?.profile?.profilePhoto} />
                    <AvatarFallback>
                      <img
                        src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
                        alt="Fallback Avatar"
                        className="rounded-full"
                      />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-gray-500">{user?.bio}</p>
                  </div>
                </div>
                <div className="text-gray-600 p-4">
                  {user && user.role !== 'recruiter' && (
                    <Button variant="link" className="w-full text-left">
                      <User2 className="inline-block mr-2" />
                      <Link to="/profile">View Profile</Link>
                    </Button>
                  )}
                  <Button
                    onClick={logoutHandler}
                    variant="link"
                    className="w-full text-left text-red-600 hover:text-red-800 mt-3"
                  >
                    <LogOut className="inline-block mr-2" />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
