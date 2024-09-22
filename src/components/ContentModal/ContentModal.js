import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './ContentModal.css';
import { ThemeContext } from '@emotion/react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
// import YouTubeIcon from "@mui/material/icons/YouTubeIcon";
import Carousel from "../Carousel/Carousel";
import YouTubeIcon from '@mui/icons-material/YouTube';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
// //   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   p: 4,
//   width: "90%",
//   height: "80%",
//   backgroundColor: "#39445a",
//   border: "1px solid #282c34",
//   borderRadius: 10,
//   boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
// //   padding: shadow.spacing(1,1,3)
// };

export default function ContetnModal({ children, id, type }) {
    console.log("children", children, id, type);
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = useState();
    const [videosData, setVideosData] = useState();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let typeVar;

    if(type === 'MOVIE'){
        typeVar = 'movies';
    }else if(type === 'TV_SERIES'){
        typeVar = 'tv-series';
    }


    const fetchData = async () => {
        const idNumber = JSON.stringify(id);
        const { data } = await axios.get(`https://movies-app-backend-eight.vercel.app/${typeVar}/${id}`);

        console.log("data", data);
        setContent(data);
    }

    //   const fetchVideosData = async () => {
    //     const {data} = await axios.get(`https://movies-app-backend-eight.vercel.app//movie/${id}`);
    //     setVideosData(data);
    // }


    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Button onClick={handleOpen} className="media">{children}</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open} className="content-style">
                    {content && (<div className='ContentModal'>
                        <img className="ContentModal__portrait" src={content.poster} alt={content.title} />
                        {/* <img className="ContentModal__landscape" src={content.poster} alt={content.title}/> */}
                        <div className="ContentModal__about">
                            <span className="ContentModal__title">
                                {content.title} (
                                {(
                                    content.releaseDate ||
                                    "-----"
                                ).substring(0, 4)}
                                )
                            </span>
                            {/* <p>
                    {content.overview && (
                        <i className="tagline">{content.overview}</i>
                    )}
                  </p> */}
                            <span className="ContentModal__description">
                                {content.overview}
                            </span>

                            <div>
                                <Carousel  id={id}/>
                                {/* // { media_type={media_type}  */}
                            </div>

                            <div className="watchTrailer-Btn-div">
                                <Button
                                    variant="contained"
                                    startIcon={<YouTubeIcon />}
                                    color="secondary"
                                    target="__blank"
                                    className="watchTrailer-Btn"
                                // href={`https://www.youtube.com/watch?v=${video}`}
                                >
                                    Watch the Trailer
                                </Button>
                            </div>
                        </div>
                    </div>
                        //   <Box  className="content-style">
                        //     <Typography id="transition-modal-title" variant="h6" component="h2">
                        //       Text in a modal
                        //     </Typography>
                        //     <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                        //       Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        //     </Typography>
                        //   </Box>
                    )}
                </Fade>
            </Modal>
        </div>
    );
}