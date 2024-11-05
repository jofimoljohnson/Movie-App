import { useRef } from "react";
import Card from "./Card";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const HorizontalCard = ({ data = [], heading, trending, media_type }) => {
    const containerRef = useRef();

    const handleNext = () => {
        containerRef.current.scrollLeft += 300;
    };

    const handlePrev = () => {
        containerRef.current.scrollLeft -= 300;
    };

    return (
        <div>
            <div className="container mx-auto px-3 my-10 ">
                <h2 className="text-xl font-bold lg:text-2xl mb-3 text-white capitalize">{heading}</h2>
                <div className=" relative">
                    <div
                        ref={containerRef}
                        className="grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col  gap-6 overflow-x-scroll 
                        overflow-hidden relative z-10 scroll-smooth transition-all scrollbar-none"
                    >
                        {data.map((data, index) => {
                            return (
                                <Card
                                    key={data.id + "heading" + index}
                                    data={data}
                                    index={index + 1}
                                    trending={trending}
                                    media_type={media_type}
                                />
                            );
                        })}
                    </div>

                    <div className="absolute top-0 flex justify-between w-full  items-center h-full">
                        <button className="bg-white p-1 text-black rounded-full -ml-1 z-10" onClick={handlePrev}>
                            <FaAngleLeft />
                        </button>
                        <button className="bg-white p-1 text-black rounded-full -mr-1 z-10" onClick={handleNext}>
                            <FaAngleRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HorizontalCard;
