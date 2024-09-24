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
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

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
    <div>
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
                    <PopoverContent className="w-32">
                      <div
                        onClick={() => navigate(`/admin/edit/${v._id}`)}
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span className="font-semibold">Edit</span>
                      </div>
                      <div
                        onClick={() => navigate(`/admin/jobs/${v._id}/applicants`)}
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Eye className="w-4" />
                        <span className="font-semibold">Applicants</span>
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
