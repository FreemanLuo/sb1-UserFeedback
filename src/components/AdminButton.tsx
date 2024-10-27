import React from 'react';
import { useNavigate } from 'react-router-dom';

export function AdminButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/admin')}
      className="fixed top-4 right-4 px-4 py-2 bg-gray-600 bg-opacity-50 text-white rounded hover:bg-opacity-75 transition-all"
    >
      Admin Login
    </button>
  );
}