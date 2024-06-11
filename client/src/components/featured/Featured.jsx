import React from "react";
import  {useFetch}  from "../../hooks/useFetch";

const Featured = () => {

  const {data,loading,error} = useFetch("hotels/countByCity?cities=madrid,berlin,london")
  
  
  return (
    <div>
      {loading ? "data loading in progress ...":<div className="featured w-full max-w-[1024px] flex justify-between gap-5 z-10">
        <div className="featuredItem relative rounded-lg overflow-hidden h-64 text-white">
          <img
            src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
            alt=""
            className="featuredImg object-cover w-full"
          />
          <div className="featuredTitles absolute  bottom-[10px] left-[10px]">
            <h1 className="font-bold text-3xl  ">Madrid</h1>
            <h2 className="text-2xl font-semibold"> {data[0]} properties</h2>
          </div>
        </div>

        <div className="featuredItem featuredItem relative rounded-lg overflow-hidden h-64 text-white">
          <img
            src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
            alt=""
            className="featuredImg object-cover w-full"
          />
          <div className="featuredTitles absolute  bottom-[10px] left-[10px]">
            <h1 className="font-bold text-3xl  ">Berlin</h1>
            <h2 className="text-2xl font-semibold">{data[1]} properties</h2>
          </div>
        </div>
        <div className="featuredItem featuredItem relative rounded-lg overflow-hidden h-64 text-white">
          <img
            src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
            alt=""
            className="featuredImg object-cover w-full"
          />
          <div className="featuredTitles absolute  bottom-[10px] left-[10px]">
            <h1 className="font-bold text-3xl  ">London</h1>
            <h2 className="text-2xl font-semibold">{data[2]} properties</h2>
          </div>
        </div>
      </div>}
    </div>
  );
};

export default Featured;
