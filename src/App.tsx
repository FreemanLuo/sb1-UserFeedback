import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { SubmissionForm } from './components/SubmissionForm';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminButton } from './components/AdminButton';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <AdminButton />
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<SubmissionForm />} />
          <Route 
            path="/admin" 
            element={
              isAuthenticated ? (
                <AdminDashboard />
              ) : (
                <AdminLogin onLogin={() => setIsAuthenticated(true)} />
              )
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;