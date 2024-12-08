import React, { useEffect, useState } from 'react'
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
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job)
  const [filterJobs, setfilterJobs] = useState(allAdminJobs)
  const navigate = useNavigate()



  useEffect(() => {
    const filteredJobs =
      allAdminJobs?.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) {
          return true
        }
        return (
          job?.title.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            .toLowerCase()
            .includes(searchJobByText.toLowerCase())
        )
      })
    setfilterJobs(filteredJobs)
  }, [allAdminJobs, searchJobByText])

  return (
    <div className='p-4'>
      <Table>
        <TableCaption>A list of your resent jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((v, i) => {
            return (
              <tr key={i}>
                <TableCell>{v?.company?.name}</TableCell>
                <TableCell>{v?.title}</TableCell>
                <TableCell>{v?.createdAt.substring(0, 10)}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-40 flex flex-col gap-2">
                      <Link
                        // onClick={() => confirmEdit(v._id)}
                        to={`/admin/edit/${v._id}`}
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span className="font-semibold border py-1 px-4 rounded-md shadow-md shadow-slate-200">Edit</span>
                      </Link>
                      <div
                        onClick={() => navigate(`/admin/jobs/${v._id}/applicants`)}
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Eye className="w-4" />
                        <span className="font-semibold border py-1 px-4 rounded-md shadow-md shadow-slate-200">Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default AdminJobsTable
