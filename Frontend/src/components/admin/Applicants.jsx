import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantasTable from './ApplicantasTable'
import { toast } from 'sonner'
import axios from 'axios'
import { APPLICATION_API_POINT } from '../utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setApplicants } from '@/redux/Application'

const Applicants = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const { applicants } = useSelector((store) => store.application)
  // console.log(applicants)
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const { data } = await axios.get(
          `${APPLICATION_API_POINT}/${params.id}/applicants`,
          {
            withCredentials: true,
          },
        )
        dispatch(setApplicants(data?.job))
      } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message)
      }
    }
    fetchApplicants()
  }, [])
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-5">
          Application ({applicants?.applications?.length})
        </h1>
        <ApplicantasTable />
      </div>
    </div>
  )
}

export default Applicants
