import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
  const { allAppliedJob } = useSelector((store) => store.job)
  // console.log(allAppliedJob)
  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold ">Date</TableHead>
            <TableHead className="font-bold">Job Role</TableHead>
            <TableHead className="font-bold">Company</TableHead>
            <TableHead className="text-right font-bold">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJob.length <= 0 ? (
            <span className="text-red-500 font-bold text-xl">
              You have't applied any job yet.
            </span>
          ) : (
            allAppliedJob.map((item, i) => (
              <TableRow key={i}>
                <TableCell>{item.createdAt.substring(0, 10)}</TableCell>
                <TableCell>{item?.job?.title}</TableCell>
                <TableCell>{item?.job?.company?.name}</TableCell>
                <TableCell className={`text-right `}>
                  <Badge
                    className={`text-black p-2 hover:bg-transparent hover:border-[1px] hover:border-black ${
                      item?.status === 'pending'
                        ? 'bg-yellow-300'
                        : item?.status === 'accepted'
                        ? 'bg-green-400'
                        : 'bg-red-500'
                    }`}
                  >
                    {item?.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable
