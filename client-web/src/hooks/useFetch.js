import {useEffect, useState} from 'react'

function useFetch(url){
    const [instruments, setInstruments] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");

    useEffect(() => {
        fetchItems()
    }, []);

    async function fetchItems() {
        setLoading(true);
        try {
            const response = await fetch(url)
            if(!response.ok) throw new Error("something went wrong!")
            const items = await response.json()
            setInstruments(items)
        } catch(error){
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    return {instruments, loading, error}
}


export default useFetch