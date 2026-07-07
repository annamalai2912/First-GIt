'use client';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import styles from './product.module.css';

export default function AddToCartBtn({ product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    for (let i = 0; i < qty; i++) addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className={styles.addRow}>
      {/* Qty stepper */}
      <div className={styles.qtyStepper} role="group" aria-label="Quantity">
        <button
          onClick={() => setQty(q => Math.max(1, q - 1))}
          className={styles.qtyBtn}
          aria-label="Decrease quantity"
          id="qty-decrease"
        >−</button>
        <span className={styles.qtyValue} aria-live="polite">{qty}</span>
        <button
          onClick={() => setQty(q => Math.min(product.stock, q + 1))}
          className={styles.qtyBtn}
          aria-label="Increase quantity"
          id="qty-increase"
        >+</button>
      </div>

      {/* Add button */}
      <button
        className={`btn ${added ? 'btn-outline' : 'btn-primary'} ${styles.addBtn}`}
        onClick={handleAdd}
        disabled={product.stock === 0}
        id="add-to-cart-btn"
        aria-label={`Add ${product.name} to cart`}
      >
        {added ? (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Added to Cart!
          </>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            Add to Cart · ${(product.price * qty).toFixed(2)}
          </>
        )}
      </button>
    </div>
  );
}
