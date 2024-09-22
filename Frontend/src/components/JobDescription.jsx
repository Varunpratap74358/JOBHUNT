import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { APPLICATION_API_POINT, JOB_API_POINT } from './utils/constant'
import Navbar from './shared/Navbar'

const JobDescription = () => {
  const params = useParams()
  const jobId = params.id
  const dispatch = useDispatch()
  const { singleJob } = useSelector((store) => store.job)
  const { user } = useSelector((store) => store.auth)
  
  const [isApplied, setIsApplied] = useState(false)

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const { data } = await axios.get(`${JOB_API_POINT}/get/${jobId}`, {
          withCredentials: true,
        })
        dispatch(setSingleJob(data.job))
        
        
        // Update the `isApplied` state after fetching job data
        const hasApplied = data.job.applications.some(
          (application) => application.applicant === user?._id,
        )
        setIsApplied(hasApplied)
      } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message)
      }
    }
    fetchSingleJob()
  }, [jobId, dispatch, user?._id])

  const applyJobHandler = async () => {
    try {
      const { data } = await axios.get(`${APPLICATION_API_POINT}/apply/${jobId}`, {
        withCredentials: true,
      })
      toast.success(data.message)
      setIsApplied(true)

      // Update the job's application state in Redux
      const updatedSingleJob = {
        ...singleJob,
        applications: [...singleJob.applications, { applicant: user?._id }],
      }
      dispatch(setSingleJob(updatedSingleJob))
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl">{singleJob?.title}</h1>
            <div className="flex items-center gap-2 mt-4">
              <Badge className={'text-blue-700 font-bold'} variant="ghost">
                {singleJob?.position} Position
              </Badge>
              <Badge className={'text-red-600 font-bold'} variant="ghost">
                {singleJob?.jobType}
              </Badge>
              <Badge className={'text-yellow-600 font-bold'} variant="ghost">
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}
          >
            {isApplied ? 'Already Applied' : 'Apply Now'}
          </Button>
        </div>
        <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
          Job Description
        </h1>
        <div className="my-4">
          <h1 className="font-bold my-1">
            Role :{' '}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.title}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Location :{' '}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.location}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Description :{' '}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.description}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Experience :{' '}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.experienceLabel} Year
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Salary :{' '}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.salary} LPA
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Total Applications :{' '}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.applications?.length}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Post Date :{' '}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.createdAt?.substring(0, 10)}
            </span>
          </h1>
        </div>
      </div>
    </>
  )
}

export default JobDescription
