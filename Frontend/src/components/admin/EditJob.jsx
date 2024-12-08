import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useDispatch, useSelector } from 'react-redux'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import axios from 'axios'
import { JOB_API_POINT } from '../utils/constant'
import { toast } from 'sonner'

const EditJob = () => {
  const dispatch = useDispatch()
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
  const params = useParams()
  // console.log(params.id)

  const changeEventHandler = (e)=>{
    setInput({...input, [e.target.name]:e.target.value})
  }

  const handelSelectChangeHander = (value) => {
    const selectedCompany = compinies.find(
      (company) => company?.name.toLowerCase() === value,
    )
    setInput({ ...input, companyId: selectedCompany._id })
  }

  const updateJob = async(e)=>{
    e.preventDefault()
    try {
      setLoading(true)
      const {data} = await axios.put(`${JOB_API_POINT}/update/${params.id}`,{input},{headers:{"Content-Type":"application/json"},withCredentials:true})
      toast.success(data?.message)
      navigate("/admin/jobs")
    } catch (error) {
      toast.success(error?.response?.data?.message || "Error")
      console.log(error)
    } finally{
      setLoading(false)
    }
  }

  const fetchJob = async()=>{
    try {
      const {data} = await axios.get(`${JOB_API_POINT}/get/${params.id}`)
      // console.log(data)
      if (data.success) {
        setInput({
          title: data.job.title || "",
          discription: data.job.discription || "",
          salary: data.job.salary || "",
          location: data.job.location || "",
          jobType: data.job.jobType || "",
          experience: data.job.experienceLabel || "",
          position: data.job.position || 0,
          requirements: data.job.requirements || "",
        });
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchJob()
  },[])

  // console.log(jobData.requirements.join(","))
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={updateJob}
          className="p-8 max-w-4xl border shadow-lg rounded-lg"
        >
          <h1 className="my-4 text-2xl text-center font-bold underline text-[#e4c40e]">
            Update Job
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
          <Button className="w-full my-4  bg-[#edc71b] text-black font-bold hover:bg-[#d9e229]">
            {loadng ? <span className='flex items-center gap-2'><Loader2 className='animate-spin' /> Please wait...</span> : 'Update'}
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

export default EditJob
