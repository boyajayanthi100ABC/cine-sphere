import { Button, createTheme, Tab, Tabs, TextField, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import SingleContent from "../../SingleContent/SingleContent";
import CustomPagination from "../../Pagination/CustomPagination";
import './Search.css';


const Search = () => {
    const [type, setType] = useState(0);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [videosData, setVideosData] = useState([]);
    const [content, setContent] = useState();
    const [numOfPages, setNumOfPages] = useState();
    const [isSearchTriggered, setIsSearchTriggered] = useState(false);



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
                setIsSearchTriggered(true);
                // setSearchText("");
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
        <div className="page-container">
            <ThemeProvider theme={darkTheme}>
                <div style={{ display: "flex", margin: '10px 15px 0 15px' }}>
                    <TextField style={{ flex: 1 }} className="searchBox" label="search" variant="filled"
                        onChange={(e) => setSearchText(e.target.value)} onKeyDown={handleKeyPress}
                    />
                    <Button variant='containerd' style={{ marginLeft: 10, backgroundColor: "#ffff", color: "black" }} onClick={handleSearch}>
                        <SearchIcon />
                    </Button>
                </div>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center", margin: '5px 0px 0 15px' }}>
                <Tabs value={type} indicatorColor='primary' textColor='primary'
                    onChange={(event, newValue) => {
                        setType(newValue);
                        setIsSearchTriggered(false);
                        setPage(1);
                    }}>
                    <Tab className="search-tab" label="Search Movies" />
                    <Tab style={{ width: "50%" }} label="Search TV Series" />
                </Tabs>
                </div>
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


{/* <p> {{ isSearchTriggered }} </p> */}
                { isSearchTriggered === true && searchText &&
          videosData.length === 0 &&
          (type === 0 ? <h2>No Movies Found</h2> : <h2>No Series Found</h2>)}

            </div>
            {numOfPages > 1 && 
      <CustomPagination setPage={setPage} onHandleChange={onhandleChange} numOfPages={numOfPages} />}
        </div>
        // </div>
    )
}
export default Search  