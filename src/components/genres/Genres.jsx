import React from 'react'
import { getGeneres } from '../../store/homeSlice';
import "./style.scss";
import { useSelector } from 'react-redux';


const Genres = ({ids}) => {
    let {generes} = useSelector(state => state.home);
  return (
    <div className='genres'>
      {ids && ids.map(id=>{
        if(!generes[id]) return ;
        return (
            <div className='genre' >
                {generes[id]?.name}
            </div>
        )
      })}
    </div>
  )
}

export default Genres
