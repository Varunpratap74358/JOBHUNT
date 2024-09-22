import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const category = [
  'Frontend Doveloper',
  'Backend Doveloper',
  'Data Science',
  'Machine Learning',
  'Full Stack',
  'Java Doveloper',
  'Python Doveloper',
  'Graphic Designer',
  'VFX Editer',
]

const CategoryCarousel = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const searchJobHandler=(query)=>{
    dispatch(setSearchedQuery(query))
    navigate("/brows")
  }
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-10">
        <CarouselContent>
          {category.map((item, i) => {
            return <CarouselItem key={i} className="md:basis-1/2 lg-basis-1/3">
                <Button onClick={()=>searchJobHandler(item)} className="rounded-full " variant="outline">{item}</Button>
            </CarouselItem>
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default CategoryCarousel
