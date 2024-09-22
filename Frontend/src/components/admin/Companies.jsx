import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Compniestable from './Compniestable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
  const navigate = useNavigate()
  useGetAllCompanies()
  const dispatch = useDispatch()
  const [input, setInput] = useState('')

  useEffect(()=>{
    dispatch(setSearchCompanyByText(input))
  },[input])
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-10 ">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit "
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="filter by name"
          />
          <Button onClick={() => navigate('/admin/companies/create')}>
            New Company
          </Button>
        </div>
        <Compniestable />
      </div>
    </div>
  )
}

export default Companies
