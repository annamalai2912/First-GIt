'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import styles from './checkout.module.css';

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const shipping = subtotal >= 75 ? 0 : 9.99;
  const total    = subtotal + shipping;

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '', country: 'US',
    cardName: '', cardNum: '', expiry: '', cvv: '',
  });

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    clearCart();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className={styles.page}>
        <div className={`container ${styles.success}`}>
          <div className={styles.successIcon}>🌿</div>
          <h1 className={styles.successTitle}>Order Confirmed!</h1>
          <p className={styles.successText}>
            Thank you for your order! Your plants are being carefully packaged and will be shipped within 1–2 business days.
          </p>
          <p className={styles.successRef}>Order #VRD-{Math.random().toString(36).slice(2,8).toUpperCase()}</p>
          <Link href="/shop" className="btn btn-primary" style={{ fontSize: '1rem', padding: '0.8rem 2.4rem' }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <div className={`container ${styles.success}`}>
          <div className={styles.successIcon}>🛒</div>
          <h1 className={styles.successTitle}>Cart is empty</h1>
          <Link href="/shop" className="btn btn-primary" style={{ fontSize: '1rem', padding: '0.8rem 2.4rem' }}>
            Shop Plants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className={`${styles.title} anim-fade-up`}>Checkout</h1>

        <div className={styles.layout}>
          {/* Form */}
          <form className={styles.formCol} onSubmit={handleSubmit}>
            {/* Contact */}
            <div className={styles.formSection}>
              <h2 className={styles.formSectionTitle}>
                <span className={styles.stepNum}>1</span> Contact Information
              </h2>
              <div className={styles.formGrid}>
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">First Name *</label>
                  <input id="firstName" name="firstName" className="form-input" type="text" placeholder="Jane" required value={form.firstName} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">Last Name *</label>
                  <input id="lastName" name="lastName" className="form-input" type="text" placeholder="Smith" required value={form.lastName} onChange={handleChange} />
                </div>
                <div className="form-group" style={{ gridColumn: '1/-1' }}>
                  <label htmlFor="email" className="form-label">Email *</label>
                  <input id="email" name="email" className="form-input" type="email" placeholder="jane@example.com" required value={form.email} onChange={handleChange} />
                </div>
                <div className="form-group" style={{ gridColumn: '1/-1' }}>
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input id="phone" name="phone" className="form-input" type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* Shipping */}
            <div className={styles.formSection}>
              <h2 className={styles.formSectionTitle}>
                <span className={styles.stepNum}>2</span> Shipping Address
              </h2>
              <div className={styles.formGrid}>
                <div className="form-group" style={{ gridColumn: '1/-1' }}>
                  <label htmlFor="address" className="form-label">Street Address *</label>
                  <input id="address" name="address" className="form-input" type="text" placeholder="123 Leaf Lane" required value={form.address} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="city" className="form-label">City *</label>
                  <input id="city" name="city" className="form-input" type="text" placeholder="New York" required value={form.city} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="state" className="form-label">State *</label>
                  <input id="state" name="state" className="form-input" type="text" placeholder="NY" required value={form.state} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="zip" className="form-label">ZIP *</label>
                  <input id="zip" name="zip" className="form-input" type="text" placeholder="10001" required value={form.zip} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="country" className="form-label">Country</label>
                  <select id="country" name="country" className="form-input" value={form.country} onChange={handleChange}>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className={styles.formSection}>
              <h2 className={styles.formSectionTitle}>
                <span className={styles.stepNum}>3</span> Payment
              </h2>
              <div className={styles.paymentNote}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                SSL encrypted · Demo only — no real charges
              </div>
              <div className={styles.formGrid}>
                <div className="form-group" style={{ gridColumn: '1/-1' }}>
                  <label htmlFor="cardName" className="form-label">Name on Card *</label>
                  <input id="cardName" name="cardName" className="form-input" type="text" placeholder="Jane Smith" required value={form.cardName} onChange={handleChange} />
                </div>
                <div className="form-group" style={{ gridColumn: '1/-1' }}>
                  <label htmlFor="cardNum" className="form-label">Card Number *</label>
                  <input id="cardNum" name="cardNum" className="form-input" type="text" placeholder="1234 5678 9012 3456" maxLength={19} required value={form.cardNum} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="expiry" className="form-label">Expiry *</label>
                  <input id="expiry" name="expiry" className="form-input" type="text" placeholder="MM/YY" maxLength={5} required value={form.expiry} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="cvv" className="form-label">CVV *</label>
                  <input id="cvv" name="cvv" className="form-input" type="text" placeholder="123" maxLength={4} required value={form.cvv} onChange={handleChange} />
                </div>
              </div>
            </div>

            <button type="submit" className={`btn btn-gold ${styles.submitBtn}`} id="place-order-btn">
              Place Order · ${total.toFixed(2)}
            </button>
          </form>

          {/* Summary */}
          <div className={styles.summaryCol}>
            <div className={styles.summaryCard}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>
              <div className={styles.orderItems}>
                {items.map(item => (
                  <div key={item.id} className={styles.orderItem}>
                    <span className={styles.orderItemName}>{item.name}</span>
                    <span className={styles.orderItemQty}>×{item.quantity}</span>
                    <span className={styles.orderItemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <hr className="divider" />
              <div className={styles.summaryRows}>
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Shipping</span>
                  <span style={{ color: shipping === 0 ? 'var(--clr-green-300)' : 'inherit' }}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <hr className="divider" style={{ margin: '4px 0' }} />
                <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
