import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Routings from './components/Routings'
import Header from './components/Header'

function App() {
  useEffect(() => {
  const handleMessage = (event) => {
    if (event.origin !== "http:// 65.0.127.39:3001") return;
    console.log("Received hotel data:", event);
    // Use it to populate a booking form, or send to backend
    // console.log(event);
    
  };

  window.addEventListener("message", handleMessage);
  return () => window.removeEventListener("message", handleMessage);
}, []);



  return (
    <>
     <Header />
     <Routings />
      
    </>
  )
}

export default App
