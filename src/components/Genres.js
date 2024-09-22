import { Chip } from '@mui/material';
import applicationConfiguration from './assets/json/application-configuration.json';
import { useEffect } from 'react';


const Genres = ({
    selectedGenres,
    setSelectedGenres, 
    genres,
    setGenres, 
    setPage}) => {
        // const genresData = applicationConfiguration.GenresN;
        console.log("all genres", selectedGenres,
          genres);


        const handleAdd = (genre) => {
          console.log("genre ids1", genre);
            setSelectedGenres([...selectedGenres, genre]);
            const selGenres = genres.filter((g) => g.id !== genre.id);
            setGenres(selGenres);
            console.log("genre ids2", selectedGenres);
            console.log("genre ids3", genres);
            // console.log("genre ids3", selGenres);
            setPage(1);
        }

        const handleRemove = (genre) => {
            setSelectedGenres(
              selectedGenres.filter((selected) => selected.id !== genre.id)
            );
            setGenres([...genres, genre]);
            setPage(1);
          };

  useEffect(() => {
    // setGenres(genres) ;
    console.log("Selected Genres: ", selectedGenres);
    console.log("Remaining Genres: ", genres);
  }, [genres, selectedGenres])

  return <div style={{
    padding: '6px 0',
    paddingTop: '20px',
    width: '80%',
    marginLeft: '13%',
    marginRight: '10%',
    
  }} >
    {selectedGenres && selectedGenres.map((genre) => (
      <Chip
        style={{ margin: 2 }}
        label={genre.name}
        key={genre.id}
        color="primary"
        clickable
        size="small"
        onDelete={() => handleRemove(genre)}
      />
    ))}
    {genres && genres.map((genre) => (
      <Chip
      style={{ margin: 2, backgroundColor: 'white' }}
        label={genre.name}
        key={genre.id}
        clickable
        size="small"
        onClick={() => handleAdd(genre)}
      />
    ))}
  </div>

};

export default Genres;