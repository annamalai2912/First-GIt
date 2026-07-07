import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products } from '../../data/products';
import AddToCartBtn from './AddToCartBtn';
import styles from './product.module.css';

export async function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = products.find(p => p.slug === slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = products.find(p => p.slug === slug);
  if (!product) notFound();

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const careItems = [
    { icon: '☀️', label: 'Light', value: product.care.light },
    { icon: '💧', label: 'Water', value: product.care.water },
    { icon: '🌫️', label: 'Humidity', value: product.care.humidity },
  ];

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden>›</span>
          <Link href="/shop">Shop</Link>
          <span aria-hidden>›</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        {/* Main Product Layout */}
        <div className={styles.productGrid}>
          {/* Images */}
          <div className={styles.imagesCol}>
            <div className={styles.mainImage}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.mainImg}
                priority
              />
              {product.badge && (
                <span className={`badge ${
                  product.badge === 'Bestseller' ? 'badge-green' :
                  product.badge === 'On Sale'    ? 'badge-red'   : 'badge-gold'
                } ${styles.mainBadge}`}>
                  {product.badge}
                </span>
              )}
              {discount && (
                <span className={`badge badge-red ${styles.discountBadge}`}>−{discount}%</span>
              )}
            </div>
          </div>

          {/* Details */}
          <div className={styles.detailsCol}>
            <div className={styles.categoryTag}>
              <span>{product.category.charAt(0).toUpperCase() + product.category.slice(1)} Plant</span>
            </div>

            <h1 className={styles.productTitle}>{product.name}</h1>

            {/* Rating */}
            <div className={styles.ratingRow}>
              <div className={styles.stars} aria-label={`${product.rating} out of 5`}>
                {[1,2,3,4,5].map(s => (
                  <span key={s} style={{ color: s <= Math.round(product.rating) ? 'var(--clr-gold)' : 'var(--clr-border-light)' }}>★</span>
                ))}
              </div>
              <span className={styles.ratingMeta}>{product.rating} · {product.reviewCount} reviews</span>
            </div>

            {/* Price */}
            <div className={styles.priceRow}>
              <span className={styles.price}>${product.price}</span>
              {product.originalPrice && <span className={styles.originalPrice}>${product.originalPrice}</span>}
              {discount && <span className={`badge badge-red`}>Save {discount}%</span>}
            </div>

            <p className={styles.description}>{product.description}</p>

            {/* Care Guide */}
            <div className={styles.careCard}>
              <h3 className={styles.careTitle}>Care Guide</h3>
              <div className={styles.careGrid}>
                {careItems.map(c => (
                  <div key={c.label} className={styles.careItem}>
                    <span className={styles.careIcon}>{c.icon}</span>
                    <div>
                      <p className={styles.careLabel}>{c.label}</p>
                      <p className={styles.careValue}>{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stock */}
            <p className={styles.stock}>
              {product.stock > 10
                ? <><span className={styles.stockDot} style={{background:'var(--clr-green-500)'}}/>In Stock</>
                : product.stock > 0
                ? <><span className={styles.stockDot} style={{background:'var(--clr-gold)'}}/>Only {product.stock} left</>
                : <><span className={styles.stockDot} style={{background:'var(--clr-red)'}}/>Out of Stock</>
              }
            </p>

            {/* Add to Cart */}
            <AddToCartBtn product={product} />

            {/* Guarantees */}
            <div className={styles.guarantees}>
              {['🚚 Free shipping over $75', '🔒 Secure checkout', '🌿 30-day plant guarantee'].map(g => (
                <span key={g} className={styles.guarantee}>{g}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className={styles.relatedSection} aria-label="Related plants">
            <h2 className={styles.relatedTitle}>You might also like</h2>
            <div className="products-grid">
              {related.map(p => {
                // Inline import to avoid circular issues — use Link card
                return (
                  <Link key={p.id} href={`/product/${p.slug}`} className={`card ${styles.relatedCard}`}>
                    <div className={styles.relatedImage}>
                      <Image src={p.image} alt={p.name} fill sizes="200px" className={styles.relatedImg} />
                    </div>
                    <div className={styles.relatedBody}>
                      <p className={styles.relatedName}>{p.name}</p>
                      <p className={styles.relatedPrice}>${p.price}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
