// import { useState,useEffect } from "react"
// import axios from "axios"

// const useFetchDetails=(endpoint)=>{
//     const[data,setData]=useState([])
//     const [loading, setLoading] = useState(false)

//     const fetchData=async()=>{
//         try {
//             setLoading(true)
    
//             const response=await axios.get(endpoint)
//             setLoading(false)
//             setData(response.data)
    
            
//         } catch (error) {
//             console.log("Error",error)
            
//         }
//     }
    
//     useEffect(() => {
//         fetchData()
    
//     }, [endpoint])
    


//     return {data,loading}

// }


// export default useFetchDetails




import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useFetchDetails = (endpoint) => {
    const [data, setData] = useState(null); // Initializing as null for better control over data state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // Adding error state

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(endpoint);
            setData(response.data);
        } catch (err) {
            setError(err); // Set error state in case of failure
            console.log("Error:", err);
        } finally {
            setLoading(false); // Always turn off loading after request completes
        }
    }, [endpoint]);

    useEffect(() => {
        fetchData();
    }, [fetchData]); // Adding fetchData to the dependency array

    return { data, loading, error }; // Returning error along with data and loading states
};

export default useFetchDetails;
