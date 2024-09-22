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
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Compniestable = () => {
  const { compinies, searchCompanyByText } = useSelector((store) => store.company)
  const [filterCompany,setFilterCompany] = useState(compinies)
  const navigate = useNavigate()
  useEffect(()=>{
    const filteredCompany = compinies.length >= 0 && compinies.filter((company)=>{
      if(!searchCompanyByText){
        return true
      } return company?.name.toLowerCase().includes(searchCompanyByText.toLowerCase())
    })
    setFilterCompany(filteredCompany)
  },[compinies,searchCompanyByText])

  return (
    <div>
      <Table>
        <TableCaption>A list of your resent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany.length < 0 ? (
            <span className="text-2xl text-red-500 relative left-[30%] top-4">
              You have't any company! please add companies{' '}
            </span>
          ) : (
            filterCompany?.map((v, i) => {
              return (
                <tr key={i}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={v?.logo} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{v?.name}</TableCell>
                  <TableCell>{v?.createdAt.substring(0, 10)}</TableCell>
                  <TableCell className="text-right cursor-pointer">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        <div onClick={()=>navigate(`/admin/companies/${v._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                          <Edit2 className="w-4" />
                          <span className="font-semibold">Edit</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </tr>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default Compniestable
