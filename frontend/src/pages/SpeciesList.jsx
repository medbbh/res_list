import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const SpeciesList = () => {
  const [species, setSpecies] = useState([]);

  useEffect(() => {
    api.get('/species/').then(response => {
      setSpecies(response.data);
    });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Endangered Species</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {species.map(s => (
          <Link key={s.id} to={`/species/${s.id}`} className="block">
            <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img src={s.photo} alt={s.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{s.name}</h3>
                <p className="text-gray-600">{s.scientific_name}</p>
                <p className="mt-2 bg-red-100 text-red-800 px-2 py-1 rounded-full inline-block">
                  {s.status}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpeciesList;