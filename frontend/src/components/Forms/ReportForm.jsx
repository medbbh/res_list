import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const ReportForm = () => {
  const [species, setSpecies] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [location, setLocation] = useState('');
  const [photo, setPhoto] = useState(null);
  const [environmentalConditions, setEnvironmentalConditions] = useState('');
  const navigateTo = useNavigate();

  useEffect(() => {
    api.get('/species/').then(response => {
      setSpecies(response.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('species', selectedSpecies);
    formData.append('location', location);
    if (photo) {
      formData.append('photo', photo);
    }
    formData.append('environmental_conditions', JSON.stringify({ description: environmentalConditions }));

    try {
      await api.post('/reports/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Report submitted successfully!');
      navigateTo('/');
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Failed to submit report. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="species" className="block mb-1">Species</label>
        <select
          id="species"
          value={selectedSpecies}
          onChange={(e) => setSelectedSpecies(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Select a species</option>
          {species.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="location" className="block mb-1">Location</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
          placeholder="e.g., Latitude, Longitude or Park Name"
        />
      </div>
      <div>
        <label htmlFor="photo" className="block mb-1">Photo (optional)</label>
        <input
          type="file"
          id="photo"
          onChange={(e) => setPhoto(e.target.files[0])}
          accept="image/*"
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="environmentalConditions" className="block mb-1">Environmental Conditions</label>
        <textarea
          id="environmentalConditions"
          value={environmentalConditions}
          onChange={(e) => setEnvironmentalConditions(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          rows="4"
          placeholder="Describe the environmental conditions (e.g., weather, surrounding vegetation)"
        ></textarea>
      </div>
      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
        Submit Report
      </button>
    </form>
  );
};

export default ReportForm;