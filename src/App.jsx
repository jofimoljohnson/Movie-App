// import { Outlet } from "react-router-dom";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import MobileNavigation from "./components/MobileNavigation";
// import axios from "axios";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { setBannerData, setImageURL } from "./store/movieSlice";

// const App = () => {
//     const dispatch = useDispatch();
//     const fetchTrendingData = async () => {
//         try {
//             const response = await axios.get("/trending/all/week");
//             dispatch(setBannerData(response.data.results));
//             // console.log("Response", response.data.results);
//         } catch (error) {
//             console.log("Error", error);
//         }
//     };

//     const fetchConfiguration = async () => {
//         try {
//             const response = await axios.get("/configuration");
//             dispatch(setImageURL(response.data.images.secure_base_url+"original"))
//             // console.log("configuration data", response.data.images.secure_base_url+"original");
//         } catch (error) {
//             console.log("Error", error);
//         }
//     };

//     useEffect(() => {
//         fetchTrendingData();
//         fetchConfiguration();
//     }, []);

//     return (
//         <div>
//             <main className="pb-14 lg:pb-0">
//                 <Header />
//                 <div className="min-h-[90vh]">
//                     <Outlet />
//                 </div>
//                 <Footer />
//                 <MobileNavigation />
//             </main>
//         </div>
//     );
// };

// export default App;



import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileNavigation from "./components/MobileNavigation";
import axios from "axios";
import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setBannerData, setImageURL } from "./store/movieSlice";

const App = () => {
    const dispatch = useDispatch();

    const fetchTrendingData = useCallback(async () => {
        try {
            const response = await axios.get("/trending/all/week");
            dispatch(setBannerData(response.data.results));
        } catch (error) {
            console.log("Error", error);
        }
    }, [dispatch]);

    const fetchConfiguration = useCallback(async () => {
        try {
            const response = await axios.get("/configuration");
            dispatch(setImageURL(response.data.images.secure_base_url + "original"));
        } catch (error) {
            console.log("Error", error);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchTrendingData();
        fetchConfiguration();
    }, [fetchTrendingData, fetchConfiguration]);

    return (
        <div>
            <main className="pb-14 lg:pb-0">
                <Header />
                <div className="min-h-[90vh]">
                    <Outlet />
                </div>
                <Footer />
                <MobileNavigation />
            </main>
        </div>
    );
};

export default App;
