import React from 'react';
import './DoctorList.css';

const DoctorList = ({ doctors }) => {
  if (doctors.length === 0) {
    return <div className="no-doctors">No doctors found.</div>;
  }

  return (
    <div className="doctor-list">
      {doctors.map(doctor => (
        <div key={doctor.id} className="doctor-card">
          <div className="doctor-profile">
            <img src={doctor.profilePic} alt={doctor.name} />
            <div className="doctor-info">
              <h3>{doctor.name}</h3>
              <div className="doctor-details">
                {doctor.specialties.join(', ')}
              </div>
              <div className="doctor-details">
                {doctor.experience} years experience | {doctor.clinic}
              </div>
              <div className="doctor-details">
                📍 {doctor.location}
              </div>
              <div className="doctor-consultation-modes">
                {doctor.consultationModes.map(mode => (
                  <span key={mode} className="consultation-mode">
                    {mode}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="doctor-details">
              ₹{doctor.fees} Consultation Fee
            </div>
            <button className="book-appointment">Book Appointment</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorList;