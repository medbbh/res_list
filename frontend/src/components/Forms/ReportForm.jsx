import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Add custom Leaflet marker icon to fix marker issue in React Leaflet
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const ReportForm = () => {
  const [species, setSpecies] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [location, setLocation] = useState({ lat: 55.7558, lng: 37.6176 }); // Default to Moscow
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [environmentalConditions, setEnvironmentalConditions] = useState('');
  const navigateTo = useNavigate();

  useEffect(() => {
    api.get('/species/').then(response => {
      if (Array.isArray(response.data)) {
        setSpecies(response.data);
      }
    }).catch(error => {
      console.error('Error fetching species:', error);
    });
  }, []);

  // Function to get the user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setUseCurrentLocation(true);
        },
        (error) => {
          console.error('Error fetching current location:', error);
          alert('Unable to retrieve your location. Please allow location access.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  // Map click handler to let users manually select a location
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setLocation({
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        });
        setUseCurrentLocation(false);
      },
    });

    return location.lat && location.lng ? (
      <Marker position={[location.lat, location.lng]}></Marker>
    ) : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('species', selectedSpecies);
    formData.append('location', JSON.stringify({ lat: location.lat, lng: location.lng }));
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
          {species.length > 0 ? (
            species.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))
          ) : (
            <option disabled>No species available</option>
          )}
        </select>
      </div>

      <div>
        <label htmlFor="location" className="block mb-1">Location</label>
        <button
          type="button"
          className="bg-blue-500 text-white py-2 px-4 rounded mb-2"
          onClick={getCurrentLocation}
        >
          Use Current Location
        </button>
        <p>Or click on the map to select a location</p>
        <MapContainer
          center={[55.7558, 37.6176]} // Center on Moscow
          zoom={13}
          style={{ height: '300px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker />
        </MapContainer>
        {location.lat && location.lng && (
          <p>Selected Location: Latitude: {location.lat}, Longitude: {location.lng}</p>
        )}
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
