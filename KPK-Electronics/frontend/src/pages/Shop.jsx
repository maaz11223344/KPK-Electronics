import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  SlidersHorizontal,
  X,
  RotateCcw,
  ChevronDown,
} from "lucide-react";

import ProductCard from "../components/ProductCard";
import {
  getBrands,
  getCategories,
  getProducts,
} from "../services/api";

export default function Shop() {
  const [params, setParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);

  const search = params.get("search") || "";
  const category = params.get("category") || "";
  const brand = params.get("brand") || "";
  const sort = params.get("sort") || "newest";
  const featured = params.get("featured") || "";

  /*
   * IMPORTANT:
   * Whenever the Shop URL changes because of a category,
   * brand, search or sorting selection, return to the
   * beginning of the Shop page.
   */
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [search, category, brand, sort, featured]);

  /*
   * Load products, brands and categories
   */
  useEffect(() => {
    let cancelled = false;

    async function loadShopData() {
      setLoading(true);

      try {
        const [
          productData,
          brandData,
          categoryData,
        ] = await Promise.all([
          getProducts({
            search,
            category,
            brand,
            sort,
            featured,
          }),
          getBrands(),
          getCategories(),
        ]);

        if (cancelled) return;

        setProducts(
          Array.isArray(productData)
            ? productData
            : []
        );

        setBrands(
          Array.isArray(brandData)
            ? brandData
            : []
        );

        setCats(
          Array.isArray(categoryData)
            ? categoryData
            : []
        );
      } catch (error) {
        console.error(
          "Shop data error:",
          error
        );

        if (!cancelled) {
          setProducts([]);
          setBrands([]);
          setCats([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadShopData();

    return () => {
      cancelled = true;
    };
  }, [
    search,
    category,
    brand,
    sort,
    featured,
  ]);

  /*
   * Change a filter
   */
  const setFilter = (key, value) => {
    const next = new URLSearchParams(params);

    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }

    setParams(next);

    // Close mobile filter drawer after selection
    setFilterOpen(false);

    // Immediately return to top
    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    });
  };

  /*
   * Clear all filters
   */
  const clearFilters = () => {
    const next = new URLSearchParams();

    if (search) {
      next.set("search", search);
    }

    setParams(next);
    setFilterOpen(false);

    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    });
  };

  /*
   * Number of active filters
   */
  const activeCount = [
    category,
    brand,
    sort !== "newest" ? sort : "",
    featured,
  ].filter(Boolean).length;

  return (
    <main className="shop-page">
      <div className="shop-shell">

        {/* ======================================
            FILTER SIDEBAR
        ====================================== */}
        <aside
          className={`filter-sidebar ${
            filterOpen ? "is-open" : ""
          }`}
          aria-label="Product filters"
        >
          <div className="filter-sidebar-head">
            <div>
              <p className="eyebrow">
                REFINE
              </p>

              <h2>
                Find your fit.
              </h2>
            </div>

            <button
              className="filter-close"
              type="button"
              onClick={() =>
                setFilterOpen(false)
              }
              aria-label="Close filters"
            >
              <X size={18} />
            </button>
          </div>

          {/* Categories */}
          <div className="filter-group">
            <div className="filter-group-title">
              <span>Categories</span>
              <small>{cats.length}</small>
            </div>

            <button
              type="button"
              className={`filter-option ${
                !category
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                setFilter(
                  "category",
                  ""
                )
              }
            >
              <span>
                All appliances
              </span>

              <b>
                {!category
                  ? "✓"
                  : ""}
              </b>
            </button>

            {cats.map((c) => (
              <button
                key={c._id}
                type="button"
                className={`filter-option ${
                  category === c._id
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setFilter(
                    "category",
                    c._id
                  )
                }
              >
                <span>
                  {c.name}
                </span>

                <b>
                  {category === c._id
                    ? "✓"
                    : ""}
                </b>
              </button>
            ))}
          </div>

          {/* Brands */}
          <div className="filter-group">
            <div className="filter-group-title">
              <span>Brands</span>
              <small>
                {brands.length}
              </small>
            </div>

            <div className="brand-filter-list">
              {brands.map((b) => (
                <label
                  key={b._id}
                  className={`brand-filter ${
                    brand === b._id
                      ? "selected"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="brand"
                    checked={
                      brand === b._id
                    }
                    onChange={() =>
                      setFilter(
                        "brand",
                        b._id
                      )
                    }
                  />

                  <span>
                    {b.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Sorting */}
          <div className="filter-group">
            <div className="filter-group-title">
              <span>Sort by</span>

              <ChevronDown
                size={15}
              />
            </div>

            <select
              className="sidebar-sort"
              value={sort}
              onChange={(e) =>
                setFilter(
                  "sort",
                  e.target.value
                )
              }
              aria-label="Sort products"
            >
              <option value="newest">
                Newest arrivals
              </option>

              <option value="priceAsc">
                Price: low to high
              </option>

              <option value="priceDesc">
                Price: high to low
              </option>

              <option value="rating">
                Top rated
              </option>
            </select>
          </div>

          {/* Clear */}
          <button
            className="clear-filters"
            type="button"
            onClick={clearFilters}
          >
            <RotateCcw size={15} />
            Clear filters
          </button>
        </aside>

        {/* Mobile backdrop */}
        {filterOpen && (
          <button
            className="filter-backdrop"
            type="button"
            onClick={() =>
              setFilterOpen(false)
            }
            aria-label="Close filters"
          />
        )}

        {/* ======================================
            SHOP CONTENT
        ====================================== */}
        <section className="shop-main">

          {/* Shop Header */}
          <header className="shop-intro shop-intro-compact">
            <div>
              <p className="eyebrow">
                {search ? `SEARCH · ${search}` : "SHOP"}
              </p>
              {search && <h1 className="shop-search-title">Results</h1>}
            </div>

            <div className="shop-intro-right">
              <span>
                {loading
                  ? "Updating collection…"
                  : `${products.length} products`}
              </span>

              <button
                className="mobile-filter-trigger"
                type="button"
                onClick={() =>
                  setFilterOpen(true)
                }
              >
                <SlidersHorizontal
                  size={16}
                />

                Filters

                {activeCount > 0 && (
                  <b>
                    {activeCount}
                  </b>
                )}
              </button>
            </div>
          </header>

          {/* Active filters */}
          <div className="active-filter-row">
            {category && (
              <button
                type="button"
                onClick={() =>
                  setFilter(
                    "category",
                    ""
                  )
                }
              >
                Category
                <X size={13} />
              </button>
            )}

            {brand && (
              <button
                type="button"
                onClick={() =>
                  setFilter(
                    "brand",
                    ""
                  )
                }
              >
                Brand
                <X size={13} />
              </button>
            )}

            {featured && (
              <button
                type="button"
                onClick={() =>
                  setFilter(
                    "featured",
                    ""
                  )
                }
              >
                Featured
                <X size={13} />
              </button>
            )}

            {!loading &&
              !products.length && (
                <span>
                  No products matched
                  these filters.
                </span>
              )}
          </div>

          {/* Products */}
          {loading ? (
            <div className="shop-loading-grid">
              {Array.from({
                length: 8,
              }).map((_, i) => (
                <div
                  className="skeleton-card"
                  key={i}
                />
              ))}
            </div>
          ) : products.length ? (
            <div className="product-grid shop-product-grid">
              {products.map(
                (p, i) => (
                  <ProductCard
                    key={p._id}
                    p={p}
                    index={i}
                  />
                )
              )}
            </div>
          ) : (
            <div className="empty-state shop-empty">
              <span className="empty-number">
                00
              </span>

              <h2>
                Nothing matched
                that brief.
              </h2>

              <p>
                Try another category
                or brand, or clear
                your filters and
                explore the full
                collection.
              </p>

              <button
                type="button"
                onClick={
                  clearFilters
                }
              >
                Reset collection
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}