import React, {useState} from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { ThemeProvider } from '@mui/material/styles';
import { useStyles, theme } from "../style"

export const getRequestParams = (searchTitle, page, pageSize) => {
  let params = {};
  if (searchTitle) {
    params["title"] = searchTitle;
  }
  if (page) {
    params["page"] = page - 1;
  }
  if (pageSize) {
    params["size"] = pageSize;
  }
  return params;
};

function PaginationList() {

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

    //strona 

    const handlePageChange = (e, value) => {
      setPage(value);
    }

  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Pagination
        classes={{ ul: classes.ul }}
        className="my-3 d-flex justify-content-center"
        count={count}
        page={page}
        color="primary"
        variant="outlined"
        shape="rounded"
        siblingCount={1}
        boundaryCount={1}
        onChange={handlePageChange}/>
    </ThemeProvider>
  );
  return { count, page }
};
export default PaginationList;