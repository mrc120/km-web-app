import React, { useState, useEffect } from 'react';
import MaterialTable, { MTableToolbar } from "material-table";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import style from "./style"
import KsiazkaService from "../../services/ksiazka.service.js"

import { localization, tableIcons } from "./localization"


import AuthService from "../../services/Auth/auth.service";
import loggedUser from "../../utils/LoggedUser"


const columns = [
  {
    title: 'Nazwa', field: 'nazwa',
    cellStyle: { paddingLeft: '14px', maxWidth: 150, },
    headerStyle: { paddingLeft: "14px" }
  },
  {
    title: 'Stanowisko', field: 'stanowisko.nazwa_stan',
    headerStyle: { paddingLeft: 0 },
    cellStyle: { maxWidth: 160 }
  },
  {
    title: 'Adres e-mail', field: 'adres_email', type: 'string',
    cellStyle: {
      maxWidth: 160,
      whiteSpace: "normal",
      wordWrap: "break-word",
    }, headerStyle: {
      whiteSpace: "normal",
      wordWrap: "break-word",
    },
  },
  {
    title: 'Numer kom.', field: 'numer_tel', type: 'string',
    cellStyle: { minWidth: 110, paddingLeft: '0px' },
    headerStyle: { paddingLeft: "0px" }
  },
  {
    title: 'Numer stacj.', field: 'numer_stacj',
    cellStyle: {
      maxWidth: 150,
    }
  },
  {
    title: 'Dział', field: 'dzial.nazwa_dzialu',
    cellStyle: {
      maxWidth: 150,
    }
  },
  {
    title: 'Sym.', field: 'dzial.symbol',
    cellStyle: {
      paddingLeft: '15px',
      maxWidth: '100px'
    }, headerStyle: { minWidth: '250px', maxWidth: '250px' },
  },
  {
    title: 'Numer pokoju', field: 'numer_pokoju',
    cellStyle: { paddingLeft: "5px" }
  },]

function KsiazkaTable() {
  //wydziel

  //   const [showAdminBoard, setShowAdminBoard] = useState(false);
  //   const [showAddUserBoard, setAddUserBoard] = useState(false);
 
  //  //WYDZIEL
  //  const loggedUser = () => {
  //   const user = AuthService.getCurrentUser();
  //   if (user) {
  //     setCurrentUser(user);
  //     setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
  //     setAddUserBoard(user.roles.includes("ROLE_ADD_USER"));
  //   }
  // }

  const [entries, setEntries] = useState([])
  const [data] = React.useState({ columns })

  useEffect(() => {
    KsiazkaService.getAll()
      .then(response => {
        let data = response.data
        setEntries({ data: data });
      }).catch(function (error) {
        console.log(error);
      });
  }, []);


  return (
    <div className="main-ov">
      <MuiThemeProvider theme={style.tableRowPadding}>
<loggedUser/>
        <MaterialTable
          columns={data.columns}
          data={entries.data}
          icons={tableIcons}
          // doubleHorizontalScroll={false}
          title={""}
          components={style.toolbarPlacement}
          options={style.tableStyle}
          localization={localization}
          editable={
            {
              onRowUpdate: (newData, oldData) =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    const data = [...entries.data];
                    data[data.indexOf(oldData)] = newData;
                    KsiazkaService.update(newData.id, newData, {
                    }).then((res) => console.log(res.data));
                    setEntries({ ...entries, data });
                  }, 600);
                }),
              onRowDelete: oldData =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    const data = [...entries.data];
                    data.splice(data.indexOf(oldData), 1);
                    KsiazkaService.remove(+oldData.id, {
                    }).then(res => console.log(res.data));
                    setEntries({ ...entries, data });
                  }, 600);
                })
            }
          }
        />

      </MuiThemeProvider>
    </div>
  );
}

export default KsiazkaTable;

