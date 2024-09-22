import { Badge } from "@mui/material";
import { img_300, unavailable } from "../config/config";
import './SingleContent.css';
import ContetnModal from "../ContentModal/ContentModal";

const SingleContent = ({id, genre, overview,poster, productionCompanies, rating, releaseDate, title, type }) => {
    // const numericViewsCount = parseFloat(viewsCount.replace("K", "")* 1000);
    return(
        <ContetnModal id={id} type={type}>
            <Badge badgeContent={rating} color={rating > 7 ? 'primary' : 'secondary'} />
            <img src={`${poster}`} alt={title} className="poster" />
            {/* <img src={thumbNail.startsWith("http") ? `${img_300}/${thumbNail}`: unavailable} alt={title} /> */}
            <div className="content-card">
                <p className="title"> {title} </p>
                {/* <span className="subTitle"> Genre: {genre} </span> */}
                <span className="subTitle"> Releasing date: {releaseDate} </span>
                {/* <p> Overview: {overview} </p> */}
            </div>
        </ContetnModal>
    )



}

export default SingleContent
