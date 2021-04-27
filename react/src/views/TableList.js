import React, { useState, useEffect } from 'react';

import TutorialDataService from "../services/KsiazkaService"
import { fade, makeStyles } from '@material-ui/core/styles';

import { forwardRef } from 'react';
import MaterialTable, { MTableToolbar } from "material-table";
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
import { FixedScaleAxis } from 'chartist';
import { Hidden } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

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
        minWidth: 20,
        maxWidth: 450,
      },
      headerStyle: {
        minWidth: 20,
        maxWidth: 450,
      }

    },

    {
      title: 'Nazwa', field: 'imie',
      cellStyle: {
        paddingLeft: '0px',
        width: 220,
        minWidth: 220
      },


      headerStyle: {
        width: 220,
        minWidth: 220,
        paddingLeft: "0px"
      }
    },

    {
      title: 'Stanowisko', field: 'blank',
paddingLeft: 10

    },
    {
      title: 'Adres e-mail', field: 'adres_email', type: 'string',
      cellStyle: {
        width: 150,
        maxWidth: 270,
        whiteSpace: "normal",
        wordWrap: "break-word",
        overflow: 'wrap',
        paddingLeft: '5px'
      },
      headerStyle: {
        width: 130,
        whiteSpace: "normal",
        wordWrap: "break-word",

        maxWidth: 220,
        paddingLeft: '0px'
      },
    },
    {
      title: 'Numer kom.', field: 'numer_tel', type: 'string',
      cellStyle: {
        width: 340,
        minWidth: 140
      },
      headerStyle: {
        width: 320,
        maxWidth: 360
      }
    },
    {
      title: 'Numer stacj.', field: 'numer_stacj',
      cellStyle: {
        width: 320,
        minWidth: 120
      },
      headerStyle: {
        width: 340,
        maxWidth: 350
      }
    },
    {
      title: 'Numer pokoju', field: 'numer_pokoju',
    },

    {
      title: 'Dział', field: 'nazwa_dzialu',
      cellStyle: {
        width: 120,
        minWidth: 250,
        paddingRight: '30px'
      },
      headerStyle: {
        paddingLeft: '0px'
      },
    },
    {
      title: 'Symbol', field: 'symbol_dzialu',
      cellStyle: {
        width: 50,
        minWidth: 40
      },
    },]


  var customStyle = {
    width: "850px",
    position: "relative"

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
        components={{
          Toolbar: props => (
            <div id="toolbartab" style={{
              display: "flex",
              overflow: "Hidden",
              justifyContent: "center",
            }}>
              <MTableToolbar {...props} />
            </div>
          )
        }}
        localization={{
          toolbar: {
            searchPlaceholder: 'Wyszukaj...',
            searchTooltip: 'Szukaj'
          },
          pagination: {
            labelDisplayedRows: '{from}-{to} z {count}',
            labelRowsSelect: 'pozycji'
          },
        }}

        options={{
          rowStyle: {
            fontSize: 15,
            padding: 2
          },
          cellStyle: {
            padding: 8,
          },
          searchFieldAlignment: "left",
          searchFieldVariant: "outlined",
          borderColor: "green",
          pageSize: 30,
          pageSizeOptions: [10, 20, 30, 40, 50],
          searchFieldStyle: customStyle,
        }}
      />
    </div>
  );
}
export default KsiazkaTable;

