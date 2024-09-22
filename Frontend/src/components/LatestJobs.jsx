import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job)

  return (
    <div className="max-w-7xl px-5 py-10 mx-auto my-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center">
        <span className="text-red-500">Latest & Top </span>Job Openings
      </h1>

      {allJobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
          {allJobs.slice(0, 6).map((item, i) => (
            <LatestJobCards key={i} item={item} />
          ))}
        </div>
      ) : (
        <h1 className="font-bold text-2xl md:text-3xl text-center w-full mt-6 text-red-400">
          Jobs are not available!
        </h1>
      )}
    </div>
  )
}

export default LatestJobs
