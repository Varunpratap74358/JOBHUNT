import React from 'react';
import { Button } from './ui/button';
import { Avatar } from './ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import { Badge } from './ui/badge';
import { Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SAVED_API_POINT } from './utils/constant';
import { toast } from 'sonner';
import useSavedJob from '@/hooks/useSavedJob';
import { useSelector } from 'react-redux';

const Job = ({ item }) => {
  const navigate = useNavigate();
  useSavedJob()


  // console.log(savedJob)
  const dayesAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const savedJobItem = async(id)=>{
    try {
      const {data} = await axios.get(`${SAVED_API_POINT}/savedjob/${id}`,{withCredentials:true})
      toast.success(data.message)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <div className="p-4 md:p-5 rounded-md shadow-xl bg-white border-[1px] border-gray-200 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <p className="text-xs md:text-sm text-gray-500">
          {dayesAgoFunction(item?.createdAt) === 0
            ? 'Today'
            : `${dayesAgoFunction(item?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark onClick={()=>savedJobItem(item?._id)} />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button variant="outline" className="p-3 md:p-6 rounded-full" size="icon">
          <Avatar>
            <AvatarImage src={item?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-bold text-md md:text-lg">{item?.company?.name}</h1>
          <p className="text-xs md:text-sm text-gray-400">{item?.location}</p>
        </div>
      </div>

      <div className="">
        <h1 className="font-bold text-md md:text-lg my-2">{item?.title}</h1>
        <p className="text-sm text-gray-600">{item?.company?.description}</p>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className={'text-blue-700 font-bold'} variant="ghost">
          {item?.position} position
        </Badge>
        <Badge className={'text-red-600 font-bold'} variant="ghost">
          {item?.jobType}
        </Badge>
        <Badge className={'text-yellow-600 font-bold'} variant="ghost">
          {item?.salary} LPA
        </Badge>
      </div>

      <div className="flex flex-col md:flex-row gap-2 mt-4">
        <Button onClick={() => navigate(`/description/${item?._id}`)} variant="outline">
          Details
        </Button>
      </div>
    </div>
  );
};

export default Job;
