
export const columns = [
    {
      title: 'Nazwa', field: 'nazwa',
      cellStyle: { paddingLeft: '14px', maxWidth: 150, },
      headerStyle: { paddingLeft: "14px" }
    },
  {
    title: 'Stanowisko', field: 'stanowisko.nazwa_stan',
 
      headerStyle: { paddingLeft: 0 },
      cellStyle: { maxWidth: 160 },
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
      cellStyle: { maxWidth: 150 }
    },
    {
      title: 'Dział', field: 'dzial.nazwa_dzialu',
      cellStyle: { maxWidth: 150 }
    },
    {
      title: 'Sym.', field: 'dzial.symbol',
      editable: 'never',
      cellStyle: {
        paddingLeft: '15px',
        maxWidth: '100px'
      }, headerStyle: { minWidth: '250px', maxWidth: '250px' },
    },
    {
      title: 'Numer pokoju', field: 'numer_pokoju',
      cellStyle: { paddingLeft: "5px" }
    },
  ]
