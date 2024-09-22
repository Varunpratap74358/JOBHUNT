import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from './shared/Navbar';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import useGetApplyedJob from '@/hooks/useGetApplyedJob';
import { Navigate } from 'react-router-dom';

const isResume = true;

const Profile = () => {
  useGetApplyedJob();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  // console.log(user)
  if(!user){
    return <Navigate to={'/'} />
  }
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="flex items-center gap-4">
            <Avatar className="cursor-pointer h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto} />
              <AvatarFallback>
                <img
                  src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
                  alt=""
                />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} variant="outline" className="text-right mt-4 md:mt-0">
            <Pen />
          </Button>
        </div>

        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div>
          <h1 className="font-semibold">Skills</h1>
          <div className="flex flex-wrap items-center gap-1">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, i) => <Badge key={i}>{item}</Badge>)
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">{user?.profile?.resumeOrignalName}</Label>
          {user?.profile?.resume ? (
            <a
              href={user?.profile?.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Resume
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl mb-5">
        <h1 className="text-center text-2xl font-bold underline my-3 text-lime-600">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
