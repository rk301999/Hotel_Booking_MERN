import React from 'react'

const MailList = () => {
    return (
        <div className="mail w-full mt-12 bg-[#003580] text-white flex flex-col items-center gap-2 p-12">
          <h1 className="mailTitle text-3xl font-bold">Save time, save money!</h1>
          <span className="mailDesc text-sm">Sign up and we'll send the best deals to you</span>
          <div className="mailInputContainer">
            <input  className="w-[300px] h-[36px] p-3 border-none mr-2 rounded-sm" type="text" placeholder="Your email" />
            <button className='h-9 bg-[#0071c2] font-bold border-none rounded-sm cursor-pointer px-2'>Subscribe</button>
          </div>
        </div>
      )
}

export default MailList
