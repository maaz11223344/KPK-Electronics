import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, ChevronRight, ShieldCheck, Truck, Sparkles, Zap } from 'lucide-react';
import { getBrands, getCategories, getSettings } from '../services/api';
import MobileStoreMockup from '../components/MobileStoreMockup';

const catVisual = {
  'air-conditioners':'01', refrigerators:'02', 'washing-machines':'03', 'led-tvs':'04', 'deep-freezers':'05', 'microwave-ovens':'06'
};

export default function Home(){
  const [brands,setBrands]=useState([]),[cats,setCats]=useState([]),[settings,setSettings]=useState(null);
  useEffect(()=>{(async()=>{try{const [b,c,s]=await Promise.all([getBrands(),getCategories(),getSettings()]);setBrands(Array.isArray(b)?b:[]);setCats(Array.isArray(c)?c:[]);setSettings(s)}catch(e){console.error(e)}})()},[]);
  const s=settings||{};
  return <main className="home-dark">
    <section className="hero-premium">
      <div className="hero-noise"/>
      <div className="hero-content">
        <div className="hero-copy-premium">
          <div className="hero-kicker"><span className="live-dot"/> {s.heroEyebrow||'THE NEW STANDARD FOR HOME APPLIANCES'}</div>
          <h1>{s.heroTitle||'Upgrade your home. Live smarter.'}</h1>
          <p>{s.heroSubtitle||'Discover premium appliances from trusted brands, with transparent pricing and a shopping experience designed around your home.'}</p>
          <div className="hero-ctas">
            <Link className="hero-primary" to={s.heroPrimaryUrl||'/shop'}>{s.heroPrimaryLabel||'Explore appliances'}<ArrowUpRight size={18}/></Link>
            <Link className="hero-secondary" to={s.heroSecondaryUrl||'/shop?featured=true'}>{s.heroSecondaryLabel||"Today's best deals"}<ArrowRight size={17}/></Link>
          </div>
          <div className="hero-trust-row"><span><Check/> Genuine products</span><span><ShieldCheck/> Manufacturer warranty</span><span><Truck/> Nationwide delivery</span></div>
        </div>
        <MobileStoreMockup/>
      </div>
      <div className="hero-bottom-line"><span>01 / 04</span><div/><span>{s.heroAccent||'SMARTER LIVING'}</span></div>
    </section>

    <section className="brand-rail"><span>TRUSTED BY SHOPPERS ·</span>{brands.slice(0,8).map(b=><b key={b._id}>{b.name}</b>)}</section>

    <section className="section dark-section categories">
      <div className="section-head"><div><p className="eyebrow">SHOP THE HOME</p><h2>Built around the way<br/><em>you live.</em></h2></div><Link className="text-link" to="/shop">All categories <ChevronRight size={16}/></Link></div>
      <div className="category-grid dark-grid">{cats.slice(0,8).map((c,i)=><Link className="category-tile dark-tile" key={c._id} to={`/shop?category=${c._id}`}><span className="tile-num">{catVisual[c.slug]||String(i+1).padStart(2,'0')}</span><div><h3>{c.name}</h3><p>{c.description||'Explore premium appliances for your home.'}</p></div><ArrowUpRight className="tile-arrow" size={18}/></Link>)}</div>
    </section>

    <section className="deal-banner"><div><p className="eyebrow">LIVE DEALS</p><h2>Big appliances.<br/><em>Sharper prices.</em></h2><p>Original prices are shown transparently beside current sale prices.</p></div><Link className="hero-primary" to="/shop?featured=true">Shop the deals <ArrowUpRight size={18}/></Link></section>

    <section className="trust-panel"><div><p className="eyebrow">WHY KPK ELECTRONICS</p><h2>Purchase with<br/><em>confidence.</em></h2></div><div className="trust-grid"><article><ShieldCheck/><b>Genuine products</b><p>Clear product information and real administrator-managed inventory.</p></article><article><Truck/><b>Nationwide delivery</b><p>Designed for appliance delivery across Pakistan.</p></article><article><Sparkles/><b>Transparent pricing</b><p>See the original price, current sale price and discount clearly.</p></article><article><Zap/><b>Real support</b><p>Warranty, installation and store policies can be managed centrally.</p></article></div></section>

    <section className="brand-showcase dark-section"><div><p className="eyebrow">BRANDS</p><h2>Names you<br/><em>already trust.</em></h2></div><div className="brand-list">{brands.map((b,i)=><Link key={b._id} to={`/shop?brand=${b._id}`}><span>{String(i+1).padStart(2,'0')}</span><strong>{b.name}</strong><ArrowUpRight size={17}/></Link>)}</div></section>
  </main>;
}
