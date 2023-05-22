import React, { useState, useEffect } from "react";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from "@material-ui/lab/Pagination";
import { Search } from "@material-ui/icons";


const SearchBar = (searchText, handleChange) => {

    const [searchText, setSearchText] = useState("");

    const handleChange = (e) => { setSearchText(e.target.value); }

    const useStyles = makeStyles(theme => ({
        ul: {
            "& .MuiPaginationItem-page.Mui-selected": {
                color: "#fff",
                backgroundColor: "#3a86bd",
            }
        }
    }));
    const classes = useStyles();

    const themeProps = {
        style: {
            position: "absolute", fontSize: 16, height: 50,
            width: 450, left: 299, top: -73
        },
        startAdornment: (
            <InputAdornment position="start" fontSize="small">
                <SearchIcon style={{ fontSize: 20, color: '#000000' }} />
            </InputAdornment>)
    }

    return (
        <>
            <TextField
                className={classes.input}
                id="standard-basic"
                value={searchText}
                onChange={handleChange}
                type="text"
                variant="outlined"
                onKeyUp={data}
                placeholder="Wyszukaj..."
                InputLabelProps={{ shrink: false }}
                InputProps={themeProps}
            />
        </>
    )
}
export default SearchBar;