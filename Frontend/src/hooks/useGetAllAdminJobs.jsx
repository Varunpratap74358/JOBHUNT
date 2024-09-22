import { JOB_API_POINT } from '@/components/utils/constant'
import { setAllAdminJobs } from '@/redux/jobSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const { data } = await axios.get(`${JOB_API_POINT}/getadminjobs`, {
          withCredentials: true,
        })
        dispatch(setAllAdminJobs(data.jobs))
      } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message)
      }
    }
    fetchAllAdminJobs()
  }, [])
}

export default useGetAllAdminJobs
