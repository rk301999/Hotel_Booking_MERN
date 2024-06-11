import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import format from "date-fns/format";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.state);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const {data,loading,error,reFetch} = useFetch(`/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`)
  

  console.log(location);
  const handleClick=()=>{
    console.log("clciked");
    reFetch();
  }
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer flex justify-center mt-5">
        <div className="listWrapper w-full max-w-[1024px] flex gap-5 ">
          <div  className={openDate?"listSearch flex-grow-1 bg-[#febb02] p-5 rounded-md sticky text-md max-h-max":"listSearch flex-grow-1 bg-[#febb02] p-5 rounded-md sticky text-md max-h-[430px]"}>
            <h1 className="lsTitle text-[20px] font-bold text-[#555] mb-3">
              Search{" "}
            </h1>
            <div className="lsItem flex flex-col gap-1">
              <label className="text-[12px]">Destination</label>
              <input
                type="text"
                placeholder={destination}
                className=" border-none outline-none p-1 "
                onChange={(e)=>setDestination(e.target.value)}
              />
            </div>
            <div className="lsItem flex flex-col gap-1">
              <label className="text-[12px]">Check-in Date</label>
              <span
                className="  p-1 bg-white cursor-pointer"
                onClick={() => setOpenDate(!openDate)}
              >{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
                date[0].endDate,
                "dd/MM/yyyy"
              )}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
              <label className="text-[12px]">Options</label>
              <div className="lsOptions flex flex-col gap-2">
                <div className="lsOptionItem flex justify-between text-[#555] text-[12px]">
                  <span className="lsOptionText ">
                    Min price <small>per night</small>
                  </span>
                  <input
                  
                    type="number"
                    min={0}
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput w-1/4 p-1 "
                  />
                </div>
                <div className="lsOptionItem flex justify-between text-[#555] text-[12px]">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput w-1/4 p-1"
                  />
                </div>
                <div className="lsOptionItem flex justify-between text-[#555] text-[12px]">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput w-1/4 p-1"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem flex justify-between text-[#555] text-[12px]">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput w-1/4 p-1"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem flex justify-between text-[#555] text-[12px]">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput w-1/4 p-1"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button className="w-full bg-[#003580] text-white mt-3 p-1  font-bold cursor-pointer" onClick={handleClick}>Search</button>
          </div>

          <div className="listResult flex-grow-3">
            {data && data.map((item)=>{
              return <SearchItem item={item} key={item._id} id={item._id}/>
            })}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
