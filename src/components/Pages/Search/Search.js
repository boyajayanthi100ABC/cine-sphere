import { Button, createTheme, Tab, Tabs, TextField, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import SingleContent from "../../SingleContent/SingleContent";
import CustomPagination from "../../Pagination/CustomPagination";


const Search = () => {
    const [type, setType] = useState(0);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [videosData, setVideosData] = useState([]);
    const [content, setContent] = useState();
    const [numOfPages, setNumOfPages] = useState();

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: "#fff",
            }
        },
    });

    const fetchSearch = async (searchText,pageNumber = 1) => {
        // if (searchText){
        //     searchText = searchText.toLowerCase();
        // }

        let typeVar; 
        let response;
        let responsList;

        if (type === 0) {
            typeVar = 'movies';
            responsList = 'moviesList';
        } else {
            typeVar = 'tv-series';
            responsList = 'tvSeriesList';
        }

        try {
            response = await axios.get(`https://movies-app-backend-eight.vercel.app/${typeVar}/?search=${searchText}&limit=10&offset=${(pageNumber - 1) * 10}`);
            if (response.status === 200) {
                const updatedData = response.data[responsList].map(eachItem => ({
                    id: eachItem.id,
                    genre: eachItem.genre,
                    overview: eachItem.overview,
                    videoTitle: eachItem.title,
                    poster: eachItem.poster,
                    // productionCompanies: eachItem.productionCompanies,
                    rating: eachItem.rating,
                    releaseDate: eachItem.releaseDate,
                    title: eachItem.title,
                    type: eachItem.type,
                }));
                setNumOfPages(Math.ceil((response.data.totalMovies)/10));
                setVideosData(updatedData);
                console.log("videos Data", videosData);
                console.log("videos Data1", updatedData)
                // setApiStatus('success');
            }

        }
        catch (error) {
            // console.log("videos Data4", response.data.);
            console.log(error.error);
        }

    };

    const onhandleChange = (pageNumber) =>{
        fetchSearch(null, pageNumber);
      }

    const handleSearch = () => {
        setPage(1);
        fetchSearch(searchText);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    // useEffect(() =>{
    //     fetchSearch("");
    // },[])

    useEffect(() => {
        // Trigger fetch when the tab is changed or when the page number changes
        fetchSearch(null, page);
        console.log("videos Data2", videosData);
    }, [type, page]);

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <div style={{ display: "flex", margin: '15px 0' }}>
                    <TextField style={{ flex: 1 }} className="searchBox" label="search" variant="filled"
                        onChange={(e) => setSearchText(e.target.value)} onKeyDown={handleKeyPress}
                    />
                    <Button variant='containerd' style={{ marginLeft: 10, backgroundColor: "#ffff", color: "black" }} onClick={handleSearch}>
                        <SearchIcon />
                    </Button>
                </div>
                <Tabs value={type} indicatorColor='primary' textColor='primary'
                    onChange={(event, newValue) => {
                        setType(newValue);
                        setPage(1);
                    }}>
                    <Tab style={{ width: "50%" }} label="Search Movies" />
                    <Tab style={{ width: "50%" }} label="Search TV Series" />
                </Tabs>
            </ThemeProvider>
            {/* <div> */}
            {/* <span className="pageTitle tending-styles">Trending</span> */}
            {/* Render videosData here */}
            <div className="trending">
                {
                    videosData && videosData.map((video) => (
                        <SingleContent
                            key={video.id}
                            id={video.id}
                            genre={video.genre}
                            overview={video.overview}
                            poster={video.poster}
                            productionCompanies={video.productionCompanies}
                            rating={video.rating}
                            releaseDate={video.releaseDate}
                            title={video.title} 
                            type={video.type} />
                    ))
                }
                {searchText &&
          !videosData &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}

            </div>
            {numOfPages > 1 && 
      <CustomPagination setPage={setPage} onHandleChange={onhandleChange} numOfPages={numOfPages} />}
        </div>
        // </div>
    )
}
export default Search  