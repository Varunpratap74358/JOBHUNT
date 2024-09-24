import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { APPLICATION_API_POINT } from '../utils/constant'

const array = [`accepted`, 'rejected']
const ApplicantasTable = () => {
  const { applicants } = useSelector((store) => store.application)
  //   console.log(applicants)
  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true
      const {
        data,
      } = await axios.post(`${APPLICATION_API_POINT}/status/${id}/update`, {
        status,
      })
      toast.success(data?.message)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <div>
      <Table>
        <TableCaption>A list of your resent applyed users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applications.map((item) => (
              <tr key={item?._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-500 cursor-pointer"
                      target="_blank"
                      href={item?.applicant?.profile?.resume}
                    >
                      {item?.applicant?.profile?.resumeOrignalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>
                  {item?.applicant?.createdAt.substring(0, 10)}
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent>
                      {array.map((status, i) => {
                        return (
                          <div
                            onClick={() => statusHandler(status, item?._id)}
                            key={i}
                            
                          >
                            <span className="cursor-pointer">{status}</span>
                          </div>
                        )
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ApplicantasTable
