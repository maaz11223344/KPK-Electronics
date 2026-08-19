import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  Heart,
  UserRound,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const nav = useNavigate();
  const { cartCount, wishlist, user } = useApp();

  /* --------------------------------
     Navigation helper
  -------------------------------- */
  const goTo = (url) => {
    setOpen(false);

    nav(url);

    // Always start the new page from the top
    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    });
  };

  /* --------------------------------
     Search
  -------------------------------- */
  const submit = (e) => {
    e.preventDefault();

    const search = q.trim();

    if (search) {
      goTo(`/shop?search=${encodeURIComponent(search)}`);
    }
  };

  const closeMobileMenu = () => {
    setOpen(false);
  };

  return (
    <>
      {/* ================================
          MAIN HEADER
      ================================= */}
      <header className="header">

        {/* LOGO */}
        <Link
          className="brandmark"
          to="/"
          onClick={() => {
            closeMobileMenu();

            requestAnimationFrame(() => {
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            });
          }}
        >
          <span>KPK</span>
          <b>ELECTRONICS</b>
        </Link>

        {/* ================================
            DESKTOP NAVIGATION
        ================================= */}
        <nav className="desktop-nav">

          <button type="button" onClick={() => goTo("/shop")}>
            Shop all
          </button>

          <button
            type="button"
            onClick={() =>
              goTo("/shop?category=air-conditioners")
            }
          >
            Cooling
          </button>

          <button
            type="button"
            onClick={() =>
              goTo("/shop?category=refrigerators")
            }
          >
            Kitchen
          </button>

          <button
            type="button"
            onClick={() =>
              goTo("/shop?category=washing-machines")
            }
          >
            Laundry
          </button>

          <button
            type="button"
            onClick={() =>
              goTo("/shop?category=led-tvs")
            }
          >
            Living room
          </button>

          <button
            type="button"
            onClick={() =>
              goTo("/shop?featured=true")
            }
          >
            Edit picks
          </button>

        </nav>

        {/* ================================
            SEARCH
        ================================= */}
        <form className="searchbar" onSubmit={submit}>
          <Search size={18} />

          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search an appliance, brand or model"
            aria-label="Search products"
          />

          <kbd>⌘ K</kbd>
        </form>

        {/* ================================
            HEADER ACTIONS
        ================================= */}
        <div className="header-actions">

          {/* WISHLIST */}
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            onClick={closeMobileMenu}
          >
            <Heart size={20} />

            {wishlist.length > 0 && (
              <i>{wishlist.length}</i>
            )}
          </Link>

          {/* CART */}
          <Link
            to="/cart"
            aria-label="Shopping cart"
            onClick={closeMobileMenu}
          >
            <ShoppingBag size={20} />

            {cartCount > 0 && (
              <i>{cartCount}</i>
            )}
          </Link>

          {/* ACCOUNT */}
          <Link
            className="account-link"
            to={user ? "/account" : "/login"}
            onClick={closeMobileMenu}
          >
            <UserRound size={20} />

            <span>
              {user ? "Account" : "Sign in"}
            </span>
          </Link>

          {/* MOBILE MENU */}
          <button
            type="button"
            className="mobile-menu"
            aria-label={
              open
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={open}
            onClick={() =>
              setOpen((current) => !current)
            }
          >
            {open ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>

        </div>
      </header>

      {/* ================================
          MOBILE NAVIGATION
      ================================= */}
      {open && (
        <div className="mobile-nav">

          <button
            type="button"
            onClick={() => goTo("/shop")}
          >
            <span>Shop all</span>
            <ArrowUpRight size={15} />
          </button>

          <button
            type="button"
            onClick={() =>
              goTo("/shop?category=air-conditioners")
            }
          >
            <span>Cooling</span>
            <ArrowUpRight size={15} />
          </button>

          <button
            type="button"
            onClick={() =>
              goTo("/shop?category=refrigerators")
            }
          >
            <span>Kitchen</span>
            <ArrowUpRight size={15} />
          </button>

          <button
            type="button"
            onClick={() =>
              goTo("/shop?category=washing-machines")
            }
          >
            <span>Laundry</span>
            <ArrowUpRight size={15} />
          </button>

          <button
            type="button"
            onClick={() =>
              goTo("/shop?category=led-tvs")
            }
          >
            <span>Living room</span>
            <ArrowUpRight size={15} />
          </button>

          <button
            type="button"
            onClick={() =>
              goTo("/shop?featured=true")
            }
          >
            <span>Edit picks</span>
            <ArrowUpRight size={15} />
          </button>

        </div>
      )}
    </>
  );
}