import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';
import LoginForm from './LoginForm';
import Telefon from './Telefon';
import Bekleme from './Bekleme';
import HelpSection from './HelpSection';
import Footer from './Footer';
import { AuthProvider, useAuth } from './AuthContext';
import './App.css';

function ProtectedRoute({ children, isAllowed }) {
  return isAllowed ? children : <Navigate to="/" />;
}

function AppRoutes() {
  const { state } = useAuth(); // ✅ Artık guard değerleri context'ten
  const { isAuthenticated, isPhoneVerified } = state;

  return (
    <div id="page" className="page">
      <Header />
      <div id="content" className="container" role="main">
        <div className="wizard stage:()">
          <div className="main">
            <div className="row">
              <div className="col-md-9">
                <Routes>
                  <Route path="/" element={<LoginForm />} />
                  <Route
                    path="/telefon"
                    element={
                      <ProtectedRoute isAllowed={isAuthenticated}>
                        <Telefon />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/bekleme"
                    element={
                      <ProtectedRoute isAllowed={isAuthenticated && isPhoneVerified}>
                        <Bekleme />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </div>
              <div className="col-md-3">
                <HelpSection />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router basename="/">
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
