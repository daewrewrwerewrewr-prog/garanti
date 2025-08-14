import React from 'react';

function Footer() {
  return (
    <div id="footer" role="contentinfo" className="no-print footer">
      <div className="container">
        <div className="row patch-footer">
          <div className="col-md-8">
            <table className="table">
              <tbody>
                <tr>
                  <td>
                    <button type="button" className="btn-link">
                      Bize Ulaşın
                    </button>
                  </td>
                  <td>
                    <button type="button" className="btn-link">
                      Güvenlik Bilgileri
                    </button>
                  </td>
                  <td>
                    <span className="language">Language:</span>
                    <button type="button" className="btn-link">
                      English
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-8 col-xs-8">
            <table className="table">
              <tbody>
                <tr>
                  <td>Copyright © 2025 T.Garanti Bankası A.Ş.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
