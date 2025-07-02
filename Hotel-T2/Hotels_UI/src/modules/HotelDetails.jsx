// HotelDetails.jsx - Displays hotel details cards
import React from 'react';
import styles from './HotelDetails.module.css';

// Helper function to format dates for display
const defaultFormatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleString('default', { month: 'short' });
  const year = d.getFullYear().toString().substr(-2);
  return `${day} ${month} '${year}`;
};

/**
 * HotelDetails component
 * Props:
 *   - hotels: array of hotel objects (required)
 *   - loading: boolean (optional)
 *   - location, checkIn, checkOut, guestInfo, formatDate: optional for future use
 */
const HotelDetails = ({
  hotels = [],
  loading = false,
  location = '',
  checkIn = new Date(),
  checkOut = new Date(),
  guestInfo = { adults: 0, children: 0, rooms: 0 },
  formatDate
}) => {
  // Use provided formatDate or fallback to default
  const safeFormatDate = typeof formatDate === 'function' ? formatDate : defaultFormatDate;

  if (loading) {
    return <div className={styles.hotelListingsContent}>Loading hotels...</div>;
  }

  if (!hotels.length) {
    return <div className={styles.hotelListingsContent}>No hotels found.</div>;
  }
const handleCart = (hotel) => {
  const bookingData = {
    name: hotel.name,
    location: hotel.location,
    pricePerDay: hotel.pricePerDay,
    image: hotel.image,
    rating: hotel.rating,
  };

  // Post message to other app (e.g., running on  65.0.127.39:3000)
  window.parent.postMessage(bookingData, "https://65.0.127.39:3000");
};


  return (
    <div className={styles.hotelDetailsSection}>
      <div className={styles.sortBar}>
        <span style={{ fontWeight: 700, marginRight: 8 }}>Sort By:</span>
        <button className={styles.sortBtn + ' ' + styles.active}>Most Popular</button>
        <button className={styles.sortBtn}>Price - Low to High</button>
        <button className={styles.sortBtn}>Price - High to Low</button>
        <button className={styles.sortBtn}>Goibibo Reviews - Highest First</button>
        <input
          className={styles.searchBar}
          placeholder="Search Location or Property Name"
          style={{ marginLeft: 'auto' }}
        />
      </div>
      <div style={{ display: 'flex', gap: '2rem' }}>
        {/* Sidebar with filter options */}
        <div className={styles.hotelListingsSidebar}>
          <div className={styles.sidebarTitle}>
            FILTERS
            <span style={{ color: '#1976d2', fontWeight: 500, cursor: 'pointer', fontSize: '0.95rem' }}>CLEAR</span>
          </div>
          <hr className={styles.divider} />
          <div className={styles.filterGroup}>
            <div className={styles.filterGroupHeader}>▼ Previously Used Filters</div>
            <div className={styles.filterCheckbox}><input type="checkbox" /> goStays</div>
            <div className={styles.filterCheckbox}><input type="checkbox" /> Book @ ₹0</div>
          </div>
          <div className={styles.filterGroup}>
            <div className={styles.filterGroupHeader}>▼ Popular filters</div>
            <div className={styles.filterCheckbox}><input type="checkbox" /> goStays <span className={styles.filterCount}>(51)</span></div>
            <div className={styles.filterCheckbox}><input type="checkbox" /> Book @ ₹0 <span className={styles.filterCount}>(1195)</span></div>
            <div className={styles.filterCheckbox}><input type="checkbox" /> Flexible Check In <span className={styles.filterCount}>(22)</span></div>
            <div className={styles.filterCheckbox}><input type="checkbox" /> Daily Steal Deal <span className={styles.filterCount}>(23)</span></div>
            <div className={styles.filterCheckbox}><input type="checkbox" /> Early Bird Deal <span className={styles.filterCount}>(57)</span></div>
            <div className={styles.filterCheckbox}><input type="checkbox" /> Couple Friendly <span className={styles.filterCount}>(830)</span></div>
            <div className={styles.filterCheckbox}><input type="checkbox" /> Free Cancellation <span className={styles.filterCount}>(1201)</span></div>
            <div className={styles.filterCheckbox}><input type="checkbox" /> Free Breakfast <span className={styles.filterCount}>(151)</span></div>
            <div className={styles.filterCheckbox}><input type="checkbox" /> Pay At Hotel <span className={styles.filterCount}>(5)</span></div>
          </div>
        </div>
        {/* Main content area for hotel cards */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className={styles.hotelListingsTitle}>Most Booked by Travellers like you</div>
          {hotels.map(hotel => {
            const name = hotel.name || 'Taj Santacruz, Mumbai';
            const location = hotel.location || 'Vile Parle | 3 minutes walk to T1 - Chhatrapati Shivaji International Airport';
            const locationUrl = hotel.locationUrl || '#';
            const rating = hotel.rating;
            const ratingsCount = hotel.ratingsCount !== undefined ? hotel.ratingsCount : 1298;
            const pricePerDay = hotel.pricePerDay;
            const taxes = hotel.taxes !== undefined ? hotel.taxes : 5100;
            const image = hotel.image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80';
            const thumbnails = hotel.thumbnails || [
              image,
              'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80',
              'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
              'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
            ];
            const tags = hotel.tags || ['Spa', 'Swimming Pool'];
            const features = hotel.features || [
              'Free Cancellation',
              'Book @ ₹0 available',
              'Breakfast available at extra charges',
              'Get a Taj Gift Card worth at least INR 500 for F&B & Spa',
            ];
            const packageName = hotel.package || 'ELITE PACKAGE';
            const packageDesc = hotel.packageDesc || 'Enjoy exclusive benefits at a discounted price in an Elite Package deal';
            const loginText = hotel.loginText || 'Login now & save more';
            return (
              <div className={styles.hotelCard} key={hotel.id || name}>
                <div className={styles.hotelCardImgCol}>
                  <img src={image} alt={name} className={styles.hotelCardImg} />
                  <div className={styles.hotelCardThumbs}>
                    {thumbnails.slice(0, 3).map((thumb, idx) => (
                      <img src={thumb} alt={`thumb${idx+1}`} className={styles.hotelCardThumb} key={idx} />
                    ))}
                    <button className={styles.hotelCardThumbViewAll}>VIEW ALL</button>
                  </div>
                </div>
                <div className={styles.hotelCardMainCol}>
                  <div className={styles.hotelCardHeader}>
                    <span className={styles.hotelCardStar}>5★ · Hotel</span>
                    <span className={styles.hotelCardRatings}>{ratingsCount} Ratings</span>
                    {rating !== undefined && (
                      <span className={styles.hotelCardRatingBadge}>{rating}/5</span>
                    )}
                  </div>
                  <div className={styles.hotelCardTitle}>{name}</div>
                  <div className={styles.hotelCardLocation}>
                    <a href={locationUrl}>{location}</a>
                  </div>
                  <div className={styles.hotelCardTags}>
                    {tags.map(tag => <span className={styles.hotelCardTag} key={tag}>{tag}</span>)}
                    <span className={styles.hotelCardTagMore}>& more</span>
                  </div>
                  <ul className={styles.hotelCardFeatures}>
                    {features.map((f, i) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <div className={styles.hotelCardPackage}>
                    <span className={styles.hotelCardPackageBadge}>{packageName}</span>
                    <span className={styles.hotelCardPackageDesc}>{packageDesc}</span>
                  </div>
                </div>
                <div className={styles.hotelCardPriceCol}>
                  {pricePerDay !== undefined && (
                    <div className={styles.hotelCardPrice}>₹{pricePerDay.toLocaleString()}</div>
                  )}
                  <div className={styles.hotelCardTaxes}>+₹{taxes.toLocaleString()} taxes & fees<br />for 2 rooms per night</div>
                  <div className={styles.hotelCardLoginLink}>{loginText}</div>
                  <button className={styles.hotelCardBookBtn} onClick={()=>handleCart(hotel)}>Book Now</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HotelDetails; 