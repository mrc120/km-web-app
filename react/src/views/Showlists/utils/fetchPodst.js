import React, { useState, useEffect } from 'react';
import axios from "axios";

const fetchPodst = () => {
    const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/files_podst/');
                setData(response.data);
                console.log("files:" , data)
            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, []);
    return { data }
}
export default fetchPodst;    