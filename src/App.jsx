import { useState, useEffect } from 'react'
import './App.css'
import { fetchDataFromApi } from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration } from "./store/homeSlice"
import Home from "./pages/home/Home"
import Details from "./pages/details/Details"
import PageNotFound from "./pages/404/PageNotFound"
import Search from "./pages/search/Search"
import Explore from "./pages/explore/Explore"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'

function App() {

  const dispatch = useDispatch();
  const url = useSelector((state) => state.home)
  console.log(url);
  useEffect(() => {
    apiTesting();
  }, [])

  const apiTesting = async () => {
    let data = await fetchDataFromApi("/configuration")
    console.log(data)
    const url ={
      backdrop : data.images.secure_base_url + "original",
      poster : data.images.secure_base_url + "original",
      profile : data.images.secure_base_url + "original"
    }
    dispatch(getApiConfiguration(url))
  }
  return (
    <>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/:mediaType/:id" element={<Details/>}/>
        <Route path="/search/:query" element={<Search/>}/>
        <Route path="/explore/:mediaType" element={<Explore/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
