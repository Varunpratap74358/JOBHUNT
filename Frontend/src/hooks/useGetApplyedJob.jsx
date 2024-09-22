import { APPLICATION_API_POINT } from '@/components/utils/constant'
import { setAllAppliedJob } from '@/redux/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetApplyedJob = () => {
    const dispatch = useDispatch()
  useEffect(()=>{
    const fetchApplliedJob = async()=>{
        try {
            const {data} = await axios.get(`${APPLICATION_API_POINT}/get`,{withCredentials:true})
            dispatch(setAllAppliedJob(data?.application))
        } catch (error) {
            console.log(error)
        }
    }
    fetchApplliedJob()
  },[])
}

export default useGetApplyedJob
