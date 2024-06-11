import React, { useContext, useState } from 'react'
import { FaCircleXmark } from "react-icons/fa6";
import useFetch from '../../hooks/useFetch';
import { SearchContext } from '../../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Reserve = ({ setOpen, hotelId }) => {
    // console.log(hotelId);
    const [selectedRooms,setSelectedRooms] = useState([]);
    const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
    console.log(data);
    const {stateContext,setStateContext} = useContext(SearchContext)
    const {dates} = stateContext;

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        const date = new Date(start.getTime());
    
        const dates = [];
    
        while (date <= end) {
          dates.push(new Date(date).getTime());
          date.setDate(date.getDate() + 1);
        }
    
        return dates;
      };

      const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(
          checked
            ? [...selectedRooms, value]
            : selectedRooms.filter((item) => item !== value)
        );
      };
    
      const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
          alldates.includes(new Date(date).getTime())
        );
    
        return !isFound;
      };

      const navigate = useNavigate();

      const handleClick = async () => {
        try {
          await Promise.all(
            selectedRooms.map((roomId) => {
              const res = axios.put(`/rooms/availability/${roomId}`, {
                dates: alldates,
              });
              return res.data;
            })
          );
          setOpen(false);
          navigate("/");
        } catch (err) {}
      };

  return (
    <div className="reserve w-full h-[100vh] bg-[#000000b6] fixed top-0 left-0 flex items-center justify-center z-50">
    <div className="rContainer bg-white p-[20px] relative">
      <FaCircleXmark onClick={()=>setOpen(false) } className='absolute top-3 right-3 cursor-pointer'/>
      <span>Select your rooms:</span>
      {data.map((item) => (
        <div className="rItem flex items-center gap-12 p-[20px] justify-between" key={item._id}>
          <div className="rItemInfo flex flex-col gap-1">
            <div className="rTitle font-semibold">{item.title}</div>
            <div className="rDesc font-normal">{item.desc}</div>
            <div className="rMax text-[12px]">
              Max people: <b>{item.maxPeople}</b>
            </div>
            <div className="rPrice font-semibold">{item.price}</div>
          </div>
          <div className="rSelectRooms flex flex-wrap gap-1 text-[8px] text-gray-500">
            {item.roomNumbers.map((roomNumber) => (
              <div className="room flex flex-col">
                <label>{roomNumber.number}</label>
                <input
                  type="checkbox"
                  value={roomNumber._id}
                  onChange={handleSelect}
                  disabled={!isAvailable(roomNumber)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={handleClick} className="rButton border-none px-2 py-1 bg-[#0071c2] text-white font-bold cursor-pointer rounded-sm w-full mt-5">
        Reserve Now!
      </button>
    </div>
  </div>
  )
}

export default Reserve
