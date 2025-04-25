import React, { useState } from 'react';
import './FilterPanel.css';

const FilterPanel = ({ doctors, filters, onFilterChange }) => {
  const [searchSpecialty, setSearchSpecialty] = useState('');

  // Extract unique specialties
  const getUniqueSpecialties = () => {
    const allSpecialties = doctors.flatMap(doctor => doctor.specialties);
    const uniqueSpecialties = [...new Set(allSpecialties)];
    
    // Filter specialties based on search input
    return uniqueSpecialties.filter(specialty => 
      specialty.toLowerCase().includes(searchSpecialty.toLowerCase())
    );
  };

  const updateFilters = (updates) => {
    onFilterChange({ ...filters, ...updates });
  };

  const CONSULTATION_TYPES = ['Video Consult', 'In Clinic', 'Both'];

  return (
    <div className="filter-panel">
      {/* Existing Sort By section */}
      <div className="filter-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Sort By</h3>
          {filters.sortBy && (
            <span 
              className="clear-all" 
              onClick={() => updateFilters({ sortBy: '' })}
            >
              Clear
            </span>
          )}
        </div>
        <label>
          <input
            type="radio"
            name="sort"
            checked={filters.sortBy === 'fees'}
            onChange={() => updateFilters({ sortBy: 'fees' })}
          />
          Price (Low-High)
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            checked={filters.sortBy === 'experience'}
            onChange={() => updateFilters({ sortBy: 'experience' })}
          />
          Experience (Most Experience first)
        </label>
      </div>

      {/* Consultation Mode section */}
      <div className="filter-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Mode of Consultation</h3>
          {filters.consultationType && (
            <span 
              className="clear-all" 
              onClick={() => updateFilters({ consultationType: '' })}
            >
              Clear
            </span>
          )}
        </div>
        {CONSULTATION_TYPES.map(type => (
          <label key={type}>
            <input
              type="radio"
              name="consultation-type"
              value={type}
              checked={filters.consultationType === type}
              onChange={() => updateFilters({ consultationType: type })}
            />
            {type}
          </label>
        ))}
      </div>

      {/* Existing Specialties section */}
      <div className="filter-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Specialties</h3>
          {filters.specialties.length > 0 && (
            <span 
              className="clear-all" 
              onClick={() => updateFilters({ specialties: [] })}
            >
              Clear All
            </span>
          )}
        </div>
        <input 
          type="text" 
          placeholder="Search specialties" 
          value={searchSpecialty}
          onChange={(e) => setSearchSpecialty(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '8px', 
            marginBottom: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
        {getUniqueSpecialties().map(specialty => (
          <label key={specialty}>
            <input
              type="checkbox"
              checked={filters.specialties.includes(specialty)}
              onChange={() => {
                const newSpecialties = filters.specialties.includes(specialty)
                  ? filters.specialties.filter(s => s !== specialty)
                  : [...filters.specialties, specialty];
                updateFilters({ specialties: newSpecialties });
              }}
            />
            {specialty}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;