import { JOB_API_POINT } from '@/components/utils/constant'
import { setAllJobs } from '@/redux/jobSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const useGetAllJobs = () => {
  const dispatch = useDispatch()
  const { searchedQuery } = useSelector((store) => store.job)
  useEffect(() => {
    const fetAllJobs = async () => {
      try {
        const { data } = await axios.get(
          `${JOB_API_POINT}/get?keyword=${searchedQuery}`,
          {
            withCredentials: true,
          },
        )
        // console.log(data)
        dispatch(setAllJobs(data.jobs))
      } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message)
      }
    }
    fetAllJobs()
  }, [])
}

export default useGetAllJobs
