'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import styles from './cart.module.css';

export default function CartPage() {
  const { items, removeItem, updateQty, subtotal, clearCart } = useCart();

  const shipping = subtotal >= 75 ? 0 : 9.99;
  const total    = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <div className={`container ${styles.empty}`}>
          <span className={styles.emptyIcon}>🛒</span>
          <h1 className={styles.emptyTitle}>Your cart is empty</h1>
          <p className={styles.emptyText}>Looks like you haven&apos;t added any plants yet.</p>
          <Link href="/shop" className="btn btn-primary" style={{ fontSize: '1rem', padding: '0.8rem 2.4rem' }}>
            Browse Plants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className={`${styles.title} anim-fade-up`}>Shopping Cart</h1>
        <p className={styles.count}>{items.length} item{items.length !== 1 ? 's' : ''}</p>

        <div className={styles.layout}>
          {/* Cart Items */}
          <div className={styles.itemsCol}>
            {items.map((item, i) => (
              <div key={item.id} className={`${styles.cartItem} anim-fade-up`} style={{ animationDelay: `${i * 0.05}s` }}>
                <Link href={`/product/${item.slug}`} className={styles.itemImage}>
                  <Image src={item.image} alt={item.name} fill sizes="100px" className={styles.itemImg} />
                </Link>

                <div className={styles.itemDetails}>
                  <div className={styles.itemHeader}>
                    <div>
                      <Link href={`/product/${item.slug}`} className={styles.itemName}>{item.name}</Link>
                      <p className={styles.itemCategory}>{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p>
                    </div>
                    <button
                      className={styles.removeBtn}
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                      id={`remove-item-${item.id}`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                    </button>
                  </div>

                  <div className={styles.itemFooter}>
                    <div className={styles.qtyStepper}>
                      <button className={styles.qtyBtn} onClick={() => updateQty(item.id, item.quantity - 1)} aria-label="Decrease">−</button>
                      <span className={styles.qtyValue}>{item.quantity}</span>
                      <button className={styles.qtyBtn} onClick={() => updateQty(item.id, item.quantity + 1)} aria-label="Increase">+</button>
                    </div>
                    <span className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}

            <div className={styles.cartActions}>
              <Link href="/shop" className="btn btn-ghost" style={{ fontSize: '0.875rem' }}>
                ← Continue Shopping
              </Link>
              <button
                className="btn btn-ghost"
                style={{ fontSize: '0.875rem', color: 'var(--clr-text-muted)' }}
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className={styles.summaryCol}>
            <div className={styles.summaryCard}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>

              <div className={styles.summaryRows}>
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Shipping</span>
                  <span className={shipping === 0 ? styles.freeShipping : ''}>
                    {shipping === 0 ? 'FREE 🎉' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <div className={styles.shippingHint}>
                    Add ${(75 - subtotal).toFixed(2)} more for free shipping!
                  </div>
                )}
                <hr className="divider" style={{ margin: 'var(--space-2) 0' }} />
                <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Link href="/checkout" className="btn btn-gold" style={{ width: '100%', fontSize: '1rem', padding: '0.9rem', borderRadius: 'var(--radius-md)' }} id="checkout-btn">
                Checkout →
              </Link>

              <div className={styles.secureNote}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Secure checkout · SSL encrypted
              </div>

              {/* Trust */}
              <div className={styles.trustList}>
                {['🌿 30-day plant guarantee', '📦 Climate-controlled packaging', '♻️ Carbon-neutral shipping'].map(t => (
                  <p key={t} className={styles.trustItem}>{t}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
