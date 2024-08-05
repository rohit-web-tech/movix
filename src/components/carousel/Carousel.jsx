import React, { useRef } from 'react'
import "./style.scss"
import ContentWrapper from '../contentWrapper/ContentWrapper'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import Img from "../../components/lazyloading/Img"
import dayjs from "dayjs"
import CircleRating from '../CircleRating/CircleRating'
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import backdropImage from "../../assets/no-poster.png" ;
import Genres from '../genres/Genres'
import { useNavigate } from 'react-router-dom'

const Carousel = ({ title, loading, data, endpoint }) => {
  let navigate = useNavigate();
  const carouselContainer = useRef();
  const url = useSelector(state => state.home.url)
  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };
  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };
  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div className="carouselTitle">{title}</div>}
        {!loading &&
        <>
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => navigation("right")} 
        />
        </>
        }
        {!loading ?
          (<div className="carouselItems" ref={carouselContainer} >
            {data?.map(item => {
              const imageUrl = item.backdrop_path ? url.poster + item.backdrop_path : backdropImage;
              return (
                <div className="carouselItem" key={item.id} onClick={()=>{navigate(`/${item.media_type || endpoint}/${item.id}`)}}>
                  <div className="posterBlock">
                    <Img src={imageUrl} />
                    <CircleRating
                      rating={item.vote_average.toFixed(
                        1
                      )}
                    />
                  <Genres ids={item.genre_ids.slice(0,2)} />
                  </div>
                  <div className="textBlock">
                    <span className="title">
                      {item.title || item.name}
                    </span>
                    <span className="date">
                      {dayjs(item.release_date || item.first_air_date).format(
                        "MMM D, YYYY"
                      )}
                    </span>
                  </div>
                </div>
              )
            })
            }
          </div>) : (
            <div className="loadingSkeleton">
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
            </div>
            )
        }
      </ContentWrapper>
    </div>
  )
}

export default Carousel ;
