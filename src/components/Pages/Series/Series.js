import axios from "axios";
import { useEffect, useState } from "react";
import applicationConfiguration from '../../assets/json/application-configuration.json';
import SingleContent from "../../SingleContent/SingleContent";
import CustomPagination from "../../Pagination/CustomPagination";
import Genres from "../../Genres";
import useGenre from "../../hooks/useGenre";


const Series = () => {

  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumofPages] = useState(60);
  const [videosData, setVideosData] = useState([]);
  const [apiStatus, setApiStatus] = useState('loading');
  const [selectedGenres, setSelectedgenres] = useState([]);

  const [genres, setGenres] = useState(applicationConfiguration.Genres);

  const genreforURL = useGenre(selectedGenres);


  const fetchGenres = async () => {
    try {
      const response = await axios.get(`https://movies-app-backend-eight.vercel.app/tv-series-genres`);

      if (response.status === 200) {
        setGenres(response.data);  
      } else {
      }
    } catch (error) {
    }
  };

  const fetchSeries = async (pageNumber = 1) => {
    try {
      const response = await axios.get(`https://movies-app-backend-eight.vercel.app/tv-series/?genre=${genreforURL}&limit=10&offset=${(pageNumber - 1) * 10}`);

      if (response.status === 200) {
        const updatedData = response.data.tvSeriesList.map(eachItem => ({
          id: eachItem.id,
          genre: eachItem.genre,
          overview: eachItem.overview,
          videoTitle: eachItem.title,
          poster:  eachItem.poster,
          productionCompanies: eachItem.creators,
          rating: eachItem.rating,
          releaseDate: eachItem.releaseDate,
          title: eachItem.title,
          type: eachItem.type,
        }));
        setNumofPages(Math.ceil((response.data.totalTvSeries)/10));
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
    fetchSeries(pageNumber);
  }


  useEffect(() => {
    fetchSeries();
  }, [page, genreforURL]);

  useEffect(() =>{
    fetchGenres();
  }, []);

    return(
        <div className="page-container">
            <span className="pageTitle"> Series </span>
            <Genres type="tv" 
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

            </div>
            {numOfPages > 1 && 
      <CustomPagination setPage={setPage} onHandleChange={onhandleChange} numOfPages={numOfPages} />}
        </div>
    )
}
export default Series  