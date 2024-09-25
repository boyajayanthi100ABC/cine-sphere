import {createTheme, ThemeProvider } from '@mui/material';
import Pagination from '@mui/material/Pagination';


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const CustomPagination = ({setPage, onHandleChange, numOfPages = 10}) => {

    return(
        <div style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: 10,
        }}>
            <ThemeProvider theme={darkTheme}>
            <Pagination count={numOfPages} onChange={(e) => onHandleChange(e.target.textContent)}
                hideNextButton 
                hidePrevButton 
                color="primary"
                />
            </ThemeProvider>
        </div>
    )
}

export default CustomPagination