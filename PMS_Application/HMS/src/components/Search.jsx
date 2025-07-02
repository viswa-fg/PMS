import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';

const POPULAR_CITIES = [
  'Delhi',
  'Mumbai',
  'Bangalore',
  'Hyderabad',
];

const LocationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 8 }}>
    <path d="M12 2C7.03 2 3 6.03 3 11c0 5.25 7.11 10.39 8.09 11.09.34.25.82.25 1.16 0C13.89 21.39 21 16.25 21 11c0-4.97-4.03-9-9-9zm0 17.88C9.14 17.1 5 13.61 5 11c0-3.87 3.13-7 7-7s7 3.13 7 7c0 2.61-4.14 6.1-7 8.88z" fill="#888" />
    <circle cx="12" cy="11" r="3" fill="#888" />
  </svg>
);

const Search = () => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
  const [guestInfo, setGuestInfo] = useState({ rooms: 1, adults: 2, children: 0 });
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);
  const [showPopular, setShowPopular] = useState(false);
  const locationInputRef = useRef(null);
  const popularRef = useRef(null);
  const guestDropdownRef = useRef(null);
  const iframeRef = useRef(null);
  const [hotels, setHotels] = useState([]);
  const [showIframe, setShowIframe] = useState(false); // controls iframe visibility
  const [showSummaryBar, setShowSummaryBar] = useState(false); // controls summary bar

  const handleSearch = async () => {
    try {
      setTimeout(() => {
        if (iframeRef.current?.contentWindow) {
          iframeRef.current.contentWindow.postMessage(location, "http:// 65.0.127.39");
        }
      }, 500);
      setShowIframe(true);
      setShowSummaryBar(true); // Show summary bar after search
    } catch (error) {
      console.error("Failed to fetch hotels:", error);
    }
  };

  const handleUpdateSearch = () => {
    setShowSummaryBar(false);
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear().toString().substr(-2);
    return `${day} ${month} '${year}`;
  };

  const getDayName = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const handleGuestChange = (type, operation) => {
    setGuestInfo(prev => ({
      ...prev,
      [type]: operation === 'add' ? prev[type] + 1 : Math.max(1, prev[type] - 1)
    }));
  };

  // Handle click outside to close popular dropdown
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

  // Handle click outside to close guest dropdown
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

  return (
    <div className={`search-container${showSummaryBar ? ' summary-only' : ''}`}>
      {showSummaryBar ? (
        <div className="search-summary-bar">
          <div className="summary-field">
            <div className="summary-label">AREA, LANDMARK OR PROPERTY NAME</div>
            <div className="summary-value">{location}</div>
          </div>
          <div className="summary-field">
            <div className="summary-label">CHECKIN</div>
            <div className="summary-value">{formatDate(checkIn)}</div>
          </div>
          <div className="summary-field">
            <div className="summary-label">CHECKOUT</div>
            <div className="summary-value">{formatDate(checkOut)}</div>
          </div>
          <div className="summary-field">
            <div className="summary-label">GUEST & ROOMS</div>
            <div className="summary-value">
              {guestInfo.adults} Adults . {guestInfo.children} Children . {guestInfo.rooms} Room
            </div>
          </div>
          <button className="update-search-btn" onClick={handleUpdateSearch}>
            Update Search
          </button>
        </div>
      ) : (
        <>
          <h1 className="search-title">Book Hotels and Homestays</h1>
          <div className="search-form">
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
            <fieldset className="search-input-group">
              <legend>Check-in</legend>
              <DatePicker
                selected={checkIn}
                onChange={date => setCheckIn(date)}
                minDate={(() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; })()}
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
            <fieldset className="search-input-group">
              <legend>Guests & Rooms</legend>
              <div
                className="guest-input"
                onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
              >
                <span>{guestInfo.adults} Adults | {guestInfo.rooms} Room{guestInfo.rooms > 1 ? 's' : ''}{guestInfo.children > 0 ? ` | ${guestInfo.children} Child${guestInfo.children > 1 ? 'ren' : ''}` : ''}</span>
              </div>
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
          </div>
          <button className="search-button" onClick={handleSearch}>
            SEARCH
          </button>
        </>
      )}
      {showIframe && (
        <iframe
          ref={iframeRef}
          src="http:// 65.0.127.39:3001"
          width="100%"
          height="600"
          style={{ border: '1px solid #ccc', marginTop: '20px' }}
          title="Hotel Module"
        />
      )}
    </div>
  );
};

export default Search; 