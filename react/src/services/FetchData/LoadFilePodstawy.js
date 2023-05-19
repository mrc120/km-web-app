import React, { useState, useEffect } from 'react';
import FilesPodstService from "../../services/Files/files_podst.service"
import { getRequestParams } from "../../views/Showlists/utils/PaginationList"

const LoadFilePodstawy = () => {
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);

    const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(true);
    const params = getRequestParams(searchText, page);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await FilesPodstService.getAll(params)
                setData(response.data);
                console.log("Fetchdata podst: ", response.data)
            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, []);
    return [data]
}
export default LoadFilePodstawy;    