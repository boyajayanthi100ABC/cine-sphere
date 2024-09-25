import axios from "axios";
import { useEffect, useState } from "react";
import SingleContent from "../../SingleContent/SingleContent";
import CustomPagination from "../../Pagination/CustomPagination";
import Genres from "../../Genres";
import applicationConfiguration from '../../assets/json/application-configuration.json';
import useGenre from "../../hooks/useGenre";
import ContetnModal from "../../ContentModal/ContentModal";
import { ShowChart } from "@mui/icons-material";


const Movies = () => {

  const [page, setPage] = useState(1);

  const [content, setContent] = useState([]);
  const [numOfPages, setNumofPages] = useState();
  const [videosData, setVideosData] = useState([]);
  const [apiStatus, setApiStatus] = useState('loading');
  const [selectedGenres, setSelectedgenres] = useState([]);

  const [genres, setGenres] = useState();

  const genreforURL = useGenre(selectedGenres);


  const fetchGenres = async () => {
    try {
      const response = await axios.get(`https://movies-app-backend-eight.vercel.app/movie-genres`);

      if (response.status === 200) {
        setGenres(response.data);  
      } else {
      }
    } catch (error) {

    }
  };


  const fetchMovies = async (pageNumber = 1) => {
    try {
      const response = await axios.get(`https://movies-app-backend-eight.vercel.app/movies/?genre=${genreforURL}&limit=10&offset=${(pageNumber - 1) * 10}`);

      if (response.status === 200) {  
        const updatedData = response.data.moviesList.map(eachItem => ({
          id: eachItem.id,
          genre: eachItem.genre,
          overview: eachItem.overview,
          videoTitle: eachItem.title,
          poster:  eachItem.poster,
          productionCompanies: eachItem.productionCompanies,
          rating: eachItem.rating,
          releaseDate: eachItem.releaseDate,
          title: eachItem.title,
          type: eachItem.type,
        }));
        setNumofPages(Math.ceil((response.data.totalMovies)/10));
        setVideosData(updatedData);
        setApiStatus('success');
      } else {
        setApiStatus('failure');
      }
    } catch (error) {
      setApiStatus('failure');
    }
  };

  const onhandleChange = (pageNumber) =>{
    setPage(pageNumber);
    localStorage.setItem('currentMoviesPage', pageNumber);
    fetchMovies(pageNumber);
  }

  useEffect(() => {
    fetchMovies();
  }, [selectedGenres]);

  useEffect(() => {
    fetchGenres();
    fetchMovies();
  }, []);

 
    return(
        <div className="page-container">
            <span className="pageTitle"> Movies </span>
            <Genres type="movie" 
                selectedGenres={selectedGenres}
                genres={genres}
                setSelectedGenres={setSelectedgenres}
                setGenres={setGenres} 
                setPage={setPage}
                />
            <div className="trending">
        {
            videosData && videosData.map((video) => (
                <SingleContent 
                key={video.id} 
                id={video.id} 
                genre = {video.genre} 
                overview = {video.overview}
                poster={video.poster} 
                productionCompanies={video.productionCompanies}
                rating={video.rating}
                releaseDate = {video.releaseDate}
                title = {video.title} 
                type={video.type} />
            ))
        }

      </div>
      {numOfPages > 1 && 
      <CustomPagination setPage={setPage} onHandleChange={onhandleChange} numOfPages={numOfPages} />}
      </div>
    )
}
export default Movies 