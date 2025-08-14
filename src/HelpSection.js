import React, { useState } from 'react';

function HelpSection() {
  const [openSections, setOpenSections] = useState([true, false, false]);

  const toggleSection = (index) => {
    setOpenSections((prev) =>
      prev.map((isOpen, i) => (i === index ? !isOpen : isOpen))
    );
  };

  const handleToggleClick = (e, index) => {
    e.preventDefault();
    toggleSection(index);
  };

  const preventNav = (e) => {
    e.preventDefault();
  };

  return (
    <div className="additional">
      <h2 className="page-title">Yardım ve Güvenlik</h2>
      <div className="panel">
        <div className="panel-body">
          <div id="helpandsecurity" className="collapse-content" role="tablist" aria-multiselectable="true">
            
            {/* 1. Panel */}
            <div className="panel panel-collapse help-collapse">
              <div className="panel-heading" role="tab" id="heading0">
                <a
                  href="#0"
                  role="button"
                  onClick={(e) => handleToggleClick(e, 0)}
                  aria-expanded={openSections[0]}
                  aria-controls="collapse0"
                >
                  Güvenliğiniz için lütfen aşağıdaki bilgilere dikkat edin.
                  <span className="arrow">
                    <i className={openSections[0] ? "icons icons-arrow-up" : "icons icons-arrow-down"}></i>
                  </span>
                </a>
              </div>
              <div
                id="collapse0"
                className={`panel-collapse collapse ${openSections[0] ? 'in' : ''}`}
                role="tabpanel"
                aria-labelledby="heading0"
              >
                <div className="panel-body">
                  <p>Güvenli bir İnternet deneyimi ve güncel virüsler hakkında bilgi almak için lütfen tıklayın.</p>
                  <a href="#0" onClick={preventNav}>Detaylı bilgi</a>
                </div>
              </div>
            </div>

            {/* 2. Panel */}
            <div className="panel panel-collapse help-collapse">
              <div className="panel-heading" role="tab" id="heading1">
                <a
                  href="#0"
                  role="button"
                  onClick={(e) => handleToggleClick(e, 1)}
                  aria-expanded={openSections[1]}
                  aria-controls="collapse1"
                  className={openSections[1] ? '' : 'collapsed'}
                >
                  Başkası adına mı işlem yapıyorsunuz?
                  <span className="arrow">
                    <i className={openSections[1] ? "icons icons-arrow-up" : "icons icons-arrow-down"}></i>
                  </span>
                </a>
              </div>
              <div
                id="collapse1"
                className={`panel-collapse collapse ${openSections[1] ? 'in' : ''}`}
                role="tabpanel"
                aria-labelledby="heading1"
              >
                <div className="panel-body">
                  <p>Başkası adına işlem yapıyorsanız detaylı bilgi için lütfen tıklayın.</p>
                  <a href="#0" onClick={preventNav}>Detaylı bilgi</a>
                </div>
              </div>
            </div>

            {/* 3. Panel */}
            <div className="panel panel-collapse help-collapse">
              <div className="panel-heading" role="tab" id="heading2">
                <a
                  href="#0"
                  role="button"
                  onClick={(e) => handleToggleClick(e, 2)}
                  aria-expanded={openSections[2]}
                  aria-controls="collapse2"
                  className={openSections[2] ? '' : 'collapsed'}
                >
                  Tasarruf Mevduatı Güvencesi
                  <span className="arrow">
                    <i className={openSections[2] ? "icons icons-arrow-up" : "icons icons-arrow-down"}></i>
                  </span>
                </a>
              </div>
              <div
                id="collapse2"
                className={`panel-collapse collapse ${openSections[2] ? 'in' : ''}`}
                role="tabpanel"
                aria-labelledby="heading2"
              >
                <div className="panel-body">
                  <p>Tasarruf mevduatınız güvence altında. Detaylı bilgi için lütfen tıklayın.</p>
                  <a href="#0" onClick={preventNav}>Detaylı bilgi</a>
                </div>
              </div>
            </div>
          </div>

          {/* Alt link */}
          <a
            href="#0"
            onClick={preventNav}
            className="border-link helper-bottom-link"
          >
            Diğer Yardım Ve Güvenlik
          </a>
        </div>
      </div>  
    </div>
  );
}

export default HelpSection;
