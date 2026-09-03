import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail('');
  };

  const headingStyle = { fontSize: '1.05rem', fontWeight: '700', marginBottom: '25px', color: '#ffffff' };
  const linkStyle = { color: '#d1d5db', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' };
  const textStyle = { color: '#d1d5db', fontSize: '0.9rem', lineHeight: '1.8' };
  const iconStyle = { color: '#c27329', width: '18px', height: '18px', marginRight: '12px', flexShrink: 0 };

  return (
    <footer style={{ backgroundColor: '#000000', color: '#ffffff', fontFamily: '"Inter", sans-serif' }}>
      
      {/* LEAD MAGNET */}
      <div style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #1e293b', padding: '35px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
          <div>
            <h3 style={{ margin: '0 0 6px 0', fontSize: '1.25rem', fontWeight: '700', color: '#ffffff' }}>Stay updated with the Malta property market</h3>
            <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.95rem' }}>Subscribe to our newsletter for exclusive listings and news.</p>
          </div>
          <form onSubmit={handleSubscribe} style={{ display: 'flex', width: '100%', maxWidth: '420px', gap: '10px' }}>
            <input 
              type="email" 
              placeholder="Email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ flex: 1, padding: '12px 16px', borderRadius: '4px', border: 'none', outline: 'none', fontSize: '0.95rem' }}
            />
            <button 
              type="submit"
              style={{ backgroundColor: '#c27329', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '4px', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s', fontSize: '0.95rem' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#a36021'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#c27329'}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* 4-COLUMN FOOTER */}
      <div style={{ 
        maxWidth: '1200px', margin: '0 auto', padding: '70px 20px', 
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '50px' 
      }}>
        
        {/* Column 1: Logo & Contact */}
        <div>
          
          {/* --- UPDATED IMAGE LOGO --- */}
          <div style={{ marginBottom: '25px' }}>
            <img 
              src="/latest.png" 
              alt="Right Homes Real Estate" 
              style={{ height: '100px', width: 'auto', display: 'block', marginLeft: '-15px' }}
            />
          </div>
          {/* -------------------------- */}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', ...textStyle }}>
              <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              +356 9997 8211
            </div>
            <div style={{ display: 'flex', alignItems: 'center', ...textStyle }}>
              <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              office@righthomes.com.mt
            </div>
          </div>

          <div style={{ color: '#64748b', fontSize: '0.8rem', lineHeight: '1.8' }}>
            <div><strong>Company Reg:</strong> C 123456</div>
            <div><strong>VAT No:</strong> MT 98765432</div>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 style={headingStyle}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <li><Link to="/about" style={linkStyle} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#d1d5db'}>About us</Link></li>
            <li><Link to="/contact" style={linkStyle} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#d1d5db'}>Contact us</Link></li>
            <li><Link to="/articles" style={linkStyle} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#d1d5db'}>Blog list</Link></li>
          </ul>
        </div>

        {/* Column 3: Properties */}
        <div>
          <h4 style={headingStyle}>Properties</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <li><Link to="/" style={linkStyle} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#d1d5db'}>Residential Properties For Sale</Link></li>
            <li><Link to="/" style={linkStyle} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#d1d5db'}>Commercial Properties For Sale</Link></li>
          </ul>
        </div>

        {/* Column 4: About Us */}
        <div>
          <h4 style={headingStyle}>About Us</h4>
          <p style={{ ...textStyle, margin: '0 0 20px 0', textAlign: 'justify' }}>
            At Right Homes, we specialize in helping clients discover their perfect property. Whether you're buying, selling or investing, our experienced team is here to provide expert guidance and tailored solutions to meet your unique needs. With a strong commitment to professionalism, transparency, and exceptional service, we aim to make every real estate journey smooth, stress-free, and rewarding.
          </p>
          <p style={{ ...textStyle, margin: 0 }}>
            Let us help you find more than just a property—<br/>
            let us help you find a place to call home.
          </p>
        </div>

      </div>

      {/* COPYRIGHT & LEGAL BAR */}
      <div style={{ borderTop: '1px solid #1e293b', padding: '25px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '15px' }}>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem' }}>
            &copy; {new Date().getFullYear()} Right Homes Real Estate. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#d1d5db'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>Privacy Policy</Link>
            <Link to="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#d1d5db'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>Disclaimer</Link>
          </div>
        </div>
      </div>
      
    </footer>
  );
}