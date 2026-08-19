import React from "react";
import appliancePhoto from "../assets/hero-appliance-photo.jpg";

export default function MobileStoreMockup() {
  return (
    <div className="hero-phone" aria-hidden="true">
      <div className="phone-frame">
        <div className="phone-speaker" />
        <div className="phone-screen">
          <div className="phone-status">
            <span>9:41</span>
            <span>● ● ▰</span>
          </div>

          <div className="phone-brand">
            <b>KPK</b>
            <span>ELECTRONICS</span>
            <i>♡</i>
          </div>

          <div className="phone-hero-copy">
            <small>SMARTER LIVING</small>
            <strong>Premium<br />appliances.</strong>
          </div>

          <div className="phone-photo-wrap">
            <img
              src={appliancePhoto}
              alt="Premium home appliances"
              className="phone-appliance-photo"
            />
            <div className="phone-photo-label">
              <span>CURATED FOR HOME</span>
              <b>Smart living</b>
            </div>
          </div>

          <div className="phone-chips">
            <span>Cooling</span>
            <span>Kitchen</span>
            <span>TVs</span>
          </div>

          <div className="phone-nav">
            <span>⌂</span>
            <span>⌕</span>
            <span>♡</span>
            <span>♙</span>
          </div>
        </div>
      </div>
      <div className="phone-glow" />
    </div>
  );
}
