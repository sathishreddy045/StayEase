import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RoomResult from "../common/RoomResult";
import RoomSearch from "../common/RoomSearch";

const HomePage = () => {
  const [roomSearchResults, setRoomSearchResults] = useState([]);
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const accommodations = [
    {
      name: 'Single Room',
      description: 'Perfect for solo travelers seeking comfort and privacy.',
      amenities: ['Balcony'],
      image: './assets/images/single.webp'
    },
    {
      name: 'Double Room',
      description: 'Ideal for couples or friends with modern comforts.',
      amenities: ['City View', 'Queen Bed'],
      image: './assets/images/double.jpg'
    },
    {
      name: 'Suite',
      description: 'Luxury suites with top-tier amenities and space.',
      amenities: ['Jacuzzi', 'Balcony'],
      image: './assets/images/suite.jpg'
    },
    {
      name: 'Hostel',
      description: 'Budget-friendly stay for groups and solo travelers.',
      amenities: ['Shared Kitchen', 'Bunk Beds'],
      image: './assets/images/hostel.jpg'
    },
    {
      name: 'Presidential Suite',
      description: 'Experience royalty with our ultra-luxurious suite.',
      amenities: ['Private Pool', 'Lounge Area'],
      image: './assets/images/presidential.jpg'
    },
    {
      name: 'King Room',
      description: 'Spacious room with a majestic king-size bed.',
      amenities: ['Mini Bar', 'City View'],
      image: './assets/images/king.webp'
    },
    {
      name: 'Studio',
      description: 'Compact yet complete living for short stays.',
      amenities: ['Kitchenette', 'Work Desk'],
      image: './assets/images/studio.jpeg'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % accommodations.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [accommodations.length]);

  const handleSearchResult = (results) => {
    setRoomSearchResults(results);
  };

  const handleBookNowClick = () => {
    navigate("/rooms");
  };

  const nextSlide = () => setCurrent((current + 1) % accommodations.length);
  const prevSlide = () => setCurrent((current - 1 + accommodations.length) % accommodations.length);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [requirements, setRequirements] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const isFormValid = name && email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('submitting');

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (name && email) {
      setSubmissionStatus('success');
      setName('');
      setPhone('');
      setEmail('');
      setRequirements('');
    } else {
      setSubmissionStatus('error');
    }
  };

  useEffect(() => {
    if (submissionStatus === 'success' || submissionStatus === 'error') {
      const timer = setTimeout(() => setSubmissionStatus(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [submissionStatus]);
  
  return (
    <div className="home">
      {/* HEADER / BANNER ROOM SECTION */}
      <section>
        <header className="header-banner">
          <img src="./assets/images/home1.jpg" alt="StayEase" className="header-image" />
          <div className="overlay"></div>
          <div className="animated-texts overlay-content">
            <h1>
              Find Your Perfect Stay, <span style={{ color: '#FF6A30' }}>Effortlessly.</span>
            </h1><br />
            <h3>
              Step into a haven of comfort, care, and tranquility. Browse curated stays, <br />
              experience top hospitality, and book with ease.
            </h3>
            <button className="book-now" onClick={handleBookNowClick}>Book Now &gt;</button>
          </div>
        </header>
      </section>

      {/* SEARCH/FIND AVAILABLE ROOM SECTION */}
      <RoomSearch handleSearchResult={handleSearchResult} />
      <RoomResult roomSearchResults={roomSearchResults} />
      
      {/* ABOUT SECTION */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-image">
            <img src="./assets/images/hotel_home.jpeg" alt="StayEase Interior" />
          </div>
          <div className="about-content">
            <h2 className="about-title">About StayEase</h2>
            <p className="about-description">
              At <strong>StayEase</strong>, we redefine modern living with
              premium coliving spaces, luxury PG accommodations, and fully furnished homestays in prime locations across Hyderabad.
              Whether you're a working professional, student, or traveler, our thoughtfully designed spaces blend comfort, style, and a sense of community to create truly unforgettable experiences.
            </p>
            <button className="about-btn" onClick={handleBookNowClick}>
              Explore Rooms &gt;
            </button>
          </div>
        </div>
      </section>
      
      {/* ACCOMODATION SECTION */}
      <section className="accommodation-section">
        <div className="accommodation-container">
          <h2 className="section-title">Our Accommodations</h2>
          <div className="carousel">
            <button className="nav-button left" onClick={prevSlide}>&#10094;</button>

            <div className="carousel-card">
              <img src={accommodations[current].image} alt={accommodations[current].name} className="carousel-image" />
              <div className="carousel-text">
                <h3 className="room-type">{accommodations[current].name}</h3>
                <p className="room-description">{accommodations[current].description}</p>
                <div className="amenities">
                  {accommodations[current].amenities.map((item, idx) => (
                    <span className="amenity" key={idx}>{item}</span>
                  ))}
                </div>
              </div>
            </div>

            <button className="nav-button right" onClick={nextSlide}>&#10095;</button>
          </div>
        </div>
      </section>

      <h2 className="home-services">Services at <span className="phegon-color">StayEase</span></h2>

      {/* SERVICES SECTION */}
      <section className="service-section">
        <div className="service-card">
          <img src="./assets/images/ac.png" alt="Air Conditioning" />
          <div className="service-details">
            <h3 className="service-title">Air Conditioning</h3>
            <p className="service-description">Stay cool and comfortable throughout your stay with our individually controlled in-room air conditioning.</p>
          </div>
        </div>
        <div className="service-card">
          <img src="./assets/images/mini-bar.png" alt="Mini Bar" />
          <div className="service-details">
            <h3 className="service-title">Mini Bar</h3>
            <p className="service-description">Enjoy a convenient selection of beverages and snacks stocked in your room's mini bar with no additional cost.</p>
          </div>
        </div>
        <div className="service-card">
          <img src="./assets/images/parking.png" alt="Parking" />
          <div className="service-details">
            <h3 className="service-title">Parking</h3>
            <p className="service-description">We offer on-site parking for your convenience . Please inquire about valet parking options if available.</p>
          </div>
        </div>
        <div className="service-card">
          <img src="./assets/images/wifi.png" alt="WiFi" />
          <div className="service-details">
            <h3 className="service-title">WiFi</h3>
            <p className="service-description">Stay connected throughout your stay with complimentary high-speed Wi-Fi access available in all guest rooms and public areas.</p>
          </div>
        </div>
        <div className="service-card">
          <img src="./assets/images/cctv.png" alt="cctv" />
          <div className="service-details">
            <h3 className="service-title">CCTV Surveillance</h3>
            <p className="service-description">Feel secure with 24/7 CCTV surveillance in all common areas, ensuring a safe and worry-free stay.</p>
          </div>
        </div>
      <div className="service-card">
          <img src="./assets/images/washingmachine.png" alt="washing-machine" />
          <div className="service-details">
            <h3 className="service-title">Washing Machine</h3>
            <p className="service-description">Enjoy the convenience of on-site washing machines, available to keep your clothes fresh throughout your stay.</p>
          </div>
        </div>
        <div className="service-card">
          <img src="./assets/images/fullyfurnished.jpg" alt="fully-furnished" />
          <div className="service-details">
            <h3 className="service-title">Fully Furnished</h3>
            <p className="service-description">Relax in comfort with fully furnished rooms designed to meet all your living needs during your stay.</p>
          </div>
        </div>
        <div className="service-card">
          <img src="./assets/images/ott.png" alt="ott-subscription" />
          <div className="service-details">
            <h3 className="service-title">OTT Subscription</h3>
            <p className="service-description">Unwind with complimentary OTT subscriptions, bringing your favorite movies and shows right to your room.</p>
          </div>
        </div>
      </section>

      {/* ENQUIRY SECTION */}
      <section className="enquiry-section">
    <div className="enquiry-container">
        <div
            className="left-content"
            style={{
                backgroundImage: "url('./assets/images/bg.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: '600px', 
                position: 'relative', 
            }}
        >
            <div className="right-form">
                <h2>Connect with <span style={{ color: "#007F86" }}>StayEase</span></h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            aria-label="Full Name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            pattern="[0-9]{10}"
                            aria-label="Phone Number"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            aria-label="Email Address"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="requirements">Your Requirements</label>
                        <textarea
                            id="requirements"
                            value={requirements}
                            onChange={(e) => setRequirements(e.target.value)}
                            rows="5"
                            aria-label="Additional Requirements"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="submit-button"
                        disabled={submissionStatus === 'submitting' || !isFormValid}
                    >
                        {submissionStatus === 'submitting' ? 'Submitting...' : 'Submit'}
                    </button>

                    {submissionStatus === 'success' && (
                        <p className="success-message">Thank you for your enquiry!</p>
                    )}
                    {submissionStatus === 'error' && (
                        <p className="error-message">Something went wrong. Please try again.</p>
                    )}
                </form>
            </div>
        </div>
    </div>
</section>
      {/* CONTACT SECTION */}
<section className="contact-us-section">
      <div className="contact-us">
        <h2 className="contact">Contact Us</h2>
        <div className="contact-details">
          <div className="contact-item">
            <h3>Email</h3>
            <p><a href="mailto:your-email@gmail.com">sathishreddy045@gmail.com</a></p>
            <p><a href="mailto:your-email@gmail.com">stayeasehotels@gmail.com</a></p>
          </div>
          <div className="contact-item">
            <h3>Phone</h3>
            <p>(+91) 9948312963</p>
            <p>(+91) 9934779028</p>
          </div>
          <div className="contact-item">
            <h3>Address</h3>
            <p>StayEase Hotels <br />Plot No. 58, Hitech City Road,
Near Cyber Towers, Madhapur,
Hyderabad - 500081</p>
          </div>
        </div>

        <div className="social-media">
          <h3 className="contact">Follow Us</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="./assets/images/facebook.webp" alt="Facebook" className="social-icon" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="./assets/images/instagram.webp" alt="Instagram" className="social-icon" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <img src="./assets/images/x.png" alt="Twitter" className="social-icon" />
            </a>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default HomePage;