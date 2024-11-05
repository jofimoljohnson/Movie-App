step-1
------
* create component card.jsx

*Home.jsx
---------
import { useSelector } from 'react-redux'
import BannerHome from '../components/BannerHome'
import Card from '../components/Card'
const Home = () => {
  const trendingData=useSelector((state) => state.movieData.bannerData);
  return (
    <div>
      <BannerHome/>
      <div className='container mx-auto px-3 my-10 '>
        <h2 className='text-xl font-bold lg:text-2xl mb-2'>Trending Show</h2>

<div className='grid grid-cols-[repeat(auto-fit,230px)] gap-4'>
  
        {
          trendingData.map((data)=>{
            return(
              <Card key={data.id} data={data}/>
            )
          })
        }
</div>

      </div>
     
    </div>
  )
}

export default Home



step-2
-------
Card.jsx
---------