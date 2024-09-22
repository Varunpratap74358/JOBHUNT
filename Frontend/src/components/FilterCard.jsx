import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filetrData = [
  {
    filterType: 'Location',
    array: ['Delhi NCR', 'Bangalor', 'Hyderabad', 'Pune', 'Mumbai'],
  },
  {
    filterType: 'Industry',
    array: [
      'Frontend Doveloper',
      'Backend Doveloper',
      'Full stack Doveloper',
      'Java Doveloper',
      'App Dovelopment',
    ],
  },
  // {
  //   filterType: 'Salary',
  //   array: ['0-40k', '42-1lakh', '1lakh-5lakh', '5lakh-8lakh', '8lakh-12lakh'],
  // },
]

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('')
  const dispatch = useDispatch()

  const handelChange = (value) => {
    setSelectedValue(value)
  }

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue))
  }, [selectedValue])

  return (
    <div className="w-full bg-white p3 rounded-md">
      <h1 className="font-bold text-xl">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={handelChange}>
        {filetrData.map((data, i) => {
          return (
            <div key={i}>
              <h1 className="font-bold text-lg">{data.filterType}</h1>
              {data.array.map((v, index) => {
                const itemId = `id${i - index}`
                return (
                  <div key={index} className="flex items-center space-x-2 my-2">
                    <RadioGroupItem value={v} id={itemId} />
                    <Label >{v}</Label>
                  </div>
                )
              })}
            </div>
          )
        })}
      </RadioGroup>
    </div>
  )
}

export default FilterCard
