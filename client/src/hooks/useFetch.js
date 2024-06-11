import { useEffect, useState } from "react"
import axios from "axios"

axios.defaults.baseURL = "https://hotel-booking-mern-qvza.onrender.com/api/";
export const useFetch = (url) =>{
    const [data,setData] =useState([])
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(false)

    useEffect(()=>{
        const fetchData = async()=>{
            setLoading(true)
            try {
                const res =await axios.get(url)
                setData(res.data)
            } catch (error) {
                setError(error)
            }
            setLoading(false)
        }
        fetchData()
    },[])

    const reFetch = async()=>{
        setLoading(true);
        try {
            const res = await axios.get(url);
            setData(res.data);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    }
    return {data,loading,error,reFetch}
}

export default useFetch
