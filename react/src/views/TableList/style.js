import MaterialTable, {MTableToolbar} from 'material-table';
import { createTheme} from "@material-ui/core/styles";


const customSearchField = {
    width: "450px",
    height: "50px",
    left: "300px",
    position: "absolute",
    marginTop: "-95px",
};

const toolbarPlacement = {
    Toolbar: props => (
        <div style={{
            position: "absolute",
        }}>
            <MTableToolbar {...props} />
        </div>)
}

const tableStyle = {
    rowStyle: {
        padding: 5,
        fontSize: 15,
    },
    headerStyle: {
        padding: 12,
    },
    searchFieldAlignment: "left",
    searchFieldVariant: "outlined",
    pageSize: 20,
    pageSizeOptions: [10, 20, 30, 40, 50],
    searchFieldStyle: customSearchField,
}

const tableRowPadding = createTheme({
    overrides: {
        MuiTableCell: {
            root: {
                paddingTop: 11,
                paddingBottom: 11,
                padding: 12,
            }
        },
    }
});

const style = {
    toolbarPlacement,
    tableStyle,
    tableRowPadding,
};
export default style;