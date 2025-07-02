import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Search from './Search'

const Routings = () => {
  return (
    <Routes>
        <Route path='/' element={<Search />} />
      <Route path='train' element={  <iframe
        src="http:// 65.0.127.39:3002"
        title="Product Microfrontend"
        width="100%"
        height="600px"
      
      />} />
    </Routes>
  )
}

export default Routings