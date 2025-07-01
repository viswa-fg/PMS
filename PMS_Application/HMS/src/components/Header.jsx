import React from 'react'
import { FaHotel, FaTrainSubway } from "react-icons/fa6";
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <div style={{display:'flex'}}>
          <div>
        <Link to='/' className='primary'>
         <FaHotel />
         <aside>Hotels</aside>
        </Link>
          </div>
        <div style={{marginLeft:'20px'}}>
        <Link to='train'>
            <FaTrainSubway />
            <aside>Trains</aside>
        </Link>
        </div>
    </div>
  )
}

export default Header