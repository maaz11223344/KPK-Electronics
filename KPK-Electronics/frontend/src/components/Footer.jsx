import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="brandmark">
            <span>KPK</span>
            <b>ELECTRONICS</b>
          </Link>

          <p>
            A modern destination for home appliances,
            bringing trusted Pakistani and international
            brands together in one place.
          </p>

          <div className="footer-socials">
            <a href="#" aria-label="Instagram">
              <Instagram size={18} />
            </a>

            <a href="#" aria-label="Facebook">
              <Facebook size={18} />
            </a>

            <a href="#" aria-label="YouTube">
              <Youtube size={18} />
            </a>
          </div>
        </div>

        {/* Shop */}
        <div className="footer-column">
          <h3>Shop</h3>

          <Link to="/shop">All appliances</Link>

          <Link to="/shop?category=air-conditioners">
            Air Conditioners
          </Link>

          <Link to="/shop?category=refrigerators">
            Refrigerators
          </Link>

          <Link to="/shop?category=washing-machines">
            Washing Machines
          </Link>

          <Link to="/shop?category=led-tvs">
            LED TVs
          </Link>

          <Link to="/shop?category=microwave-ovens">
            Microwave Ovens
          </Link>
        </div>

        {/* Customer */}
        <div className="footer-column">
          <h3>Customer care</h3>

          <Link to="/account">My account</Link>

          <Link to="/wishlist">Wishlist</Link>

          <Link to="/cart">Shopping cart</Link>

          <Link to="/checkout">Checkout</Link>

          <Link to="/login">Sign in</Link>
        </div>

        {/* Company */}
        <div className="footer-column">
          <h3>KPK Electronics</h3>

          <Link to="/shop?featured=true">
            Featured products
          </Link>

          <a href="#brands">Our brands</a>

          <a href="#support">Installation support</a>

          <a href="#contact">Contact us</a>

          <a href="#delivery">Delivery information</a>
        </div>

        {/* Newsletter */}
        <div className="footer-newsletter">
          <p className="eyebrow">STAY IN THE LOOP</p>

          <h3>
            Better appliances.
            <br />
            Better living.
          </h3>

          <p>
            Get new arrivals, special offers and useful
            appliance guides delivered to your inbox.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="email"
              placeholder="Your email address"
              aria-label="Email address"
              required
            />

            <button type="submit" aria-label="Subscribe">
              <ArrowUpRight size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} KPK Electronics.
          All rights reserved.
        </span>

        <div>
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="#shipping">Shipping</a>
        </div>

        <span>Made for homes across Pakistan.</span>
      </div>
    </footer>
  );
}