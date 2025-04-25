import React, { useState } from 'react';
import './Header.css';

const Header = ({ doctors, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearchInput = (value) => {
    setSearchTerm(value);
    
    if (value.length > 1) {
      const matches = doctors
        .filter(doctor => 
          doctor.name.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 3);
      
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (doctor) => {
    setSearchTerm(doctor.name);
    onSearch(doctor.name);
    setSuggestions([]);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
    setSuggestions([]);
  };

  return (
    <div className="header">
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search Doctors"
          value={searchTerm}
          onChange={(e) => handleSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className="search-button" onClick={handleSearch}>
          🔍
        </button>
        
        {suggestions.length > 0 && (
          <div className="suggestions-dropdown">
            {suggestions.map(doctor => (
              <div 
                key={doctor.id}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(doctor)}
              >
                <img src={doctor.profilePic} alt={doctor.name} />
                <div>
                  <div className="suggestion-name">{doctor.name}</div>
                  <div className="suggestion-specialty">
                    {doctor.specialties[0]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;