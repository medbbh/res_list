import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ReportForm from '../components/Forms/ReportForm';

const Report = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Please log in to submit a report</h2>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Report a Species Sighting</h2>
      <ReportForm />
    </div>
  );
};

export default Report;