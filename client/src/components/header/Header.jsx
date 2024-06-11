import React, { useContext } from "react";
import { FaBed, FaPerson } from "react-icons/fa6";
import { FaPlane, FaCar, FaTaxi } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import {useNavigate} from "react-router-dom"
import { AuthContext,SearchContext } from "../../App";

function Header({ type }) {
  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [openRoom, setOpenRoom] = useState(false);
  const [destination,setDestination] = useState("");
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOption = (option, fn) => {
    if (fn === "i") {
      setOptions((prev) => {
        return {
          ...prev,
          [option]: options[option] + 1,
        };
      });
    } else {
      setOptions((prev) => {
        return {
          ...prev,
          [option]: options[option] - 1,
        };
      });
    }
  };
  const navigate = useNavigate();
  const {auth,setAuth} = useContext(AuthContext)
  const {stateContext,setStateContext} = useContext(SearchContext)
  // console.log(stateContext);

  const handleSearch =()=>{
    const UPDATED_STATE = {
      city:destination,
      dates:state,
      options:options,
    }
    setStateContext(UPDATED_STATE);
    navigate("/hotels",{state:{destination,state,options}})
  }

  return (
    <div className="Header flex justify-center bg-[#003580] text-white relative">
      <div
        className={
          type !== "list"
            ? "headerContainer w-full max-w-[1024px] mt-5 mb-28"
            : "w-full max-w-[1024px] mt-5 mb-6"
        }
      >
        <div className="headerList flex gap-10">
          <div className="headerListItems flex items-center gap-2 active:border-[1px] border-white border-solid p-[10px] rounded-2xl">
            <FaBed />
            <span>Stays</span>
          </div>
          <div className="headerListItems flex items-center gap-2 active:border-[1px] border-white border-solid p-[10px] rounded-2xl">
            <FaPlane />
            <span>Flights</span>
          </div>
          <div className="headerListItems flex items-center gap-2 active:border-[1px] border-white border-solid p-[10px] rounded-2xl">
            <FaCar />
            <span>Car rentals</span>
          </div>
          <div className="headerListItems flex items-center gap-2 active:border-[1px] border-white border-solid p-[10px] rounded-2xl">
            <FaBed />
            <span>Attractions</span>
          </div>
          <div className="headerListItems flex items-center gap-2 active:border-[1px] border-white border-solid p-[10px] rounded-2xl">
            <FaTaxi />
            <span>Airport taxis</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            {!auth.user ? <h1 className="headerTitle font-bold text-[55px] mt-12">
              A lifetime of discounts ? It's Genius
            </h1> :<h1 className="headerTitle font-bold text-[70px] mt-12">
            Where to next, {auth.user.username}?
            </h1>}
            <p className="headerDesc my-5">
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free Booking account
            </p>
            {!auth.user &&<button className="headerBtn bg-[#0071c2] border-none p-[10px]">
              Sign in / Register
            </button>}
            <div className="headerSearch h-[50px] bg-white flex text-white items-center border-[3px] border-yellow-200 justify-between  absolute bottom-[-25px]  w-full max-w-[1024px] px-4">
              <div className="headerSearchItem flex items-center gap-2 ">
                <FaBed className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput outline-none border-none text-black"
                  onChange={(e)=>setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem flex  items-center gap-2 cursor-pointer">
                <SlCalender className="text-gray-400" />
                <span
                  className="headerSearchText text-gray-400"
                  onClick={() => setOpenDate(!openDate)}
                >
                  {
                     `${format(state[0].startDate, "dd/MM/yyyy")} to ${format(
                        state[0].endDate,
                        "dd/MM/yyyy"
                      )}`
                    }
                </span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setState([item.selection])}
                    moveRangeOnFirstSelection={false}
                    minDate={new Date()}
                    ranges={state}
                    className="date absolute top-[50px] z-20"
                  />
                )}
              </div>
              <div className="headerSearchItem flex  items-center gap-2 cursor-pointer">
                <FaPerson className="text-gray-400" />
                <span
                  className="headerSearchText text-gray-400"
                  onClick={() => setOpenRoom(!openRoom)}
                >
                  {` ${options.adult} adult . ${options.children} children . ${options.room} room`}
                </span>
                {openRoom && (
                  <div className="options absolute top-[50px] right-[80px] text-gray-400 rounded-sm shadow-xl z-20 bg-white">
                    <div className="optionItems w-52 flex justify-between m-3">
                      <span>Adult</span>
                      <div className="flex items-center justify-between gap-4 ">
                        <button
                          className="border-[1px] w-7 h-7 border-[#0071c2] cursor-pointer"
                          onClick={() => handleOption("adult", "d")}
                          disabled={options.adult <= 1}
                        >
                          -
                        </button>
                        <span className="w-5 text-center">{options.adult}</span>
                        <button
                          className="border-[1px] w-7 h-7 border-[#0071c2] cursor-pointer"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItems w-52 flex justify-between m-3">
                      <span>Children</span>
                      <div className="flex items-center justify-between gap-4 ">
                        <button
                          className="border-[1px] w-7 h-7 border-[#0071c2] cursor-pointer"
                          onClick={() => handleOption("children", "d")}
                          disabled={options.children <= 0}
                        >
                          -
                        </button>
                        <span className="w-5 text-center">
                          {options.children}
                        </span>
                        <button
                          className="border-[1px] w-7 h-7 border-[#0071c2] cursor-pointer"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItems w-52 flex justify-between m-3">
                      <span>Room</span>
                      <div className="flex items-center justify-between gap-4 ">
                        <button
                          className="border-[1px] w-7 h-7 border-[#0071c2] cursor-pointer"
                          onClick={() => handleOption("room", "d")}
                          disabled={options.room <= 1}
                        >
                          -
                        </button>
                        <span className="w-5 text-center">{options.room}</span>
                        <button
                          className="border-[1px] w-7 h-7 border-[#0071c2] cursor-pointer"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem flex  items-center gap-2">
                <button className="bg-[#003580] py-1.5 px-1.5" onClick={handleSearch}>Search</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
