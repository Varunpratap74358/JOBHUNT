import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ item }) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/description/${item?._id}`)}
      className="p-5 rounded-lg shadow-lg bg-white border border-gray-100 cursor-pointer hover:shadow-2xl transition-shadow duration-300 ease-in-out"
    >
      <div>
        <h1 className="font-semibold text-lg md:text-xl">{item?.company?.name}</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div>
        <h1 className="font-bold text-lg md:text-xl my-2">{item?.title}</h1>
        <p className="text-sm text-gray-600">{item?.company?.description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {item?.position} position
        </Badge>
        <Badge className="text-red-600 font-bold" variant="ghost">
          {item?.jobType}
        </Badge>
        <Badge className="text-yellow-600 font-bold" variant="ghost">
          {item?.salary} LPA
        </Badge>
      </div>
    </div>
  )
}

export default LatestJobCards
