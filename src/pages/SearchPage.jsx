
// import { useLocation, useNavigate } from "react-router-dom"
// import { useState,useEffect } from "react"
// import axios from "axios"
// import Card from '../components/Card'

// const SearchPage = () => {
//   const location=useLocation()
//   console.log("Location",location.search.slice(3))

//   const [data, setData] = useState([])
//   const [page,setPage]=useState(1)
//   const navigate=useNavigate()

//   const query=location?.search?.slice(3)

//   const fetchData = async () => {
//     try {
//         const response = await axios.get(`/search/multi`, {
//             params: {
//               query:location?.search?.slice(3),
//                 pages: page,
//             },
//         });
//         setData((prev) => {
//             return [...prev, 
//               ...response.data.results];
//         });
//     } catch (error) {
//         console.log("Error", error);
//     }
// };


// useEffect(() => {
// if(query){
//   setPage(1)
//   setData([])
//   fetchData()
// }
  
// }, [location?.search])

// const handleScroll=()=>{
//   if((window.innerHeight+window.scrollY) >=document.body.offsetHeight){
//     setPage(prev=>prev+1)
//   }
// }


// useEffect(() => {
//   if(query){
//     fetchData()
//   }
  
// }, [page])


// useEffect(() => {
//   window.addEventListener('scroll',handleScroll)

// }, [])



//   return (
//     <div className="py-16">
//       <div className="lg:hidden my-2 mx-1 sticky top-[70px] z-30">
//         <input type="text" placeholder="Search Here" 
//         value={query?.split("%20")?.join(" ")}
//         onChange={(e)=>navigate(`/search?q=${e.target.value}`)}
//         className="px-4 py-1 text-lg w-full bg-white 
//         rounded-full text-neutral-900"
//         />
      
        
//       </div>

//       <div className="container mx-auto">
//       <h3 className="capitalize text-lg lg:text-xl font-semibold my-3 ">Search Results</h3>
//       <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
//                     {data.map((searchData, index) => {
//                         return <Card data={searchData} key={searchData.id + "search"} 
//                         media_type={searchData.media_type} />;
//                     })}
//                 </div>
  
  
//       </div>
//     </div>
//   )
// }

// export default SearchPage




import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Card from "../components/Card";

const SearchPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);  // Loading state to manage fetching

    const query = new URLSearchParams(location.search).get("q");  // Better way to handle query parameter

    // Fetch data based on the query and page number
    const fetchData = useCallback(async () => {
        if (!query) return; // Prevent fetch if no query
        setLoading(true);
        try {
            const response = await axios.get(`/search/multi`, {
                params: {
                    query: query,
                    page: page,  // Correct param name is `page`, not `pages`
                },
            });
            setData((prev) => [...prev, ...response.data.results]);
        } catch (error) {
            console.log("Error", error);
        } finally {
            setLoading(false);
        }
    }, [query, page]);

    // Handle scroll event to load more results
    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
            if (page < 10 && !loading) {  // Check if there's more data to load
                setPage((prev) => prev + 1);
            }
        }
    };

    // Fetch data when query or page changes
    useEffect(() => {
        if (query) {
            setPage(1);
            setData([]);
            fetchData();  // Trigger fetch on query change
        }
    }, [query, fetchData]);

    // Fetch data when page changes
    useEffect(() => {
        fetchData();  // Trigger fetch on page change
    }, [page, fetchData]);

    // Add event listener for scroll and cleanup
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);  // Clean up the event listener
        };
    }, []);

    return (
        <div className="py-16">
            <div className="lg:hidden my-2 mx-1 sticky top-[70px] z-30">
                <input
                    type="text"
                    placeholder="Search Here"
                    value={query || ""}
                    onChange={(e) => navigate(`/search?q=${e.target.value}`)}  // Navigate with updated query
                    className="px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900"
                />
            </div>

            <div className="container mx-auto">
                <h3 className="capitalize text-lg lg:text-xl font-semibold my-3">Search Results</h3>
                <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
                    {data.map((searchData) => (
                        <Card
                            data={searchData}
                            key={searchData.id + "search"}
                            media_type={searchData.media_type}
                        />
                    ))}
                </div>
                {loading && <div className="text-center py-4">Loading...</div>} {/* Loading indicator */}
            </div>
        </div>
    );
};

export default SearchPage;
