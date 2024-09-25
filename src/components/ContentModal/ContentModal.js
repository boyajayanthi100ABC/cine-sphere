import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import './ContentModal.css';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
// import YouTubeIcon from "@mui/material/icons/YouTubeIcon";
import Carousel from "../Carousel/Carousel";
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function ContetnModal({ children, id, type }) {
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = useState();

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
        setContent(data);
    }


    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="card">
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
                        <div className="ContentModal__about">
                            <span className="ContentModal__title">
                                {content.title} (
                                {(
                                    content.releaseDate ||
                                    "-----"
                                ).substring(0, 4)}
                                )
                            </span>
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
                    )}
                </Fade>
            </Modal>
        </div>
    );
}