import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { COMPANY_API_POINT } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
  const navigate = useNavigate()
  const [companyName, setCompanyName] = useState('')
    const dispatch = useDispatch()

  const createNewCompany = async () => {
    try {
      const { data } = await axios.post(
        `${COMPANY_API_POINT}/register`,
        { companyName },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      toast.success(data.message)
      dispatch(setSingleCompany(data.company))
      navigate(`/admin/companies/${data.company._id}`)
       
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message)
    }
  }
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500">
            What whould you like to give your company name? you can change this
            later
          </p>
        </div>

        <Label>Company Name</Label>
        <Input
          type="text"
          className="my-2"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Jobhunt, microsoft, google....."
        />
        <div className="flex items-center gap-2 my-10">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/companies')}
          >
            Cancle
          </Button>
          <Button onClick={createNewCompany}>Contineu</Button>
        </div>
      </div>
    </div>
  )
}

export default CompanyCreate
