import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { toast } from 'sonner'
import axios from 'axios'
import { JOB_API_POINT } from '../utils/constant'
import { Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const PostJobs = () => {
  const [input, setInput] = useState({
    title: '',
    discription: '',
    requirements: '',
    salary: '',
    location: '',
    jobType: '',
    experience: '',
    position: 0,
    companyId: '',
  })
  const [loadng,setLoading] = useState(false)
  const navigate = useNavigate()
  const { compinies } = useSelector((store) => store.company)
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handelSelectChangeHander = (value) => {
    const selectedCompany = compinies.find(
      (company) => company?.name.toLowerCase() === value,
    )
    setInput({ ...input, companyId: selectedCompany._id })
  }

  const submitHandeler = async (e) => {
    e.preventDefault()
    // console.log(input)
    try {
        setLoading(true)
      const { data } = await axios.post(`${JOB_API_POINT}/post`, input, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      })
      toast.success(data.message)
      navigate('/admin/jobs')
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message)
    } finally{
        setLoading(false)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={submitHandeler}
          className="p-8 max-w-4xl border shadow-lg rounded-lg"
        >
          <h1 className="my-4 text-2xl text-center font-bold underline text-[#e4c40e]">
            Add new job
          </h1>
          <div className="grid grid-cols-2 gap-2">
            <div className="">
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                required
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div className="">
              <Label>discription</Label>
              <Input
                type="text"
                name="discription"
                value={input.discription}
                onChange={changeEventHandler}
                required
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div className="">
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                required
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div className="">
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                required
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div className="">
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                required
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div className="">
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                required
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div className="">
              <Label>Experience</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                required
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div className="">
              <Label>Number of Position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                required
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            {compinies.length > 0 && (
              <Select required onValueChange={handelSelectChangeHander}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {compinies.map((company) => {
                      return (
                        <SelectItem
                          key={company?._id}
                          value={company?.name.toLowerCase()}
                        >
                          {company?.name}
                        </SelectItem>
                      )
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
          <Button className="w-full my-4  bg-[#5ee5b8] text-black font-bold hover:bg-[#3cc899]">
            {loadng ? `${<Loader2 className='animate-spin' />}Please wait` : 'Submit'}
          </Button>
          {compinies.length === 0 && (
            <p className="text-xs text-red-600 text-center">
              *Please register a company first, before posting a job
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

export default PostJobs
