import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import {  LoaderPinwheel } from 'lucide-react'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_POINT } from './utils/constant'
import { setUser } from '@/redux/authSlice'

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [ loading, setloading ] = useState(false)
  const { user } = useSelector((store) => store.auth)
    const dispatch = useDispatch()
  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skils: user?.profile?.skills?.map((skill) => skill),
    file: user?.profile?.resume,
  })
  const changeEventHandler = (e)=>{
    setInput({...input,[e.target.name]:e.target.value})
  }

  const changeFileHandler=(e)=>{
    const file = e.target.files?.[0];
    setInput({...input,file})
  }

  const submitHandler=async(e)=>{
    e.preventDefault();
    const formData = new FormData()
    formData.append('fullname',input.fullname)
    formData.append('email',input.email)
    formData.append('phoneNumber',input.phoneNumber)
    formData.append('bio',input.bio)
    formData.append('skills',input.skils)
    if(input?.file){
        formData.append('file',input.file)
    }
    try {
        setloading(true)
        const {data} = await axios.post(`${USER_API_POINT}/update`,formData,{withCredentials:true,headers:{
            "Content-Type":"multipart/form-data"
        }}) 
        console.log(data)
        dispatch(setUser(data.user))
        toast.success(data.message)
    } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message)
    } finally{
        setloading(false)
    }
    setOpen(false)
  }

  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={input.fullname}
                  name="fullname"
                  type='text'
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type='email'
                  value={input.email}
                  onChange={changeEventHandler}
                  name="email"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phoneNumber" className="text-right">
                  Number
                </Label>
                <Input
                  id="phoneNumber"
                  type='number'
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  name="phoneNumber"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Input
                  id="bio"
                  name="bio"
                  type='text'
                  value={input.bio}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skils" className="text-right">
                  Skils
                </Label>
                <Input
                  id="skils"
                  name="skils"
                  type='text'
                  value={input.skils}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  Resume
                </Label>
                <Input
                  id="file"
                  type="file"
                  accept="application/pdf"
                  onChange={changeFileHandler}
                  name="file"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4">
                  <LoaderPinwheel className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full my-4 bg-blue-600 hover:bg-blue-400"
                >
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UpdateProfileDialog
