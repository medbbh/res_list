import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to EcoWatch Moscow</h1>
      <p className="text-xl mb-8">Help us protect and monitor endangered species in Moscow's parks.</p>
      <div className="space-x-4">
        <Link to="/species" className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg">
          View Species
        </Link>
        <Link to="/report" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg">
          Report Sighting
        </Link>
      </div>
    </div>
  );
};

export default Home;