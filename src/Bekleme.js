import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Bekleme() {
  const navigate = useNavigate();

  useEffect(() => {
    // Bekleme sayfasına girildiğinde tarayıcı geçmişine fake state ekle
    window.history.pushState({ page: 'bekleme' }, '', window.location.href);

    const handlePopState = () => {
      navigate('/giris', { replace: true });
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  return (
    <div className="panel">
      <div id="beklemePanel" className="panel-body">
        <h1 className="panel-title light">
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
