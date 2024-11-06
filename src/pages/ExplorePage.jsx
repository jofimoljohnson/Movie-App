// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import Card from "../components/Card";

// const ExplorePage = () => {
//     const params = useParams();
//     const [pageNumber, setPageNumber] = useState(1);
//     const [data, setData] = useState([]);
//     const [totalPageNumber, setTotalPageNumber] = useState(0);
//     console.log("params", params.explore);

//     const fetchData = async () => {
//         try {
//             const response = await axios.get(`/discover/${params.explore}`, {
//                 params: {
//                     pages: pageNumber,
//                 },
//             });
//             setData((prev) => {
//                 return [...prev, ...response.data.results];
//             });
//             setTotalPageNumber(response.data.total_pages);
//         } catch (error) {
//             console.log("Error", error);
//         }
//     };

//     const handleScroll = () => {
//         if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
//             setPageNumber((prev) => prev + 1);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, [pageNumber]);

//     useEffect(() => {
//         setPageNumber(1);
//         setData([]);
//         fetchData();
//     }, [params.explore]);

//     useEffect(() => {
//         window.addEventListener("scroll", handleScroll);
//     }, []);

//     return (
//         <div className="py-16">
//             <div className="container mx-auto">
//                 <h3 className="capitalize text-lg lg:text-xl font-semibold my-3 ">Popular {params.explore} Show</h3>
//                 <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
//                     {data.map((exploreData, index) => {
//                         return (
//                             <Card data={exploreData} key={exploreData.id + "exploreSection"} media_type={params.explore} />
//                         );
//                     })}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ExplorePage;




import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Card from "../components/Card";

const ExplorePage = () => {
    const params = useParams();
    const [pageNumber, setPageNumber] = useState(1);
    const [data, setData] = useState([]);
    const [totalPageNumber, setTotalPageNumber] = useState(0);
    const [loading, setLoading] = useState(false); // Added loading state for fetch

    // Fetch data for current page and category
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/discover/${params.explore}`, {
                params: {
                    page: pageNumber, // Changed from "pages" to "page" (should match API params)
                },
            });
            setData((prev) => [...prev, ...response.data.results]);
            setTotalPageNumber(response.data.total_pages);
        } catch (error) {
            console.log("Error", error);
        } finally {
            setLoading(false);
        }
    }, [params.explore, pageNumber]);

    // Handle infinite scroll
    const handleScroll = () => {
        if (
            !loading && // Avoid triggering fetch if already loading
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 // Trigger slightly before reaching bottom
        ) {
            if (pageNumber < totalPageNumber) {
                setPageNumber((prev) => prev + 1);
            }
        }
    };

    // Fetch data when pageNumber changes
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Reset data when category changes
    useEffect(() => {
        setPageNumber(1);
        setData([]);
        fetchData(); // Fetch immediately after category change
    }, [params.explore, fetchData]);

    // Add and clean up scroll event listener
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    return (
        <div className="py-16">
            <div className="container mx-auto">
                <h3 className="capitalize text-lg lg:text-xl font-semibold my-3">
                    Popular {params.explore} Show
                </h3>
                <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
                    {data.map((exploreData) => (
                        <Card
                            data={exploreData}
                            key={exploreData.id + "exploreSection"}
                            media_type={params.explore}
                        />
                    ))}
                </div>
                {loading && <div className="text-center py-4">Loading...</div>} {/* Loading indicator */}
            </div>
        </div>
    );
};

export default ExplorePage;
