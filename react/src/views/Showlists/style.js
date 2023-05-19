import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';


 export const theme = createTheme({
  palette: {
    primary: {
      main: '#fffff',
    },
  },
});

 export const useStyles = makeStyles(theme => ({
  ul: {
    "& .MuiPaginationItem-page.Mui-selected": {
      color: "#fff",
      backgroundColor: "#3a86bd",
    }
  }
}));
