import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import Listing from './modules/Listing';
import HotelDetails from './modules/HotelDetails';

// App component manages the main layout and renders micro frontends
function App() {
  const [filterData,setfilterData] = useState([])
 
  useEffect(() => {
    const receiveMessage = async (event) => {
      if (event.origin !== "http://13.127.177.129:3000") {
        console.log("Received message from unknown origin:", event.origin);
        return;
      }
  
      const location = event.data;
      console.log("Received location from parent:", location);
  
      try {
        const res = await fetch(`http://13.127.177.129:8080/api/hotels/search?location=${location}`);
        const data = await res.json();
  
        console.log("Hotel data fetched from backend:", data); 
        setfilterData(data);
      } catch (err) {
        console.error("Failed to fetch hotel data:", err); //Optional: Log error
      }
    };
  
    window.addEventListener("message", receiveMessage);
    return () => window.removeEventListener("message", receiveMessage);
  }, []);
  

  return (
    <div className="App">
      <HotelDetails hotels={filterData} />
    </div>
  )
}

export default App
