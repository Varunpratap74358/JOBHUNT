import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const [query, setQuery] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query))
    navigate('/brows')
  }

  return (
    <div className="text-center bg-gradient-to-r from-blue-50 to-gray-100 py-16 px-6">
      <div className="flex flex-col gap-6 md:gap-8 mt-10 max-w-4xl mx-auto">
        {/* Tagline */}
        <span className="px-6 py-2 rounded-full bg-red-100 text-red-600 font-semibold text-lg">
          No. 1 Job Hunt Website
        </span>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Search, Apply & <br />
          Get Your <span className="text-blue-700">Dream Jobs</span>
        </h1>

        {/* Subheading */}
        <p className="text-gray-600 text-base md:text-lg max-w-xl mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          nostrum est officiis ipsum natus facilis.
        </p>

        {/* Search Bar */}
        <div className="flex items-center w-full md:w-[60%] lg:w-[50%] mx-auto shadow-md border border-gray-200 rounded-full overflow-hidden">
          <input
            type="text"
            placeholder="Find your dream jobs!"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow px-4 py-3 text-base text-gray-800 placeholder-gray-400 focus:outline-none"
          />
          <Button
            onClick={searchJobHandler}
            className="flex items-center justify-center px-5 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
