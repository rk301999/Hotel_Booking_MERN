import React, { useState,useContext } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { IoLocation } from "react-icons/io5";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { SearchContext,AuthContext} from "../../App";
import Reserve from "../../components/reserve/Reserve";

const Hotel = () => {
  const location = useLocation();
 
  const id = (location.pathname.split("/")[2]);
  const {data,loading,error} = useFetch(`/hotels/find/${id}`)

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const photos = [
    {
      src: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      src: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      src: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      src: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      src: "https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      src: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ];
  const {stateContext,setStateContext} = useContext(SearchContext)
  const {dates,options} = stateContext;
  const {auth,setAuth} = useContext(AuthContext);
  
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(!open);
  };
  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    console.log("auth user",auth.data);
    if (auth.user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer flex flex-col items-center mt-20px">
        {open && (
          <div className="slider sticky top-0 left-0 w-full h-[100vh] bg-[#0000009f] z-50 flex items-center">
            <FaCircleXmark onClick={() => setOpen(!open)}className="absolute top-[20px] right-[20px] text-2xl text-red-400 cursor-pointer"/>
            <FaArrowCircleLeft onClick={() => handleMove("l")} className="text-3xl m-4 text-gray-800 cursor-pointer"/>
            <div className="sliderWrapper w-full h-full flex justify-center items-center">
              <img
                src={photos[slideNumber].src}
                alt=""
                className="sliderImg w-[70%] h-[70vh] "
              />
          </div>
            <FaArrowCircleRight onClick={() => handleMove("l")} className="text-3xl m-4 text-gray-800 cursor-pointer"/>
          </div>
        )}
        <div className="hotelWrapper w-full max-w-[1024px] flex flex-col gap-2 relative z-10">
          <button className="bookNow absolute right-[0px] top-5 bg-[#0071c2] px-3 py-2 font-bold rounded-sm text-white" onClick={handleClick}>
            Reserve or book now{" "}
          </button>
          <h1 className="hotelTitle text-[24px]">{data.name}</h1>
          <div className="hotelAddress flex items-center gap-2">
            <IoLocation />
            <span>{data.address}</span>
          </div>
          <span className="hotelDistance text-[#0071c2]">
            Excellent location –{data.distance}  from center
          </span>
          <span className="hotelPriceHighlight text-[#008009] font-semibold">
            Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
          </span>
          <div className="hotelImages flex flex-wrap justify-between ">
            {photos.map((photo, index) => (
              <div className="hotelImgWrapper w-[33%]">
                <img
                  onClick={() => handleOpen(index)}
                  src={photo.src}
                  alt=""
                  className="hotelImg w-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails flex justify-between gap-5 mt-5">
            <div className="hotelDetailsText w-2/3">
              <h1 className="hotelTitle">Stay in the heart of {data.city}</h1>
              <p className="hotelDesc text-[14px] mt-5">
                Located a 5-minute walk from St. Florian's Gate in {data.city},
                Tower Street Apartments has accommodations with air conditioning
                and free WiFi. The units come with hardwood floors and feature a
                fully equipped kitchenette with a microwave, a flat-screen TV,
                and a private bathroom with shower and a hairdryer. A fridge is
                also offered, as well as an electric tea pot and a coffee
                machine. Popular points of interest near the apartment include
                Cloth Hall, Main Market Square and Town Hall Tower. The nearest
                airport is Kempegowda International Airport, 16.1 km from Tower
                Street Apartments, and the property offers a paid airport
                shuttle service.
              </p>
            </div>
            <div className="hotelDetailsPrice w-1/3 bg-[#ebf3ff] flex flex-col gap-5 p-5">
              <h1 className="text-[18px] text-[#555]">
                Perfect for a 9-night stay!
              </h1>
              <span className="text-[14px]">
                Located in the real heart of {data.city}, this property has an
                excellent location score of 9.8!
              </span>
              <h2 className="font-semibold">
                <b>${days * data.cheapestPrice * options.room}</b> ({days}{" "}nights)
              </h2>
              <button onClick={handleClick} className="border-none bg-[#0071c2] text-white font-bold rounded-sm cursor-pointer p-1">
                Reserve or Book Now!
              </button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
      
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
    </div>
  );
};

export default Hotel;
