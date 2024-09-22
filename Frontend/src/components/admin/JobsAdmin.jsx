import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

const JobsAdmin = () => {
    useGetAllAdminJobs()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [input, setInput] = useState('')

  useEffect(()=>{
    dispatch(setSearchJobByText(input))
  },[input])
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-10 ">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit "
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="filter by company name and role"
          />
          <Button onClick={() => navigate('/admin/jobs/create')}>
            Post New Job
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  )
}

export default JobsAdmin
