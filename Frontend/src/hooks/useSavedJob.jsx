import {  SAVED_API_POINT } from '@/components/utils/constant'
import { setSavedJob } from '@/redux/savedJobSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const useSavedJob = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchsavedjob = async () => {
        const {data} = await axios.get(`${SAVED_API_POINT}/getsavedjob`,{withCredentials:true})
        dispatch(setSavedJob(data.savedJob))
      try {
      } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message)
      }
    }
    fetchsavedjob()
  }, [])
}

export default useSavedJob
