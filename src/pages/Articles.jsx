import { motion } from 'framer-motion';

// --- MOCK DATA ---
const ARTICLES = [
  {
    id: 1,
    title: 'Welcome To Right Homes Real Estate: Your Trusted Real Estate Partner In Malta',
    date: '12/4/2026',
    excerpt: 'At Right Homes, we are passionate about connecting people with their dream properties across the stunning Maltese Islands. As a newly established real estate agency...',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Top 5 Investment Hotspots in Gozo for 2026',
    date: '08/4/2026',
    excerpt: 'Discover the most promising emerging neighborhoods in Gozo. From quiet villages to bustling coastal towns, find out where your investment will yield the best returns.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'A First-Time Buyer’s Guide to Navigating the Maltese Property Market',
    date: '28/3/2026',
    excerpt: 'Buying your first home can be daunting. We break down the process step-by-step, from securing a mortgage to understanding notary fees and stamp duty.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Interior Design Trends: Maximizing Space in Modern Apartments',
    date: '15/3/2026',
    excerpt: 'Learn how to make the most of your square footage with smart storage solutions, lighting techniques, and the latest minimalist interior design trends.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    title: 'Understanding Property Taxes and SDA Developments',
    date: '02/3/2026',
    excerpt: 'Special Designated Areas (SDAs) offer unique benefits for foreign investors. Here is everything you need to know about purchasing property within an SDA in Malta.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    title: 'The Rise of Eco-Friendly Homes: Sustainable Living',
    date: '20/2/2026',
    excerpt: 'Sustainability is no longer just a buzzword. Explore how green technologies and energy-efficient building materials are reshaping the local real estate landscape.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
  }
];

export default function ArticlesPage() {
  return (
    <div style={{ width: '100%', fontFamily: '"Inter", sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      
      {/* --- HERO HEADER SECTION --- */}
      <div style={{ backgroundColor: '#000', padding: '80px 20px', color: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 style={{ fontSize: '3.5rem', fontWeight: '800', margin: '0 0 10px 0', letterSpacing: '-1px' }}>
              Our Articles
            </h1>
            <p style={{ fontStyle: 'italic', fontSize: '1.2rem', color: '#d1d5db', margin: '0 0 20px 0' }}>
              See Our Latest Articles & News
            </p>
            <p style={{ fontSize: '0.95rem', color: '#9ca3af', fontWeight: '500', letterSpacing: '0.5px' }}>
              <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>
                Home
              </span> 
              {' / '}
              <span style={{ color: '#fff' }}>Blog list</span>
            </p>
          </motion.div>
        </div>
      </div>

      {/* --- MAIN CONTENT SECTION --- */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
        
        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '50px', textAlign: 'right' }}>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ fontSize: '2.5rem', color: '#b4690e', fontWeight: '800', margin: '0 0 10px 0', letterSpacing: '-0.5px' }}>
              Latest News
            </h2>
            <p style={{ color: '#64748b', fontSize: '1rem', margin: 0 }}>
              We post regularly most powerful articles for help and support.
            </p>
          </motion.div>
        </div>

        {/* Articles Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
          gap: '40px' 
        }}>
          {ARTICLES.map((article, index) => (
            <motion.div 
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              style={{ 
                backgroundColor: 'white', 
                borderRadius: '16px', 
                overflow: 'hidden',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.08)',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                border: '1px solid #f1f5f9'
              }}
            >
              {/* Image Container */}
              <div style={{ height: '240px', width: '100%', overflow: 'hidden' }}>
                <img 
                  src={article.image} 
                  alt={article.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
              </div>

              {/* Content Container */}
              <div style={{ padding: '30px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                
                {/* Date Badge */}
                <div style={{ 
                  backgroundColor: '#0f766e', // The dark teal from your image
                  color: 'white', 
                  padding: '6px 14px', 
                  borderRadius: '6px', 
                  fontSize: '0.8rem', 
                  fontWeight: '700', 
                  display: 'inline-block',
                  width: 'fit-content',
                  marginBottom: '16px',
                  letterSpacing: '0.5px'
                }}>
                  {article.date}
                </div>

                {/* Article Title */}
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  color: '#b4690e', // The copper/brown from your image
                  fontWeight: '700', 
                  lineHeight: '1.4',
                  margin: '0 0 12px 0'
                }}>
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p style={{ 
                  color: '#64748b', 
                  fontSize: '0.95rem', 
                  lineHeight: '1.6',
                  margin: '0 0 24px 0',
                  flex: 1
                }}>
                  {article.excerpt}
                </p>

                {/* Read More Link */}
                <div style={{ 
                  color: '#0f172a', 
                  fontWeight: '700', 
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  Read Article <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}