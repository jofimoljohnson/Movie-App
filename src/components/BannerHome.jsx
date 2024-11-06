// import { useSelector } from "react-redux";
// import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
// import { useState,useEffect } from "react";

// const BannerHome = () => {
//     const bannerData = useSelector((state) => state.movieData.bannerData);
//     console.log("Banner Data", bannerData);
//     const imageURL = useSelector((state) => state.movieData.imageURL);
//     const [currentImage,setCurrentImage]=useState(0)

//     const handleNext=()=>{
//         if(currentImage<bannerData.length-1){
//             setCurrentImage(prev=>prev+1)
//         }

//     }

//     const handlePrev=()=>{
//         if(currentImage>0){
//             setCurrentImage(prev=>prev-1)
//         }

//     }


//     useEffect(() => {
//         const interval=setInterval(()=>{

//             if(currentImage<bannerData.length-1){
//                 handleNext()
//             }else{
//                 setCurrentImage(0)
//             }

//         },3000)
//         return ()=>clearInterval(interval)
     
//     }, [bannerData,imageURL,currentImage])
    



//     return (
//         <section className="w-full h-full">
//             <div className="flex min-h-full max-h-[95vh] overflow-hidden" >
//                 {bannerData.map((data, index) => {
//                     return (
//                         <div 
//                         key={data.id+"bannerHome"+index}
//                         className="min-w-full min-h-[450px] lg:min-h-full 
//                         overflow-hidden relative group transition-all "
//                          style={{transform:`translateX(-${currentImage*100}%)`}}>


//                             <div className="w-full h-full">
//                                 <img src={imageURL + data.backdrop_path} alt="" className="h-full object-cover w-full" />
//                             </div>

//                             {/* button next and previous images */}
//                             <div className="absolute top-0 w-full h-full items-center justify-between px-4 group-hover:lg:flex">
//                                 <button className="bg-white z-10 p-1 rounded-full text-xl text-black " onClick={handleNext} >
//                                     <FaAngleLeft />
//                                 </button>
//                                 <button className="bg-white z-10 p-1 rounded-full text-xl text-black" onClick={handlePrev}>
//                                     <FaAngleRight />
//                                 </button>
//                             </div>

//                             <div
//                                 className="absolute top-0 w-full h-full bg-gradient-to-t
//                                  from-neutral-900 to-transparent"
//                             ></div>
//                             <div className="container mx-auto">
//                                 <div className=" absolute bottom-0 max-w-md px-3">
//                                     <h2 className="font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl">
//                                         {data.title || data?.name}
//                                     </h2>
//                                     <p className="text-ellipsis line-clamp-3 my-2">{data.overview}</p>
//                                     <div className="flex items-center gap-4">
//                                         <p>Rating:{Number(data.vote_average).toFixed(1)}</p>
//                                         <span>|</span>
//                                         <p>View:{Number(data.popularity).toFixed(0)}</p>
//                                     </div>
//                                     <button
//                                         className=" px-4 text-black py-2 rounded mt-4 font-bold hover:bg-gradient-to-l
//                                      from-red-700 to-orange-500 shadow-md transition-all hover:scale-105 bg-white"
//                                     >
//                                         Play Now
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//         </section>
//     );
// };

// export default BannerHome;




import { useSelector } from "react-redux";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useState, useEffect, useCallback } from "react";

const BannerHome = () => {
    const bannerData = useSelector((state) => state.movieData.bannerData);
    const imageURL = useSelector((state) => state.movieData.imageURL);
    const [currentImage, setCurrentImage] = useState(0);

    const handleNext = useCallback(() => {
        if (currentImage < bannerData.length - 1) {
            setCurrentImage((prev) => prev + 1);
        }
    }, [currentImage, bannerData.length]);

    const handlePrev = () => {
        if (currentImage > 0) {
            setCurrentImage((prev) => prev - 1);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentImage < bannerData.length - 1) {
                handleNext();
            } else {
                setCurrentImage(0);
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [bannerData, imageURL, currentImage, handleNext]);

    return (
        <section className="w-full h-full">
            <div className="flex min-h-full max-h-[95vh] overflow-hidden">
                {bannerData.map((data, index) => (
                    <div
                        key={data.id + "bannerHome" + index}
                        className="min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all"
                        style={{ transform: `translateX(-${currentImage * 100}%)` }}
                    >
                        <div className="w-full h-full">
                            <img
                                src={imageURL + data.backdrop_path}
                                alt=""
                                className="h-full object-cover w-full"
                            />
                        </div>

                        {/* Next and previous buttons */}
                        <div className="absolute top-0 w-full h-full items-center justify-between px-4 group-hover:lg:flex">
                            <button
                                className="bg-white z-10 p-1 rounded-full text-xl text-black"
                                onClick={handleNext}
                            >
                                <FaAngleLeft />
                            </button>
                            <button
                                className="bg-white z-10 p-1 rounded-full text-xl text-black"
                                onClick={handlePrev}
                            >
                                <FaAngleRight />
                            </button>
                        </div>

                        <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>
                        <div className="container mx-auto">
                            <div className="absolute bottom-0 max-w-md px-3">
                                <h2 className="font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl">
                                    {data.title || data.name}
                                </h2>
                                <p className="text-ellipsis line-clamp-3 my-2">{data.overview}</p>
                                <div className="flex items-center gap-4">
                                    <p>Rating: {Number(data.vote_average).toFixed(1)}</p>
                                    <span>|</span>
                                    <p>View: {Number(data.popularity).toFixed(0)}</p>
                                </div>
                                <button className="px-4 text-black py-2 rounded mt-4 font-bold hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-105 bg-white">
                                    Play Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BannerHome;
