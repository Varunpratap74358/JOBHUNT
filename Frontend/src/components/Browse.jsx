import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'


const Browse = () => {
  useGetAllJobs()
  const {allJobs} = useSelector(store=>store.job)
  const dispatch = useDispatch()
  // console.log(allJobs)
  useEffect(()=>{
    dispatch(setSearchedQuery(''))
  },[])
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results (
          <span className="text-red-600">{allJobs?.length}</span>)
        </h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 ">
          {allJobs?.map((job, i) => {
            return <Job key={i} item={job} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Browse
