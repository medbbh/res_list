import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import Map from '../components/Map';

const SpeciesDetail = () => {
  const [species, setSpecies] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    api.get(`/species/${id}/`).then(response => {
      setSpecies(response.data);
    });
  }, [id]);

  if (!species) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{species.name}</h2>
      <img src={species.photo} alt={species.name} className="w-full h-64 object-cover rounded-lg mb-4" />
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-xl text-gray-600 mb-2">{species.scientific_name}</p>
        <p className="bg-red-100 text-red-800 px-3 py-1 rounded-full inline-block mb-4">
          {species.status}
        </p>
        <h3 className="text-xl font-semibold mb-2">Habitat</h3>
        <p className="text-gray-700 mb-4">{species.habitat}</p>
        <h3 className="text-xl font-semibold mb-2">Last Sighted</h3>
        <p className="text-gray-700 mb-4">{new Date(species.last_sighted).toLocaleString()}</p>
        <h3 className="text-xl font-semibold mb-2">Location</h3>
        <Map 
          latitude={species.location.coordinates[1]}
          longitude={species.location.coordinates[0]}
          popupContent={`Last sighted: ${species.name}`}
        />
      </div>
    </div>
  );
};

export default SpeciesDetail;