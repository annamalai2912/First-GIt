import Link from 'next/link';
import Image from 'next/image';
import { products, testimonials } from './data/products';
import ProductCard from './components/ProductCard';
import styles from './page.module.css';

export const metadata = {
  title: 'Verdant — Premium Indoor Plants',
  description: 'Discover stunning indoor plants, curated from the finest nurseries. Free shipping over $75.',
};

const features = [
  { icon: '🌱', title: 'Expert Curation',   desc: 'Every plant hand-selected by our botanists for health and beauty.' },
  { icon: '📦', title: 'Safe Delivery',      desc: 'Climate-controlled packaging ensures plants arrive in perfect condition.' },
  { icon: '💚', title: 'Lifetime Support',   desc: 'Free care guides and expert advice for the life of your plant.' },
  { icon: '♻️', title: 'Sustainable',        desc: '100% recycled packaging. Carbon-neutral shipping on all orders.' },
];

export default function HomePage() {
  const featured  = products.filter(p => p.tags.includes('bestseller') || p.badge === 'Premium').slice(0, 4);
  const newArrivals = products.filter(p => p.badge === 'Rare Find' || p.badge === 'Luxury').slice(0, 3);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className={styles.hero} aria-label="Hero">
        <div className={styles.heroBg}>
          <Image
            src="https://images.unsplash.com/photo-1545165375-6c21df0c5ea4?w=1400&q=85"
            alt="Lush botanical plants arrangement"
            fill
            priority
            sizes="100vw"
            className={styles.heroBgImg}
          />
          <div className={styles.heroBgOverlay} />
        </div>

        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroText}>
            <span className={`section-eyebrow anim-fade-up`}>🌿 New arrivals every week</span>
            <h1 className={`${styles.heroTitle} anim-fade-up anim-delay-1`}>
              Bring the <em>jungle</em><br />inside your home
            </h1>
            <p className={`${styles.heroSubtitle} anim-fade-up anim-delay-2`}>
              Premium indoor plants, curated from the world&apos;s finest nurseries.
              Delivered alive, guaranteed.
            </p>
            <div className={`${styles.heroActions} anim-fade-up anim-delay-3`}>
              <Link href="/shop" className="btn btn-primary" id="hero-shop-btn" style={{ fontSize: '1rem', padding: '0.8rem 2rem' }}>
                Shop All Plants
              </Link>
              <Link href="/shop?category=statement" className="btn btn-outline" style={{ fontSize: '1rem', padding: '0.8rem 2rem' }}>
                Statement Plants
              </Link>
            </div>

            {/* Trust badges */}
            <div className={`${styles.trustBadges} anim-fade-up anim-delay-4`}>
              <span>✓ Free shipping $75+</span>
              <span>✓ 30-day guarantee</span>
              <span>✓ 20k+ happy customers</span>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className={styles.scrollCue} aria-hidden>
          <div className={styles.scrollLine} />
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────── */}
      <section className={styles.features} aria-label="Why Verdant">
        <div className="container">
          <div className={styles.featuresGrid}>
            {features.map((f, i) => (
              <div key={f.title} className={`${styles.featureCard} anim-fade-up`} style={{ animationDelay: `${i * 0.1}s` }}>
                <span className={styles.featureIcon}>{f.icon}</span>
                <div>
                  <h3 className={styles.featureTitle}>{f.title}</h3>
                  <p className={styles.featureDesc}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bestsellers ───────────────────────────────────── */}
      <section className={styles.section} aria-label="Bestselling plants">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <span className="section-eyebrow">Most loved</span>
              <h2 className="section-title">Customer Favourites</h2>
              <p className="section-subtitle">Our most popular plants — tried, trusted, and loved by thousands of plant parents.</p>
            </div>
            <Link href="/shop" className="btn btn-outline">View All →</Link>
          </div>
          <div className="products-grid">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── Banner CTA ────────────────────────────────────── */}
      <section className={styles.banner} aria-label="Promotion banner">
        <div className={styles.bannerBg}>
          <Image
            src="https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=1400&q=80"
            alt="Beautiful plant collection"
            fill
            sizes="100vw"
            className={styles.bannerBgImg}
          />
          <div className={styles.bannerOverlay} />
        </div>
        <div className={`container ${styles.bannerContent}`}>
          <span className="section-eyebrow">Limited collection</span>
          <h2 className={styles.bannerTitle}>Rare &amp; Exotic<br />Tropicals</h2>
          <p className={styles.bannerSubtitle}>Collector-grade plants sourced from premium nurseries worldwide. Limited stock.</p>
          <Link href="/shop?category=tropical" className="btn btn-gold" style={{ fontSize: '1rem', padding: '0.9rem 2.4rem' }}>
            Explore Collection →
          </Link>
        </div>
      </section>

      {/* ── New Arrivals ─────────────────────────────────── */}
      <section className={styles.section} aria-label="New arrivals">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <span className="section-eyebrow">Just landed</span>
              <h2 className="section-title">New Arrivals</h2>
              <p className="section-subtitle">Fresh stock, handpicked this week. Don&apos;t miss out — rare plants sell fast.</p>
            </div>
            <Link href="/shop" className="btn btn-outline">See All →</Link>
          </div>
          <div className="products-grid">
            {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      <section className={styles.testimonialsSection} aria-label="Customer reviews">
        <div className="container">
          <div className={styles.testimonialsHeader}>
            <span className="section-eyebrow">Reviews</span>
            <h2 className="section-title">Happy Plant Parents</h2>
          </div>
          <div className={styles.testimonialsGrid}>
            {testimonials.map((t, i) => (
              <blockquote key={t.id} className={`${styles.testimonialCard} anim-fade-up`} style={{ animationDelay: `${i * 0.12}s` }}>
                <div className={styles.testimonialStars}>
                  {'★'.repeat(t.rating)}
                </div>
                <p className={styles.testimonialText}>&ldquo;{t.text}&rdquo;</p>
                <footer className={styles.testimonialFooter}>
                  <div className={styles.testimonialAvatar}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className={styles.testimonialName}>{t.name}</p>
                    <p className={styles.testimonialMeta}>{t.location} · {t.plant}</p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
