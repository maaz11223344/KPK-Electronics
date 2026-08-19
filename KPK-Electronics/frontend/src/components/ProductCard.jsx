import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus, ArrowUpRight, Star, Tag } from 'lucide-react';
import { assetUrl } from '../services/api';
import { useApp } from '../context/AppContext';

export default function ProductCard({p,index=0}){
  const {addToCart,toggleWish,wishlist}=useApp();
  const liked=wishlist.some(x=>x._id===p._id);
  const price=Number(p.price||0), oldPrice=Number(p.oldPrice||0);
  const discount=Number(p.discount || (oldPrice>price ? Math.round(((oldPrice-price)/oldPrice)*100) : 0));
  return <article className={`product-card dark-product-card card-${index%4}`}>
    <div className="product-image">
      {discount>0&&<span className="sale-badge"><Tag size={12}/> {discount}% OFF</span>}
      <img src={assetUrl(p.images?.[0])} alt={p.name||'Product'} loading="lazy"/>
      <span className="product-index">{String(index+1).padStart(2,'0')}</span>
      <button type="button" className={liked?'liked':''} onClick={()=>toggleWish(p)} aria-label={liked?'Remove from wishlist':'Add to wishlist'}><Heart size={17} fill={liked?'currentColor':'none'}/></button>
      <button type="button" className="quick-add" onClick={()=>addToCart(p)}><Plus size={15}/> Add to cart</button>
    </div>
    <div className="product-copy">
      <div className="product-meta"><span>{p.brand?.name||'KPK Electronics'}</span><span><Star size={13} fill="currentColor"/> {Number(p.rating||0).toFixed(1)}</span></div>
      <Link to={`/product/${p.slug}`}><h3>{p.name}</h3></Link>
      <p>{p.shortDescription||p.description||'Premium home appliance.'}</p>
      <div className="price-row"><div className="price-stack">{oldPrice>price&&<del>PKR {oldPrice.toLocaleString('en-PK')}</del>}<strong>PKR {price.toLocaleString('en-PK')}</strong></div><Link to={`/product/${p.slug}`} aria-label={`View ${p.name}`}><ArrowUpRight size={17}/></Link></div>
    </div>
  </article>;
}
