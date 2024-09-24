import useSavedJob from '@/hooks/useSavedJob'
import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from './shared/Navbar'
import Job from './Job'
import SavedJobSComponante from './SavedJobSComponante'

const SavedJobs = () => {
  useSavedJob()
  const { savedJob } = useSelector((store) => store.saved)
//   console.log(savedJob)
  return (
    <div>
      <Navbar />
      {savedJob.length < 0 ? (
        <h1 className="text-center my-20 text-3xl font-bold text-yellow-500">
          You not saved any job
        </h1>
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-3 sm:grid-cols-1 p-5">
          {savedJob?.map((item) => {
            return (
              <SavedJobSComponante key={item._id} item={item} />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SavedJobs
