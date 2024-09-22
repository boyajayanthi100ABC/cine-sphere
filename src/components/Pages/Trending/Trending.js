// const Trending = () => {

//     const fetchTrending = async () => {
//         const {data} = await axios.get(``)
//     }

//     return(
//         <div>
//             <span className="pageTitle tending-styles"> Trending </span>
//         </div>
//     )
// }
// export default Trending 


import { useState, useEffect } from 'react';
import axios from 'axios';
import SingleContent from '../../SingleContent/SingleContent';
import './Trending.css';
import CustomPagination from '../../Pagination/CustomPagination';

const Trending = () => {
  const [videosData, setVideosData] = useState([]);
  const [apiStatus, setApiStatus] = useState('loading');
  const [page, setPage] = useState();
  const [content, setContent] = useState([]);
  const [numOfPages, setNumofPages]= useState();

  const fetchTrending = async (pageNumber = 1) => { 

    try {
      // const response = await axios.get(`https://apis.ccbp.in/videos/all?page=${page}`, options);
      const response = await axios.get(`https://movies-app-backend-eight.vercel.app/movies/?limit=10&offset=${(pageNumber - 1) * 10}`);

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
        // setNumofPages(60);
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
    fetchTrending(pageNumber);
  }

  // setContent(response.result);
  useEffect(() => {
    fetchTrending();
  }, [page]);

  return (
    <div>
      <span className="pageTitle tending-styles">Trending</span>
      {/* Render videosData here */}
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
  );
};

export default Trending;
