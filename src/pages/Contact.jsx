import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); console.log('Form submitted:', formData); };

  const inputStyle = {
    width: '100%', padding: '15px 20px', fontSize: '1rem',
    backgroundColor: '#ffffff', border: '1px solid #e2e8f0', 
    borderRadius: '8px', outline: 'none', transition: 'all 0.3s ease',
    fontFamily: '"Inter", sans-serif', color: '#1e293b', boxSizing: 'border-box'
  };

  const handleFocus = (e) => {
    e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
    e.target.style.borderColor = '#3b82f6';
  };
  const handleBlur = (e) => {
    e.target.style.boxShadow = 'none';
    e.target.style.borderColor = '#e2e8f0';
  };

  const labelStyle = {
    display: 'block', marginBottom: '6px', fontSize: '0.9rem', 
    fontWeight: '600', color: '#64748b', textAlign: 'left'
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%', backgroundColor: '#f8fafc', fontFamily: '"Inter", sans-serif' }}>
      
      {/* --- 1. HERO BANNER (Upgraded to a rich gradient) --- */}
      <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', padding: '90px 20px 110px', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 style={{ color: '#ffffff', fontSize: '3.5rem', fontWeight: '700', margin: '0 0 10px 0', letterSpacing: '-1px' }}>
            Contact Us
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', margin: 0 }}>
            Home <span style={{ margin: '0 5px', color: '#475569' }}>/</span> Contact us
          </p>
        </motion.div>
      </div>

      {/* --- 2. MAIN CONTENT WRAPPER --- */}
      <div style={{ width: '100%', maxWidth: '1050px', margin: '-70px auto 100px', padding: '0 20px', boxSizing: 'border-box', position: 'relative', zIndex: 10 }}>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          style={{ 
            display: 'flex', flexWrap: 'wrap', backgroundColor: 'white',
            borderRadius: '16px', overflow: 'hidden',
            boxShadow: '0 20px 40px -15px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9'
          }}
        >
          {/* --- LEFT: THE FORM --- */}
          <div style={{ flex: '1 1 55%', padding: '50px', backgroundColor: '#ffffff', boxSizing: 'border-box' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: '700', marginBottom: '30px', marginTop: 0 }}>
              Send us a message
            </h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 45%' }}>
                  <label style={labelStyle}>Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} required />
                </div>
                <div style={{ flex: '1 1 45%' }}>
                  <label style={labelStyle}>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} required />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Subject</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} required />
              </div>

              <div>
                <label style={labelStyle}>Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} style={{ ...inputStyle, resize: 'vertical', minHeight: '130px' }} onFocus={handleFocus} onBlur={handleBlur} required />
              </div>

              <button type="submit" style={{ 
                  backgroundColor: '#0f172a', color: 'white', padding: '14px 28px', fontSize: '1rem',
                  borderRadius: '8px', border: 'none', fontWeight: '600', cursor: 'pointer',
                  marginTop: '5px', transition: 'all 0.2s ease', alignSelf: 'flex-start'
                }}
                onMouseEnter={(e) => { e.target.style.backgroundColor = '#3b82f6'; e.target.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.target.style.backgroundColor = '#0f172a'; e.target.style.transform = 'translateY(0)'; }}
              >
                Submit Request
              </button>
            </form>
          </div>

          {/* --- RIGHT: CONTACT INFO PANEL --- */}
          <div style={{ flex: '1 1 40%', backgroundColor: '#0f172a', padding: '50px', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxSizing: 'border-box' }}>
            <h2 style={{ color: '#ffffff', fontSize: '1.8rem', fontWeight: '700', margin: '0 0 15px 0' }}>
              Get In Touch
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.05rem', marginBottom: '45px', lineHeight: '1.6' }}>
              Whether you are looking to buy, sell, or rent, our team of experts is here to help you every step of the way.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', width: '45px', height: '45px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0, border: '1px solid rgba(255,255,255,0.1)' }}>📍</div>
                <div>
                  <h4 style={{ color: '#ffffff', margin: '0 0 5px 0', fontSize: '1.05rem', fontWeight: '600' }}>Office Location</h4>
                  <p style={{ margin: 0, color: '#94a3b8', lineHeight: '1.5', fontSize: '0.95rem' }}>100, Office 1, Hazy Views,<br/>Mdina Road, Zebbug, ZBG 9015</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', width: '45px', height: '45px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0, border: '1px solid rgba(255,255,255,0.1)' }}>✉️</div>
                <div>
                  <h4 style={{ color: '#ffffff', margin: '0 0 5px 0', fontSize: '1.05rem', fontWeight: '600' }}>Email Us</h4>
                  <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.95rem' }}>office@righthomes.com.mt</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', width: '45px', height: '45px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0, border: '1px solid rgba(255,255,255,0.1)' }}>📞</div>
                <div>
                  <h4 style={{ color: '#ffffff', margin: '0 0 5px 0', fontSize: '1.05rem', fontWeight: '600' }}>Call Us</h4>
                  <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.95rem' }}>+356 9997 8211</p>
                </div>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}