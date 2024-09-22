import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2, LoaderPinwheel } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { toast } from 'sonner'
import axios from 'axios'
import { COMPANY_API_POINT } from '../utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
  const [input, setinput] = useState({
    name: '',
    discription: '',
    website: '',
    location: '',
    file: null,
  })
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const navigate = useNavigate()
  useGetCompanyById(params.id)
  const {singleCompany} = useSelector(store=>store.company)
  const chnageEventhandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0]
    setinput({ ...input, file })
  }

  const updateSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', input.name)
    formData.append('discription', input.discription)
    formData.append('website', input.website)
    formData.append('location', input.location)
    if (input.file) {
      formData.append('file', input.file)
    }
    try {
      setLoading(true)
      const { data } = await axios.put(
        `${COMPANY_API_POINT}/update/${params.id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multiparat/form-data',
          },
        },
      )
      toast.success(data.message)
      navigate('/admin/companies')
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setinput({
      name: singleCompany.name || '',
      discription:singleCompany.discription ||'',
      website: singleCompany.website || '',
      location:singleCompany.location || '',
      file:singleCompany.logo || null,
    })
  },[singleCompany])
  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={updateSubmit}>
          <div className="flex items-center gap-5 p-8">
            <Button
              onClick={() => navigate('/admin/companies')}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bols text-xl">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                value={input.name}
                onChange={chnageEventhandler}
                name="name"
              />
            </div>
            <div>
              <Label>Discription</Label>
              <Input
                type="text"
                value={input.discription}
                onChange={chnageEventhandler}
                name="discription"
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                type="text"
                value={input.website}
                onChange={chnageEventhandler}
                name="website"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                value={input.location}
                onChange={chnageEventhandler}
                name="location"
              />
            </div>
            <div>
              <Label>Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full mt-8">
              <Loader2 />
              please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full mt-8">
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  )
}

export default CompanySetup
