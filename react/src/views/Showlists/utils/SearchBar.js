import React from "react";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@mui/material/TextField';
import "./style.css"

const SearchBar = ({ keyword, onChange }) => {

    const useStyles = makeStyles({
        ul: {
            "& .MuiPaginationItem-page.Mui-selected": {
                color: "#fff",
                backgroundColor: "#3a86bd",
            }
        }
    });
    const classes = useStyles();

    // const themeProps = {
    //     style: {
    //         position: "absolute", fontSize: 16, height: 50,
    //         width: 450, left: 299, top: -73
    //     },
    //     startAdornment: (
    //         <InputAdornment position="start" fontSize="small">
    //             <SearchIcon style={{ fontSize: 20, color: '#000000' }} />
    //         </InputAdornment>)
    // }

    return (
        <TextField
            className={classes.input}
            id="standard-basic"
            type="text"
            value={keyword}
            onChange={(e) => onChange(e.target.value)}
            variant="outlined"
            placeholder="Wyszukaj..."
            InputLabelProps={{ shrink: false }}
            InputProps={{
                style: { fontSize: 16, height: 50, width: 450, left: 299, position: "absolute", top: -73 },
                startAdornment: (
                    <InputAdornment position="start" fontSize="small">
                        <SearchIcon style={{ fontSize: 20, color: '#000000' }} />
                    </InputAdornment>
                ),
            }}
        />
    )
}
export default SearchBar;