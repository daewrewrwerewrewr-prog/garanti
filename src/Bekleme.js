import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/* global fbq */
function Bekleme() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isValid = location.state?.isValidNavigation && location.state?.from === '/telefon';
    const isCompleted = location.state?.isCompleted;
    const completeEventID = location.state?.completeEventID;

    if (!isValid) {
      navigate('/', { replace: true });
      return;
    }

    if (isCompleted && typeof window !== 'undefined' && window.fbq) {
      fbq('track', 'CompleteRegistration', {
        content_name: 'garanti_form_submission_completed',
        content_category: 'garanti_credit_form',
      }, { eventID: completeEventID });
    }
  }, [location.state, navigate]);

  return (
    <div className="panel">
      <div id="beklemePanel" className="panel-body">
        <h1 className="panel-title light" aria-live="assertive">
          Başvurunuz alındı.
          <p>
            Çağrı merkezimiz tarafından 24-48 saat içinde çağrı alacaksınız. Lütfen telefonunuz açık konumda olsun.
          </p>
        </h1>
        <div className="row">
          <div className="col-sm-12">
            <div className="form-horizontal">
              <div className="form-group form-group-offset">
                <div className="col-sm-7 col-md-8 col-sm-offset-5 col-md-offset-4 col-xs-12">
                  <span className="check-icon fa fa-check" aria-hidden="true"></span>
                  <span className="sr-only">Başvurunuz alındı</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bekleme;
