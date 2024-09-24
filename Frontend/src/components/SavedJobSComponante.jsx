import React from 'react';
import { useNavigate } from 'react-router-dom';

const SavedJobSComponante = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div className="max-w-sm mx-auto w-[100%] bg-white shadow-md rounded-lg overflow-hidden border transition-transform transform hover:scale-105">
      {/* Top section: Date and Save Icon */}
      <div className="p-4 flex items-center justify-between">
        <span className="text-gray-500 text-sm">
          Saved Date: {item?.createdAt.substring(0, 10)}
        </span>
      </div>

      {/* Company Logo and Info */}
      <div className="flex items-center px-4">
        <img
          src={item?.jobId?.company?.logo}
          alt="Company Logo"
          className="w-12 h-12 rounded-full"
        />
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {item?.jobId?.company?.name}
          </h3>
          <p className="text-gray-500">{item?.jobId?.company?.location}</p>
        </div>
      </div>

      {/* Job Title */}
      <div className="px-4 mt-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {item?.jobId?.title}
        </h2>
      </div>

      {/* Job Details */}
      <div className="px-4 mt-2 flex flex-wrap gap-2">
        <span className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-lg">
          {item?.jobId?.position}
        </span>
        <span className="inline-block bg-red-100 text-red-800 text-sm px-2 py-1 rounded-lg">
          {item?.jobId?.jobType}
        </span>
        <span className="inline-block bg-yellow-100 text-yellow-800 text-sm px-2 py-1 rounded-lg">
          {item?.jobId?.salary} LPA
        </span>
      </div>

      {/* Details Button */}
      <div className="p-4">
        <button
          onClick={() => navigate(`/description/${item.jobId._id}`)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default SavedJobSComponante;
