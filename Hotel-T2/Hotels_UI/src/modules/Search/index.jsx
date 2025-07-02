// index.jsx - Search component for hotel booking
import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';
import HotelDetails from '../HotelDetails';

// List of popular cities for quick search
const POPULAR_CITIES = [
  'Delhi',
  'Mumbai',
  'Bangaluru',
  'Hyderabad'
];

// SVG icon for location
const LocationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: 8}}>
    <path d="M12 2C7.03 2 3 6.03 3 11c0 5.25 7.11 10.39 8.09 11.09.34.25.82.25 1.16 0C13.89 21.39 21 16.25 21 11c0-4.97-4.03-9-9-9zm0 17.88C9.14 17.1 5 13.61 5 11c0-3.87 3.13-7 7-7s7 3.13 7 7c0 2.61-4.14 6.1-7 8.88z" fill="#888"/>
    <circle cx="12" cy="11" r="3" fill="#888"/>
  </svg>
);

/**
 * Search component
 * Handles hotel search form, guest selection, and triggers hotel details view
 */
const Search = () => {
  // State for search form fields
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
  const [guestInfo, setGuestInfo] = useState({ rooms: 1, adults: 2, children: 0 });
  // UI state for dropdowns and search mode
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);
  const [showPopular, setShowPopular] = useState(false);
  // Refs for handling click outside
  const locationInputRef = useRef(null);
  const popularRef = useRef(null);
  const guestDropdownRef = useRef(null);
  // State to toggle between search form and results
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  // Helper to format date for display
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear().toString().substr(-2);
    return `${day} ${month} '${year}`;
  };

  // Helper to get day name from date
  const getDayName = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  // Handler for changing guest info (rooms, adults, children)
  const handleGuestChange = (type, operation) => {
    setGuestInfo(prev => ({
      ...prev,
      [type]: operation === 'add' ? prev[type] + 1 : Math.max(1, prev[type] - 1)
    }));
  };

  // Handler for search button click
  const handleSearch = async () => {
    console.log("Starting search...");
    console.log("📍 Location entered:", location);
  
    setLoading(true);
    setIsSearchMode(true);
  
    try {
      const url = `http:// 65.0.127.39:8080/api/hotels/search?location=${encodeURIComponent(location)}`;
      console.log("🌐 Fetching from URL:", url);
  
      const res = await fetch(url);
  
      if (!res.ok) {
        console.error("❌ Failed to fetch data. Status:", res.status);
        throw new Error('Failed to fetch');
      }
  
      const data = await res.json();
      console.log("Hotel data received from backend:", data);
  
      setHotels(data);
    } catch (e) {
      console.error("Error while fetching hotel data:", e);
      setHotels([]);
    }
  
    setLoading(false);
    console.log("Search complete.");
  };
  

  // Effect: Close popular dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (
        popularRef.current &&
        !popularRef.current.contains(event.target) &&
        locationInputRef.current &&
        !locationInputRef.current.contains(event.target)
      ) {
        setShowPopular(false);
      }
    }
    if (showPopular) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopular]);

  // Effect: Close guest dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (
        guestDropdownRef.current &&
        !guestDropdownRef.current.contains(event.target) &&
        !event.target.className.includes('guest-input')
      ) {
        setIsGuestDropdownOpen(false);
      }
    }
    if (isGuestDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isGuestDropdownOpen]);

  // Render search form or hotel details based on isSearchMode
  return (
    <>
      <div className="search-section-container">
        {/* Title section */}
        <div className="search-title-container">
          <h1 className="search-title">Book Hotels and Homestays</h1>
        </div>
        {/* Search form section */}
        <div className="search-form-container">
          {!isSearchMode ? (
            <div className="search-form">
              {/* Location input with popular dropdown */}
              <fieldset className="search-input-group location-group">
                <legend>Where to</legend>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. - Area, Landmark or Property Name"
                  className="location-input"
                  onFocus={() => setShowPopular(true)}
                  ref={locationInputRef}
                  autoComplete="off"
                />
                {/* Popular cities dropdown */}
                {showPopular && (
                  <div className="popular-dropdown" ref={popularRef}>
                    <div className="popular-title">Popular Searches</div>
                    <ul className="popular-list">
                      {POPULAR_CITIES.map((city) => (
                        <li
                          key={city}
                          className="popular-item"
                          onClick={() => {
                            setLocation(city);
                            setShowPopular(false);
                            if (locationInputRef.current) locationInputRef.current.blur();
                          }}
                        >
                          <LocationIcon />
                          {city}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </fieldset>
              {/* Check-in date picker */}
              <fieldset className="search-input-group">
                <legend>Check-in</legend>
                <DatePicker
                  selected={checkIn}
                  onChange={date => setCheckIn(date)}
                  minDate={(() => { const d = new Date(); d.setHours(0,0,0,0); return d; })()}
                  className="date-input"
                  dateFormat="dd MMM 'yy"
                  customInput={
                    <div className="custom-date-input">
                      <div className="date-value">{formatDate(checkIn)}</div>
                      <div className="day">{getDayName(checkIn)}</div>
                    </div>
                  }
                />
              </fieldset>
              {/* Check-out date picker */}
              <fieldset className="search-input-group">
                <legend>Check-out</legend>
                <DatePicker
                  selected={checkOut}
                  onChange={date => setCheckOut(date)}
                  minDate={(() => { const d = new Date(checkIn); d.setDate(d.getDate() + 1); return d; })()}
                  className="date-input"
                  dateFormat="dd MMM 'yy"
                  customInput={
                    <div className="custom-date-input">
                      <div className="date-value">{formatDate(checkOut)}</div>
                      <div className="day">{getDayName(checkOut)}</div>
                    </div>
                  }
                />
              </fieldset>
              {/* Guests & Rooms selector */}
              <fieldset className="search-input-group">
                <legend>Guests & Rooms</legend>
                <div 
                  className="guest-input"
                  onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
                >
                  <span>{guestInfo.adults} Adults | {guestInfo.rooms} Room{guestInfo.rooms > 1 ? 's' : ''}{guestInfo.children > 0 ? ` | ${guestInfo.children} Child${guestInfo.children > 1 ? 'ren' : ''}` : ''}</span>
                </div>
                {/* Guest dropdown for selecting rooms, adults, children */}
                {isGuestDropdownOpen && (
                  <div className="guest-dropdown guest-dropdown-large" ref={guestDropdownRef}>
                    <div className="guest-row">
                      <div className="guest-col">
                        <div className="guest-label">Rooms <span className="guest-label-sub">(Max 8)</span></div>
                        <div className="guest-controls">
                          <button onClick={() => setGuestInfo(g => ({ ...g, rooms: Math.max(1, g.rooms - 1) }))}>-</button>
                          <span>{guestInfo.rooms}</span>
                          <button onClick={() => setGuestInfo(g => ({ ...g, rooms: Math.min(8, g.rooms + 1) }))}>+</button>
                        </div>
                      </div>
                      <div className="guest-col">
                        <div className="guest-label">Adults <span className="guest-label-sub">(17+ yr)</span></div>
                        <div className="guest-controls">
                          <button onClick={() => setGuestInfo(g => ({ ...g, adults: Math.max(1, g.adults - 1) }))}>-</button>
                          <span>{guestInfo.adults}</span>
                          <button onClick={() => setGuestInfo(g => ({ ...g, adults: g.adults + 1 }))}>+</button>
                        </div>
                      </div>
                      <div className="guest-col">
                        <div className="guest-label">Children <span className="guest-label-sub">(0-17 yr)</span></div>
                        <div className="guest-controls">
                          <button onClick={() => setGuestInfo(g => ({ ...g, children: Math.max(0, g.children - 1) }))}>-</button>
                          <span>{guestInfo.children}</span>
                          <button onClick={() => setGuestInfo(g => ({ ...g, children: g.children + 1 }))}>+</button>
                        </div>
                      </div>
                    </div>
                    {/* Info box for children options */}
                    <div className="guest-info-box">
                      <div className="guest-info-left">
                        <div className="guest-info-title">Travelling with children?</div>
                        <div className="guest-info-desc">If you are travelling with children, add number of children and their age to get the best rooms options, prices etc.</div>
                      </div>
                      <div className="guest-info-right">
                        <div className="guest-info-feature"><span className="guest-info-icon">🛏️</span> Extra Mattress</div>
                        <div className="guest-info-feature"><span className="guest-info-icon">🥞</span> Kid Breakfast Inclusive plans</div>
                      </div>
                    </div>
                    <div className="guest-done-row">
                      <button className="guest-done-btn" onClick={() => setIsGuestDropdownOpen(false)}>DONE</button>
                    </div>
                  </div>
                )}
              </fieldset>
              {/* Search button centered in a flex wrapper */}
              <div className="search-button-wrapper">
                <button className="search-button" onClick={handleSearch}>
                  SEARCH
                </button>
              </div>
            </div>
          ) : (
            <div className="hotel-listings-bar">
              <div className="hotel-listings-bar-fields">
                <div className="hotel-listings-bar-field">
                  <label>AREA, LANDMARK OR PROPERTY NAME</label>
                  <input value={location} readOnly />
                </div>
                <div className="hotel-listings-bar-field">
                  <label>CHECKIN</label>
                  <input value={formatDate(checkIn)} readOnly style={{fontWeight:700}} />
                </div>
                <div className="hotel-listings-bar-field">
                  <label>CHECKOUT</label>
                  <input value={formatDate(checkOut)} readOnly style={{fontWeight:700}} />
                </div>
                <div className="hotel-listings-bar-field">
                  <label>GUEST & ROOMS</label>
                  <input value={`${guestInfo.adults} Adults . ${guestInfo.children} Children . ${guestInfo.rooms} Room`} readOnly style={{fontWeight:700}} />
                </div>
              </div>
              <button className="update-search-btn">Update Search</button>
            </div>
          )}
        </div>
      </div>
      {/* Render hotel details OUTSIDE the search container */}
      {isSearchMode && (
        <HotelDetails
          hotels={hotels}
          loading={loading}
          location={location}
          checkIn={checkIn}
          checkOut={checkOut}
          guestInfo={guestInfo}
          formatDate={formatDate}
        />
      )}
    </>
  );
};

export default Search; 