import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import Carousel from '../../../components/carousel/Carousel'
import useFetch from '../../../hooks/usefetch'
import SwitchTabs from '../../../components/switchTab/SwitchTabs'


const Trending = () => {
    let [endpoint, setEndpoint] = useState("day");

    const { data, loading } = useFetch(`/trending/all/${endpoint}`);

    const onTabChange = (tab) => {
        setEndpoint(tab === "Today" ? "day" : "week");
    }
    return (
        <div className="carouselSelection">
            <ContentWrapper>
                <span className="carouselTitle">Trending</span>
                <SwitchTabs data={["Today","Weekly"]} onTabChange={onTabChange}/>
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading}/>
        </div>
    )
}

export default Trending
