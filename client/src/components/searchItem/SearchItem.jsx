import React from 'react'
import { Link } from 'react-router-dom'

const SearchItem = ({item,key,id}) => {
  return (
    <div className='searchItem border-[1px] border-gray-300 flex justify-between gap-5 mb-5 p-3'>
      <img src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg" alt="" className='w-52 h-52 object-cover' />
      <div className="siDesc flex flex-col gap-2 flex-grow-2">
        <h1 className="siTitle text-3xl font-bold text-[#0071c2]">{item.name}</h1>
        <span className="siDistance text-[12px]">{item.distance} from center</span>
        <span className="siTaxiOp text-[12px bg-[#008009] px-1 rounded-sm text-white max-w-max">Free airport taxi</span>
        <span className="siSubtitle text-[12px] font-semibold">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures text-[12px]">{item.desc}</span>
        <span className="siCancelOp text-[12px] text-[#008009] font-semibold">Free cancellation </span>
        <span className="siCancelOpSubtitle text-[12px] text-[#008009] ">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails flex-grow-1 flex flex-col justify-between">
        {item.rating &&<div className="siRating flex justify-between">
          <span className='font-semibold'>Excellent</span>
          <button className='bg-[#003580] text-white px-1 font-bold border-none'>{item.rating}</button>
        </div>}
        <div className="siDetailTexts text-right flex flex-col gap-1">
          <span className="siPrice text-[24px] ">${item.cheapestPrice}</span>
          <span className="siTaxOp text-[12px] text-gray-600">Includes taxes and fees</span>
          
          <Link to={`/hotels/${id}`}>
          <button className="siCheckButton bg-[#0071c2] text-white font-bold px-2 py-1 border-none cursor-pointer rounded-sm">See availability</button>
          </Link>
          
        </div>
      </div>
      
    </div>
  )
}

export default SearchItem
