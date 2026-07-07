'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const { addItem, items } = useCart();
  const [added, setAdded] = useState(false);
  const inCart = items.some(i => i.id === product.id);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  function handleAdd(e) {
    e.preventDefault();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <article className={`card ${styles.card}`}>
      <Link href={`/product/${product.slug}`} className={styles.imageWrapper} tabIndex={-1} aria-hidden>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
          className={styles.image}
          priority={false}
        />
        {/* Badges */}
        <div className={styles.badges}>
          {product.badge && (
            <span className={`badge ${
              product.badge === 'Bestseller' ? 'badge-green' :
              product.badge === 'On Sale'    ? 'badge-red'   :
              'badge-gold'
            }`}>
              {product.badge}
            </span>
          )}
          {discount && (
            <span className="badge badge-red">−{discount}%</span>
          )}
        </div>
        {/* Quick-add overlay */}
        <div className={styles.overlay}>
          <button
            className={`btn ${added ? 'btn-outline' : 'btn-primary'} ${styles.quickAdd}`}
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
          >
            {added ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Added!
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Quick Add
              </>
            )}
          </button>
        </div>
      </Link>

      <div className={styles.body}>
        {/* Light level pill */}
        <span className={styles.lightPill}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2"/><line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2"/><line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2"/><line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2"/></svg>
          {product.care.light}
        </span>

        <Link href={`/product/${product.slug}`} className={styles.nameLink}>
          <h2 className={styles.name}>{product.name}</h2>
        </Link>

        {/* Rating */}
        <div className={styles.rating}>
          <div className={styles.stars} aria-label={`${product.rating} out of 5 stars`}>
            {[1,2,3,4,5].map(s => (
              <span key={s} className={s <= Math.round(product.rating) ? styles.starFilled : styles.starEmpty}>★</span>
            ))}
          </div>
          <span className={styles.ratingText}>{product.rating} ({product.reviewCount})</span>
        </div>

        <div className={styles.footer}>
          <div className={styles.pricing}>
            <span className={styles.price}>${product.price}</span>
            {product.originalPrice && (
              <span className={styles.originalPrice}>${product.originalPrice}</span>
            )}
          </div>
          <button
            className={`${styles.addBtn} ${inCart ? styles.addBtnInCart : ''}`}
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
          >
            {added ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
