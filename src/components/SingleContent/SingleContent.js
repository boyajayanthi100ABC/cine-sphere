import { Badge } from "@mui/material";
import { img_300, unavailable } from "../config/config";
import './SingleContent.css';
import ContetnModal from "../ContentModal/ContentModal";

const SingleContent = ({id, genre, overview,poster, productionCompanies, rating, releaseDate, title, type }) => {
    return(
        <ContetnModal id={id} type={type}>
            <Badge badgeContent={rating} color={rating > 7 ? 'primary' : 'secondary'} />
            <img src={`${poster}`} alt={title} className="poster" />
            <div className="content-card">
                <p className="title"> {title} </p>
                <span className="subTitle"> Releasing date: <br/> 
                {releaseDate} </span>
            </div>
        </ContetnModal>
    )
}

export default SingleContent
