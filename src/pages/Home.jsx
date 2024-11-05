import { useSelector } from "react-redux";
import BannerHome from "../components/BannerHome";
import HorizontalCard from "../components/HorizontalCard";
import useFetch from "../hooks/useFetch";
const Home = () => {
    const trendingData = useSelector((state) => state.movieData.bannerData);
const {data:nowPlayingData}=useFetch('/movie/now_playing')
const {data:topRatedData}=useFetch('/movie/top_rated')
const {data:upComingData}=useFetch('/movie/upcoming')
const {data:popularData}=useFetch('/tv/popular')
const {data:onTheAirShowData}=useFetch('/tv/on_the_air')










    return (
        <div>
            <BannerHome />
            <HorizontalCard data={trendingData} heading={"Trending"} trending={true}/>
            <HorizontalCard data={nowPlayingData} heading={'Now Playing'} media_type={'movie'}/>
            <HorizontalCard data={topRatedData} heading={'Top Rated Movies'} media_type={'movie'}/>
            <HorizontalCard data={upComingData} heading={'UpComing Movies'} media_type={'movie'}/>
            <HorizontalCard data={popularData} heading={'Popular Tv Show'} media_type={'tv'}/>
            <HorizontalCard data={onTheAirShowData} heading={'On The Air'} media_type={'tv'}/>



          
        </div>
    );
};

export default Home;
