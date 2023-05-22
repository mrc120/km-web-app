export const useStyles = makeStyles(theme => ({
    ul: {
      "& .MuiPaginationItem-page.Mui-selected": {
        color: "#fff",
        backgroundColor: "#3a86bd",
      }
    }
  }));
export const classes = useStyles();