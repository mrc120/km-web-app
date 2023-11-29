import React, { useState, useEffect } from 'react';
import MaterialTable from "material-table";
import { MuiThemeProvider } from "@material-ui/core/styles";
import style from "./style"
import KsiazkaService from "../../services/ksiazka.service.js"
import { localization, tableIcons } from "./localization"
import { columns } from "./columns"

function KsiazkaTable() {
  const [entries, setEntries] = useState([])
  const [getStan, setStan] = useState({ data: [] })
  const [selectedRowIndex, setSelectedRowIndex] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await KsiazkaService.getAll();
        const data = response.data;
        setEntries({ data: data });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [])

  return (
    <div className="main-ov">
      <MuiThemeProvider theme={style.tableRowPadding}>
        <MaterialTable
          columns={columns}
          data={entries.data}
          icons={tableIcons}
          localization={localization}
          title={""}
          components={style.toolbarPlacement}
          options={style.tableStyle}
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
                    KsiazkaService.remove(oldData.id, {
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

