import React from "react";
import useFetch from "../../hooks/useFetch";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");
  // console.log("featured wala ",data);
  return (
    <div className="fp w-full max-w-[1024px] flex justify-between gap-5">
      {loading ? (
        "please wait till content is loaded"
      ) : (
        <>
          {/* <div className="fpItem flex-1 gap-2 flex flex-col">
            <img
              src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg"
              alt=""
            />
            <span className="fpName font-bold">Star Hotel</span>
            <span className="fpCity font-light">Madrid</span>
            <span className="fpPrice font-semibold">Starting from $120</span>
            <div className="fpRating">
              <button className="bg-[#003580] text-white border-none p-[3px] mr-2 font-bold rounded-sm px-1">
                8.9
              </button>
              <span className="font-semibold">Excellent</span>
            </div>
          </div>
          <div className="fpItem flex-1 gap-2 flex flex-col">
            <img
              src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg"
              alt=""
            />
            <span className="fpName font-bold">Star Hotel</span>
            <span className="fpCity font-light"> Madrid</span>
            <span className="fpPrice font-semibold">Starting from $120</span>
            <div className="fpRating">
              <button className="bg-[#003580] text-white border-none p-[3px] mr-2 font-bold rounded-sm px-1">
                8.9
              </button>
              <span className="font-semibold">Excellent</span>
            </div>
          </div>
          <div className="fpItem flex-1 gap-2 flex flex-col">
            <img
              src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg"
              alt=""
            />
            <span className="fpName font-bold">Star Hotel</span>
            <span className="fpCity font-light">Madrid</span>
            <span className="fpPrice font-semibold">Starting from $120</span>
            <div className="fpRating">
              <button className="bg-[#003580] text-white border-none p-[3px] mr-2 font-bold rounded-sm px-1">
                8.9
              </button>
              <span className="font-semibold">Excellent</span>
            </div>
          </div> */}
          {data && data.map((item,index)=>{
            return<div className="fpItem flex-1 gap-2 flex flex-col" key={item._id}>
            <img
              src={item.photos[0]}
              alt=""
            />
            <span className="fpName font-bold">{item.name}</span>
            <span className="fpCity font-light">{item.city}</span>
            <span className="fpPrice font-semibold">Starting from ${item.cheapestPrice}</span>
            {item.rating && <div className="fpRating">
              <button className="bg-[#003580] text-white border-none p-[3px] mr-2 font-bold rounded-sm px-1">
                {item.rating}
              </button>
              <span className="font-semibold">Excellent</span>
            </div>}
          </div>
          }) }
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
