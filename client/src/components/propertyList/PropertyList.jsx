import React from "react";
import useFetch from "../../hooks/useFetch";

const PropertyList = () => {
  const { data, loading, error } = useFetch("hotels/countByType");
  const images = [
    "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
  ];
  return (
    <div className="pList flex w-full max-w-[1024px] justify-between gap-5 text-white">
      {loading ? (
        "data loading in Progress ... "
      ) : (
        <>
          {/* <div className="plistItem   rounded-md overflow-hidden cursor-pointer flex-1">
        <img src="https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=" alt="" className='w-full h-36 object-cover'/>
        <div className="plistTitles ">
            <h1 className="text-[18px] font-bold text-black">Hotels</h1>
            <h1 className='font-semibold text-gray-500'>{data[0].count} hotels</h1>
        </div>
      </div>
      <div className="plistItem  rounded-md overflow-hidden cursor-pointer flex-1">
        <img src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg" alt="" className='w-full h-36 object-cover' />
        <div className="plistTitles ">
            <h1 className="text-[18px] font-bold text-black">Apartments</h1>
            <h1 className='font-semibold text-gray-500'>233 hotels</h1>
        </div>
      </div>
      <div className="plistItem  rounded-md overflow-hidden cursor-pointer flex-1">
        <img src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg" alt="" className='w-full h-36 object-cover' />
        <div className="plistTitles ">
            <h1 className="text-[18px] font-bold text-black">Resorts</h1>
            <h1 className='font-semibold text-gray-500'>233 hotels</h1>
        </div>
      </div>
      <div className="plistItem  rounded-md overflow-hidden cursor-pointer flex-1">
        <img src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg" alt="" className='w-full h-36 object-cover'/>
        <div className="plistTitles  ">
            <h1 className="text-[18px] font-bold text-black">Villas</h1>
            <h1 className='font-semibold text-gray-500'>233 hotels</h1>
        </div>
      </div> */}
          {data &&
            images.map((image, index) => {
              return <div
                className="plistItem  rounded-md overflow-hidden cursor-pointer flex-1"
                key={index}
              >
                <img src={image} alt="" className="w-full h-36 object-cover" />
                <div className="plistTitles ">
                  <h1 className="text-[18px] font-bold text-black capitalize">
                    {data[index]?.type}
                  </h1>
                  <h1 className="font-semibold text-gray-500 ">
                    {data[index]?.count}{" "}
                    {data[index]?.type}
                  </h1>
                  {"inside"}
                </div>
              </div>;
            })}
        </>
      )}
    </div>
  );
};

export default PropertyList;
