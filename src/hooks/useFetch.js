// import { useState,useEffect } from "react"
// import axios from "axios"

// const useFetch=(endpoint)=>{
//     const[data,setData]=useState([])
//     const [loading, setLoading] = useState(false)

//     const fetchData=async()=>{
//         try {
//             setLoading(true)
    
//             const response=await axios.get(endpoint)
//             setLoading(false)
//             setData(response.data.results)
    
            
//         } catch (error) {
//             console.log("Error",error)
            
//         }
//     }
    
//     useEffect(() => {
//         fetchData()
    
//     }, [endpoint])
    


//     return {data,loading}

// }


// export default useFetch



import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useFetch = (endpoint) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // Added error state

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(endpoint);
            setData(response.data.results);
        } catch (err) {
            setError(err);  // Handle errors by setting error state
            console.log("Error:", err);
        } finally {
            setLoading(false);  // Ensure loading is always turned off after fetch
        }
    }, [endpoint]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);  // Adding fetchData to the dependency array

    return { data, loading, error };  // Returning error as part of the return value
};

export default useFetch;
