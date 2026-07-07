'use client';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.inner}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <span>🌿</span>
            <span className={styles.logoText}>Verdant</span>
          </Link>
          <p className={styles.tagline}>
            Bringing the beauty of nature into every home — one plant at a time.
          </p>
          <div className={styles.socials}>
            {['Instagram', 'Pinterest', 'TikTok'].map(s => (
              <a key={s} href="#" aria-label={s} className={styles.socialLink}>
                {s === 'Instagram' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                )}
                {s === 'Pinterest' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a10 10 0 0 0-3.5 19.3c0-.7.1-1.8.3-2.6l1.9-8a5.4 5.4 0 0 1-.4-2c0-1.9 1.1-3.3 2.4-3.3 1.1 0 1.7.9 1.7 1.9 0 1.1-.7 2.8-1.1 4.4-.3 1.3.7 2.4 2 2.4 2.4 0 4-3 4-6.5 0-2.7-1.9-4.7-4.7-4.7-3.3 0-5.1 2.4-5.1 5a4.6 4.6 0 0 0 .8 2.7c.1.2.1.4 0 .6l-.5 1.9a.3.3 0 0 1-.5.2 8 8 0 0 1-2.6-6.1c0-4.5 3.3-8.6 9.5-8.6 5 0 8.9 3.5 8.9 8.2 0 4.9-3 8.8-7.3 8.8-1.4 0-2.7-.7-3.2-1.6l-.9 3.2a12.5 12.5 0 0 1-1.3 2.9A10 10 0 1 0 12 2z"/>
                  </svg>
                )}
                {s === 'TikTok' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.2 8.2 0 0 0 4.79 1.52V6.76a4.85 4.85 0 0 1-1.02-.07z"/>
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className={styles.linksGrid}>
          <div className={styles.linkGroup}>
            <h3 className={styles.groupTitle}>Shop</h3>
            <ul>
              {['All Plants', 'Tropical', 'Statement', 'Trailing', 'Sculptural'].map(l => (
                <li key={l}><Link href="/shop" className={styles.footerLink}>{l}</Link></li>
              ))}
            </ul>
          </div>
          <div className={styles.linkGroup}>
            <h3 className={styles.groupTitle}>Help</h3>
            <ul>
              {['Plant Care Guides', 'Shipping Info', 'Returns', 'FAQ', 'Contact Us'].map(l => (
                <li key={l}><a href="#" className={styles.footerLink}>{l}</a></li>
              ))}
            </ul>
          </div>
          <div className={styles.linkGroup}>
            <h3 className={styles.groupTitle}>Company</h3>
            <ul>
              {['About Verdant', 'Our Nurseries', 'Sustainability', 'Press', 'Careers'].map(l => (
                <li key={l}><a href="#" className={styles.footerLink}>{l}</a></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className={styles.newsletter}>
          <h3 className={styles.groupTitle}>Plant Care Tips</h3>
          <p className={styles.newsletterText}>Join 20,000+ plant parents. Weekly care tips, new arrivals & exclusive offers.</p>
          <form className={styles.newsletterForm} onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@email.com"
              className={styles.newsletterInput}
              aria-label="Email for newsletter"
            />
            <button type="submit" className={`btn btn-primary ${styles.newsletterBtn}`}>Subscribe</button>
          </form>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.bottomInner}>
            <p className={styles.copyright}>© {year} Verdant. All rights reserved.</p>
            <div className={styles.bottomLinks}>
              {['Privacy Policy', 'Terms', 'Cookie Policy'].map(l => (
                <a key={l} href="#" className={styles.bottomLink}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
