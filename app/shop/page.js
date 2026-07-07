'use client';
import { useState, useMemo } from 'react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import styles from './shop.module.css';

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(150);
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    let list = [...products];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Category
    if (activeCategory !== 'all') {
      list = list.filter(p => p.category === activeCategory);
    }

    // Price
    list = list.filter(p => p.price <= priceRange);

    // Sort
    switch (sortBy) {
      case 'price-asc':  list.sort((a,b) => a.price - b.price); break;
      case 'price-desc': list.sort((a,b) => b.price - a.price); break;
      case 'rating':     list.sort((a,b) => b.rating - a.rating); break;
      case 'name':       list.sort((a,b) => a.name.localeCompare(b.name)); break;
      default: break;
    }
    return list;
  }, [activeCategory, priceRange, sortBy, searchQuery]);

  return (
    <div className={styles.page}>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <span className="section-eyebrow anim-fade-up">Our Collection</span>
          <h1 className={`${styles.pageTitle} anim-fade-up anim-delay-1`}>Shop All Plants</h1>
          <p className={`${styles.pageSubtitle} anim-fade-up anim-delay-2`}>
            {products.length} hand-curated plants, from statement tropicals to easy-care favourites.
          </p>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>
          {/* ── Sidebar ──────────────────────────────── */}
          <aside className={styles.sidebar} aria-label="Shop filters">
            <div className={styles.sidebarSection}>
              <h2 className={styles.sidebarTitle}>Search</h2>
              <div className={styles.searchBox}>
                <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  type="search"
                  placeholder="Monstera, trailing..."
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  aria-label="Search plants"
                  id="plant-search"
                />
              </div>
            </div>

            <hr className="divider" />

            <div className={styles.sidebarSection}>
              <h2 className={styles.sidebarTitle}>Category</h2>
              <div className={styles.categoryList}>
                {categories.map(c => (
                  <button
                    key={c.id}
                    className={`${styles.categoryBtn} ${activeCategory === c.id ? styles.categoryBtnActive : ''}`}
                    onClick={() => setActiveCategory(c.id)}
                    aria-pressed={activeCategory === c.id}
                    id={`category-${c.id}`}
                  >
                    <span>{c.icon}</span>
                    <span>{c.label}</span>
                    <span className={styles.categoryCount}>
                      {c.id === 'all'
                        ? products.length
                        : products.filter(p => p.category === c.id).length
                      }
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <hr className="divider" />

            <div className={styles.sidebarSection}>
              <h2 className={styles.sidebarTitle}>Max Price</h2>
              <div className={styles.priceRange}>
                <div className={styles.priceLabels}>
                  <span>$0</span>
                  <span className={styles.priceValue}>${priceRange}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="150"
                  value={priceRange}
                  onChange={e => setPriceRange(Number(e.target.value))}
                  className={styles.rangeInput}
                  aria-label="Maximum price filter"
                  id="price-range"
                  style={{ '--pct': `${((priceRange - 10) / 140) * 100}%` }}
                />
              </div>
            </div>

            <hr className="divider" />

            <button
              className="btn btn-ghost"
              style={{ width: '100%', justifyContent: 'flex-start', color: 'var(--clr-text-muted)', fontSize: '0.85rem' }}
              onClick={() => { setActiveCategory('all'); setPriceRange(150); setSearchQuery(''); setSortBy('default'); }}
            >
              ✕ Clear all filters
            </button>
          </aside>

          {/* ── Main Grid ─────────────────────────────── */}
          <div className={styles.main}>
            {/* Toolbar */}
            <div className={styles.toolbar}>
              <p className={styles.resultCount}>
                <strong>{filtered.length}</strong> plant{filtered.length !== 1 ? 's' : ''} found
              </p>
              <div className={styles.sortGroup}>
                <label htmlFor="sort-select" className={styles.sortLabel}>Sort by</label>
                <select
                  id="sort-select"
                  className={styles.sortSelect}
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                >
                  <option value="default">Featured</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="name">A–Z</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="products-grid">
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>🌵</span>
                <h3>No plants found</h3>
                <p>Try adjusting your filters or search query.</p>
                <button className="btn btn-outline" onClick={() => { setActiveCategory('all'); setPriceRange(150); setSearchQuery(''); }}>
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
