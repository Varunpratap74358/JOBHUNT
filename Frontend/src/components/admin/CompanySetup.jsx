import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { toast } from 'sonner'
import axios from 'axios'
import { COMPANY_API_POINT } from '../utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
  const [input, setInput] = useState({
    name: '',
    discription: '',
    website: '',
    location: '',
    file: null,
    preview: null, // For previewing the image
  })
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const navigate = useNavigate()
  useGetCompanyById(params.id)
  const { singleCompany } = useSelector((store) => store.company)

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setInput({
        ...input,
        file,
        preview: URL.createObjectURL(file), // Generate a preview URL
      })
    }
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
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      toast.success(data.message)
      navigate('/admin/companies')
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || 'Error updating company')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setInput({
      name: singleCompany.name || '',
      discription: singleCompany.discription || '',
      website: singleCompany.website || '',
      location: singleCompany.location || '',
      file: null, // Reset file input
      preview: singleCompany.logo || null, // Use existing logo if available
    })
  }, [singleCompany])

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
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                value={input.name}
                onChange={changeEventHandler}
                name="name"
                required
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                value={input.discription}
                onChange={changeEventHandler}
                name="discription"
                required
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                type="text"
                value={input.website}
                onChange={changeEventHandler}
                name="website"
                required
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                value={input.location}
                onChange={changeEventHandler}
                name="location"
                required
              />
            </div>
            <div>
              <Label>Logo</Label>
              
              {/* Image Preview */}
              {input.preview && (
                <img
                  src={input.preview}
                  alt="Logo Preview"
                  className="mt-2 w-24 h-24 object-cover rounded-lg mb-3 border"
                />
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full mt-8" disabled>
              <Loader2 className="animate-spin" />
              Please wait
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
