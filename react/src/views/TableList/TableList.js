import React, { useState, useEffect } from 'react';
import MaterialTable from "material-table";

import { MuiThemeProvider } from "@material-ui/core/styles";
import style from "./style"
import KsiazkaService from "../../services/ksiazka.service.js"

import { localization, tableIcons } from "./localization"
import {columns} from "./columns"


function KsiazkaTable() {

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

