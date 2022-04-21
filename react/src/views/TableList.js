import React, { useState, useEffect } from 'react';
import { forwardRef } from 'react';
import KsiazkaDataService from '../services/KsiazkaService'
import MaterialTable, { MTableToolbar } from "material-table";
import axios from 'axios';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
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
import AuthService from "../services/auth.service.js";

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

const URL = "http://localhost:8080/api/ksiazka/";

function KsiazkaTable() {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    loggedUser();
  }, []);

  const loggedUser = () => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }

  const [entries, setEntries] = useState([])
  const [state] = React.useState({

    columns: [ 

      {
        title: 'Nazwa', field: 'nazwa',
        cellStyle: {
          paddingLeft: '14px',
          maxWidth: 150,
        },
        headerStyle: { paddingLeft: "14px" }
      },
      {
        title: 'Stanowisko', field: 'stanowisko.nazwa_stan',
        headerStyle: { paddingLeft: 0 },
        cellStyle: {
          paddingLeft: 0,
          maxWidth: 160,
        }
      },
      {
        title: 'Adres e-mail', field: 'adres_email', type: 'string',
        cellStyle: {
          
          maxWidth: 160,
          whiteSpace: "normal",
          wordWrap: "break-word",
          overflow: 'wrap',
          paddingLeft: '0px'
        }, headerStyle: {
          whiteSpace: "normal",
          wordWrap: "break-word",
          paddingLeft: '0px'
        },
      },
      {
        title: 'Numer kom.', field: 'numer_tel', type: 'string',
        cellStyle: {
          minWidth: 110,
          paddingLeft: '0px'
        }, headerStyle: { paddingLeft: "0px" }
      },
      {
        title: 'Numer stacj.', field: 'numer_stacj',
        cellStyle: {
          maxWidth: 150,
          paddingLeft: "0px"
        }, headerStyle: { paddingLeft: "0px", }
      },
      {
        title: 'Dział', field: 'dzial.nazwa_dzialu',
        cellStyle: {
          maxWidth: 150,
          paddingLeft: '0px'
        }, headerStyle: { paddingLeft: '0px' },
      },
      {
        title: 'Sym.', field: 'dzial.symbol',
        cellStyle: {
          paddingLeft: '15px',
          maxWidth: '100px'
  
        }, headerStyle: { paddingLeft: '0px', paddingRight: "0px", minWidth: '250px',
                maxWidth: '250px'  },
      },
      {
        title: 'Numer pokoju', field: 'numer_pokoju',
        headerStyle: { paddingLeft: "0px" }, cellStyle: { paddingLeft: "5px"}
      },]
  
      
  });

  useEffect(() => {
    axios.get(URL).then(response => {
      let data = response.data
      setEntries({ data: data });
    }).catch(function (error) {
      console.log(error);
    });
  }, []);

  var customStyle = {
    width: "450px",
    height: "50px",
    left: "300px",
    marginTop: "-95px",
  };

  const theme = createMuiTheme({
    overrides: {
      MuiTableCell: {
        root: {
          padding: 12,
        }
      }
    },
  });

  return (
    <div className="main-ov">
      <MuiThemeProvider theme={theme}>
        <MaterialTable
          title={null}
          columns={state.columns}
          data={entries.data}
          icons={tableIcons}
          components={{
            Toolbar: props => (
              <div style={{
                position: "absolute",
              
              }}>
                <MTableToolbar {...props} />
              </div>)
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
            body: {
              editTooltip: "Edytuj",
              deleteTooltip: "Usuń",
              editRow: {
                deleteText: "Jesteś pewny, że chcesz usunąć tą pozycję?",
                cancelTooltip: "Anuluj", saveTooltip: "Zapisz"
              },
            },
            header: {
              actions: "Akcje"
            }
          }}
          options={{
            rowStyle: {
              padding: 5,
              fontSize: 15,
            },
            headerStyle: {
              padding: 12,
            },
            searchFieldAlignment: "left",
            searchFieldVariant: "outlined",
            // doubleHorizontalScroll: true,
            pageSize: 30,
            pageSizeOptions: [10, 20, 30, 40, 50],
            searchFieldStyle: customStyle,
          }}
          editable={showAdminBoard && {
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                { showAdminBoard }
                setTimeout(() => {
                  resolve();
                  const data = [...entries.data];
                  data[data.indexOf(oldData)] = newData;
                  axios.put(URL + newData.id, newData, {
                  }).then((res) => console.log(res.data));
                  setEntries({ ...entries, data });
                }, 600);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                { showAdminBoard }
                setTimeout(() => {
                  resolve();
                  const data = [...entries.data];
                  data.splice(data.indexOf(oldData), 1);
                  axios.delete(URL + oldData.id, {
                  }).then(res => console.log(res.data));
                  setEntries({ ...entries, data });
                }, 600);
              })
          }}
        />

      </MuiThemeProvider>
    </div>
  );
}

export default KsiazkaTable;

