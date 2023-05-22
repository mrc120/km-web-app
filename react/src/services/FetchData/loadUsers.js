import React, { useState, useEffect } from 'react';
import axios from "axios";


const LoadUsers = () => {
    const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/auth/users/');
                setData(response.data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    return {
        data,
    }

}
export default LoadUsers;    