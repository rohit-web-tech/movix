import React, { useState } from 'react'
import "./style.scss";
import useFetch from '../../../hooks/usefetch'
import { useNavigate } from 'react-router-dom';
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyloading/Img"
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
const HeroBanner = () => {
  let navigate = useNavigate();
  let { data, error, loading } = useFetch("/movie/upcoming");
  let [query, setQuery] = useState("");
  let [background, setBackground] = useState("");
  const url = useSelector((res) => res.home.url);
  const handleSearchQuery = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  }
  useEffect(() => {
    const bg = url?.backdrop + data?.results[Math.floor(Math.random() * 19)]?.backdrop_path;
    setBackground(bg);
  }, [data])
  return (
    <div id="hero-banner">
      <div className="hero-banner-backdrop">
        <Img src={background} className="hero-banner-background"/>
      </div>
      <div className="hero-banner-shading"></div>
      <ContentWrapper>
        <div className="hero-banner-title">
          <span>Welcome.</span>
        </div>
        <div className="hero-banner-subtitle">
          <span>Millons of Movies, TV shows and People to discover.Explore now.</span>
        </div>
        <div className="search-query-section">
          <input
            type="text"
            className="text"
            placeholder='Search Movie or TV Show'
            onKeyUp={handleSearchQuery}
            onChange={(e) => { setQuery(e.target.value) }}
          />
          <button>Search</button>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner
