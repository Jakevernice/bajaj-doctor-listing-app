import React, { useState, useEffect } from 'react';
import { fetchDoctors } from './services/doctorService';
import Header from './components/Header';
import FilterPanel from './components/FilterPanel';
import DoctorList from './components/DoctorList';
import './App.css';

function App() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [filters, setFilters] = useState({
    searchTerm: '',
    consultationType: '',
    specialties: [],
    sortBy: ''
  });

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const fetchedDoctors = await fetchDoctors();
        setDoctors(fetchedDoctors);
        setFilteredDoctors(fetchedDoctors);
      } catch (error) {
        console.error('Error loading doctors:', error);
      }
    };
    loadDoctors();
  }, []);

  useEffect(() => {
    let result = [...doctors];

    // Search filter
    if (filters.searchTerm) {
      result = result.filter(doctor => 
        doctor.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    // Consultation type filter
    if (filters.consultationType) {
      result = result.filter(doctor => 
        doctor.consultationModes.includes(filters.consultationType)
      );
    }

    // Specialties filter
    if (filters.specialties.length > 0) {
      result = result.filter(doctor => 
        filters.specialties.some(spec => 
          doctor.specialties.includes(spec)
        )
      );
    }

    // Sorting
    if (filters.sortBy === 'fees') {
      result.sort((a, b) => a.fees - b.fees);
    } else if (filters.sortBy === 'experience') {
      result.sort((a, b) => b.experience - a.experience);
    }

    setFilteredDoctors(result);
  }, [doctors, filters]);

  return (
    <div className="app">
      <Header 
        doctors={doctors}
        onSearch={(searchTerm) => setFilters(prev => ({ ...prev, searchTerm }))}
      />
      <div className="main-content">
        <FilterPanel 
          doctors={doctors}
          filters={filters}
          onFilterChange={setFilters}
        />
        <DoctorList doctors={filteredDoctors} />
      </div>
    </div>
  );
}

export default App;