import { useParams } from "react-router-dom";
import useFetchDetails from "../hooks/useFetchDetail";
import { useSelector } from "react-redux";
import Divider from "../components/Divider";
import moment from "moment";
import useFetch from "../hooks/useFetch";
import { useState } from "react";
import HorizontalCard from "../components/HorizontalCard";
import VideoPlay from "../components/VideoPlay";

const DetailsPage = () => {
    const params = useParams();
    const imageURL = useSelector((state) => state.movieData.imageURL);
    console.log("Params", params);
    const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`);
    // console.log("data", data);
    const { data: castData } = useFetchDetails(`/${params?.explore}/${params?.id}/credits`);
    // console.log("star cast", castData);

    const { data: similarData } = useFetch(`/${params?.explore}/${params?.id}/similar`);
    const { data: recommendationData } = useFetch(`/${params?.explore}/${params?.id}/recommendations`);
    const [playVideo, setPlayVideo] = useState(false);
    const [playVideoId, setPlayVideoId] = useState("");

    const handlePlayVideo = (data) => {
        setPlayVideoId(data);
        setPlayVideo(true);
    };

    const duration = (data?.runtime / 60)?.toFixed(1)?.split(".");
    const writer = castData?.crew
        ?.filter((el) => el?.job === "Writer")
        ?.map((el) => el?.name)
        ?.join(" ,");

    return (
        <>
            <div className="w-full h-[280px] relative hidden lg:block">
                <div className="w-full h-full">
                    <img src={imageURL + data?.backdrop_path} alt="" className="w-full h-full object-cover" />
                </div>

                <div
                    className="absolute bg-gradient-to-t from-neutral-900/90 
      to-transparent w-full h-full top-0"
                ></div>
            </div>

            <div className="container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row  gap-5 lg:gap-10">
                <div className="relative mx-auto lg:-mt-28 lg:mx-0  w-fit min-w-60">
                    <img src={imageURL + data?.poster_path} alt="" className="w-60 h-80 object-cover rounded " />
                    <button
                        onClick={() => handlePlayVideo(data)}
                        className="mt-3 w-full py-2 px-4 text-center bg-white text-black rounded 
                        font-bold text-lg hover:bg-gradient-to-1 from-red-600
               to-orange-500 hover:scale-105 transition-all"
                    >
                        Play Now
                    </button>
                </div>

                <div>
                    <h2 className="text-2xl lg:text-4xl text-white font-bold ">{data?.title || data?.name}</h2>
                    <p className="text-neutral-400">{data?.tagline}</p>
                    <Divider />

                    <div className="flex items-center  gap-3">
                        <p>Rating: {Number(data?.vote_average).toFixed(1)}+</p>
                        <span>|</span>

                        <p>View:{Number(data?.vote_count)}</p>
                        <span>|</span>

                        <p>
                            Duration:{duration[0]}h {duration[1]}m
                        </p>
                    </div>
                    <Divider />

                    <div>
                        <h3 className="text-xl font-bold text-white mb-1">OverView</h3>
                        <Divider />

                        <p>{data?.overview}</p>
                        <div className="flex items-center gap-3 my-3 text-center">
                            <p>Status:{data?.status}</p>
                            <span>|</span>
                            <p>Release Date:{moment(data?.release_date).format("MMMM Do YYYY")}</p>
                            <span>|</span>

                            <p>Revenue:{Number(data?.revenue)}</p>
                        </div>
                        <Divider />
                    </div>
                    <div>
                        {/* <p><span className="text-white">Director</span>:{castData?.crew[0]?.name}</p> */}
                        {/* <Divider/> */}

                        <p>
                            <span className="text-white">Writer:{writer}</span>
                        </p>
                    </div>
                    <Divider />
                    <h2 className="font-bold text-lg">Cast:</h2>
                    <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-5 my-4">
                        {castData?.cast
                            ?.filter((el) => el?.profile_path)
                            .map((starCast, index) => {
                                return (
                                    <div>
                                        <div>
                                            <img
                                                src={imageURL + starCast?.profile_path}
                                                className="w-24 h-24 object-cover rounded-full"
                                                alt=""
                                            />
                                        </div>
                                        <p className="font-bold text-center text-sm text-neutral-400">{starCast?.name}</p>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>

            <div>
                <HorizontalCard data={similarData} heading={"Similar " + params?.explore} media_type={params?.explore} />
                <HorizontalCard
                    data={recommendationData}
                    heading={"Recommendation " + params?.explore}
                    media_type={params?.explore}
                />
            </div>
            {playVideo &&(
                <VideoPlay data={playVideoId} close={() => setPlayVideo(false)} media_type={params?.explore} />
            ) }
        </>
    );
};

export default DetailsPage;
