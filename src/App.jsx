import { useState, useEffect } from 'react'
import './App.css'
import { fetchDataFromApi } from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration , getGeneres } from "./store/homeSlice"
import Home from "./pages/home/Home"
import Details from "./pages/details/Details"
import PageNotFound from "./pages/404/PageNotFound"
import Search from "./pages/search/Search"
import Explore from "./pages/explore/Explore"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Genres from './components/genres/Genres'


function App() {

  const dispatch = useDispatch();
  const url = useSelector((state) => state.home)
  useEffect(() => {
    apiTesting();
    fetchGenres();
  }, [])

  const apiTesting = async () => {
    let data = await fetchDataFromApi("/configuration")
    const url ={
      backdrop : data.images.secure_base_url + "original",
      poster : data.images.secure_base_url + "original",
      profile : data.images.secure_base_url + "original"
    }
    dispatch(getApiConfiguration(url))
  }

  let fetchGenres = async() =>{
    let genres = [] ;
    let endpoints = ['tv','movie'];
    let genresData = {} ;
    endpoints.forEach((url)=>{
      genres.push(fetchDataFromApi(`/genre/${url}/list`))
    })
    let data = await Promise.all(genres);
    data.map(genres=>{
      return genres.genres.map(item=>{
        return (genresData[item.id] = item);
      }) 
    })
    dispatch(getGeneres(genresData));
  }

  return (
    <>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route key="home" path="/" element={<Home/>}/>
        <Route key="details" path="/:mediaType/:id" element={<Details/>}/>
        <Route key="search" path="/search/:query" element={<Search/>}/>
        <Route key="explore" path="/explore/:mediaType" element={<Explore/>}/>
        <Route key="pagenotfound" path="*" element={<PageNotFound/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
