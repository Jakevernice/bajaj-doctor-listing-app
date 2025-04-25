import axios from 'axios';

export const fetchDoctors = async () => {
  try {
    const response = await axios.get(process.env.REACT_APP_API_URL);
    return response.data.map(doctor => ({
      id: doctor.id,
      name: doctor.name,
      specialties: doctor.specialities.map(spec => spec.name),
      experience: parseInt(doctor.experience.replace(' Years of experience', '')),
      fees: parseInt(doctor.fees.replace('₹ ', '').trim()),
      consultationModes: getConsultationModes(doctor),
      location: doctor.clinic.address.locality,
      clinic: doctor.clinic.name,
      profilePic: doctor.photo,
      qualifications: doctor.name_initials
    }));
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};

const getConsultationModes = (doctor) => {
  const modes = [];
  if (doctor.video_consult && doctor.in_clinic) modes.push('Both');
  if (doctor.video_consult) modes.push('Video Consult');
  if (doctor.in_clinic) modes.push('In Clinic');
  return modes;
};