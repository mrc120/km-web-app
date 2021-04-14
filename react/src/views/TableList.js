import React, { useState, useEffect } from 'react';

import TutorialDataService from "../services/KsiazkaService"
import { fade, makeStyles } from '@material-ui/core/styles';

import { forwardRef } from 'react';
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { useTheme } from "@material-ui/core/styles"
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

function KsiazkaTable() {
  const [data, setData] = useState([]);
  const theme = useTheme();

  var columns = [
    {
      title: 'Lp.', field: 'id',
      cellStyle: {
        width: 120,
        minWidth: 0
      },
    },
    {
      title: 'Nazwa', field: 'imie',
      cellStyle: {
        width: 220,
        minWidth: 220,
        paddingLeft: "2px"
      },
      headerStyle: {
        width: 220,
        minWidth: 220,
        paddingLeft: "2px"
      },
    },
    {
      title: 'Adres e-mail', field: 'adres_email', type: 'string',
      cellStyle: {
        width: 120,
        minWidth: 10,
        paddingRight: "0px"
      },
      headerStyle: {
        width: 120,
        minWidth: 10
      },
    },
    {
      title: 'Numer tel. kom.', field: 'numer_tel', type: 'string',
      cellStyle: {
        paddingLeft: "20px",
        width: 220,
        minWidth: 130

      }
    },
    {
      title: 'Numer tel. stacj.', field: 'numer_stacj',
      cellStyle: {
        width: 220,
        minWidth: 130
      },

    },
    {
      title: 'Dział', field: 'nazwa_dzialu',
      cellStyle: {
        width: 120,
        minWidth: 220
      },
    },

    {
      title: 'Numer pokoju', field: 'numer_pokoju',

    }]


  var customStyle = {

    width: "350%",
    // title: 'szukaj',
    label: "gowno",
    height: 50,
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'realtive',
    searchFieldAlignment: 'left',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    // alignItems: 'center',
    float: 'center',
    textAlign: 'center',
    // justifyContent: 'center',
    // position: 'realtive'

  };

  const retrieveKsiazka = () => {
    TutorialDataService.getAll()
      .then(response => {
        setData(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => {
    retrieveKsiazka();
  }, [])

  return (
    <div className="table-container">
      <MaterialTable
        title={null}
        columns={columns}
        data={data}
        icons={tableIcons}
        localization={{
          toolbar: { 
          searchPlaceholder: 'Wyszukaj...' },
          pagination: {
            labelDisplayedRows: '{from}-{to} z {count}',
            labelRowsSelect: 'pozycji'
         
          },
        }}


        options={{
          searchFieldAlignment: "left",
          searchFieldVariant: "outlined",

          pageSize: 20,
          searchFieldStyle: customStyle,


        }}
      />
    </div>


  );
}
export default KsiazkaTable;

