import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// --- MOCK DATA ---
const PROPERTIES = [
  { id: 1, title: 'Sea View Penthouse', location: "St Julian's", price: '€850,000', beds: 3, baths: 2, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', reference: 'SPTH13328', type: 'Penthouses' },
  { id: 2, title: 'Modern Maisonette', location: 'Mellieha', price: '€350,000', beds: 2, baths: 2, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', reference: 'SAPT13326', type: 'Apartments' },
  { id: 3, title: 'Traditional Farmhouse', location: 'Gozo', price: '€1,200,000', beds: 4, baths: 3, image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80', reference: 'FARM10021', type: 'Houses' },
];

const PROPERTY_TYPE_OPTIONS = ["Apartments", "Blocks", "Commercials", "Constructions", "Developments/SDA's", "Fields", "Garages", "Houses", "Maisonettes", "Penthouses", "Villa"];
const parsePrice = (priceString) => Number(priceString.replace(/[^0-9.-]+/g, ""));

export default function Home() {
  // --- RESPONSIVE STATE ---
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900); 
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter States
  const [filters, setFilters] = useState({ referenceNumber: '', listingType: 'For Sale', propertyCategory: 'Residential', propertyTypes: [], locality: '', minPrice: '', maxPrice: '', bedrooms: '', bathrooms: '', minArea: '', maxArea: '' });
  const [appliedFilters, setAppliedFilters] = useState(filters);
  const [sortOrder, setSortOrder] = useState('Latest Properties');
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsTypeDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFilterChange = (e) => setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleTypeToggle = (type) => setFilters(prev => ({ ...prev, propertyTypes: prev.propertyTypes.includes(type) ? prev.propertyTypes.filter(t => t !== type) : [...prev.propertyTypes, type] }));
  const handleSelectAllTypes = () => setFilters(prev => ({ ...prev, propertyTypes: prev.propertyTypes.length === PROPERTY_TYPE_OPTIONS.length ? [] : [...PROPERTY_TYPE_OPTIONS] }));
  const handleSearchClick = () => setAppliedFilters(filters);

  // Active Filter Logic
  let processedProperties = PROPERTIES.filter(property => {
    if (appliedFilters.referenceNumber && !property.reference.toLowerCase().includes(appliedFilters.referenceNumber.toLowerCase())) return false;
    if (appliedFilters.propertyTypes.length > 0 && !appliedFilters.propertyTypes.includes(property.type)) return false;
    if (appliedFilters.locality && property.location !== appliedFilters.locality) return false;
    const propertyPrice = parsePrice(property.price);
    if (appliedFilters.minPrice && propertyPrice < Number(appliedFilters.minPrice)) return false;
    if (appliedFilters.maxPrice && propertyPrice > Number(appliedFilters.maxPrice)) return false;
    if (appliedFilters.bedrooms && property.beds < Number(appliedFilters.bedrooms)) return false;
    if (appliedFilters.bathrooms && property.baths < Number(appliedFilters.bathrooms)) return false;
    return true;
  });

  // Active Sort Logic
  processedProperties = processedProperties.sort((a, b) => {
    if (sortOrder === 'Price (Low to High)') return parsePrice(a.price) - parsePrice(b.price);
    if (sortOrder === 'Price (High to Low)') return parsePrice(b.price) - parsePrice(a.price);
    return b.id - a.id; 
  });

  // Shared Styles
  const inputStyle = { width: '100%', padding: '12px 16px', fontSize: '0.95rem', border: '1px solid #e2e8f0', borderRadius: '6px', outline: 'none', backgroundColor: '#fff', boxSizing: 'border-box' };
  const labelStyle = { display: 'block', fontSize: '0.85rem', color: '#c27329', fontWeight: '700', marginBottom: '8px' };
  const formGroupStyle = { marginBottom: '20px', width: '100%' };

  return (
    // Added boxSizing here to prevent horizontal scrollbars on the whole page
    <div style={{ minHeight: '100vh', width: '100%', boxSizing: 'border-box', backgroundColor: '#f8fafc', padding: isMobile ? '20px 15px' : '40px 20px', fontFamily: '"Inter", sans-serif' }}>
      
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '30px', flexDirection: isMobile ? 'column' : 'row' }}>
        
        {/* --- LEFT SIDEBAR (FILTERS) --- */}
        <div style={{ 
          width: isMobile ? '100%' : '320px', 
          boxSizing: 'border-box', // <-- THIS FIXES THE OVERFLOW OFF THE SCREEN
          flexShrink: 0, backgroundColor: 'white', padding: isMobile ? '20px' : '24px', 
          borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
          border: '1px solid #f1f5f9', height: 'fit-content'
        }}>
          
          <div style={formGroupStyle}>
            <input type="text" name="referenceNumber" placeholder="Reference Number" value={filters.referenceNumber} onChange={handleFilterChange} style={inputStyle} />
          </div>

          {/* Added flexWrap: 'wrap' so radio buttons don't squeeze out of bounds on tiny phones */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '15px', marginBottom: '20px', fontSize: '0.95rem', color: '#1e293b' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}><input type="radio" name="listingType" value="For Sale" checked={filters.listingType === 'For Sale'} onChange={handleFilterChange} style={{ marginRight: '8px', cursor: 'pointer' }}/>For Sale</label>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}><input type="radio" name="listingType" value="For Rent" checked={filters.listingType === 'For Rent'} onChange={handleFilterChange} style={{ marginRight: '8px', cursor: 'pointer' }}/>For Rent</label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}><input type="radio" name="propertyCategory" value="Residential" checked={filters.propertyCategory === 'Residential'} onChange={handleFilterChange} style={{ marginRight: '8px', cursor: 'pointer' }}/>Residential</label>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}><input type="radio" name="propertyCategory" value="Commercial" checked={filters.propertyCategory === 'Commercial'} onChange={handleFilterChange} style={{ marginRight: '8px', cursor: 'pointer' }}/>Commercial</label>
            </div>
          </div>

          {/* CUSTOM PROPERTY TYPE DROPDOWN */}
          <div style={{ ...formGroupStyle, position: 'relative' }} ref={dropdownRef}>
            <label style={labelStyle}>Property type</label>
            <div 
              onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
              style={{ ...inputStyle, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: filters.propertyTypes.length > 0 ? '#0f172a' : '#64748b' }}
            >
              <span>{filters.propertyTypes.length === 0 ? "Type" : filters.propertyTypes.length === PROPERTY_TYPE_OPTIONS.length ? "All Selected" : `${filters.propertyTypes.length} Selected`}</span>
              <span style={{ fontSize: '0.8rem' }}>▼</span>
            </div>
            {isTypeDropdownOpen && (
              <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '4px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '6px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', zIndex: 50, maxHeight: '300px', overflowY: 'auto' }}>
                <div onClick={handleSelectAllTypes} style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: '700', color: '#c27329' }}>
                  <input type="checkbox" checked={filters.propertyTypes.length === PROPERTY_TYPE_OPTIONS.length} readOnly style={{ cursor: 'pointer' }} /> Select all
                </div>
                {PROPERTY_TYPE_OPTIONS.map((type) => (
                  <div key={type} onClick={() => handleTypeToggle(type)} style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: '#1e293b', fontSize: '0.95rem' }}>
                    <input type="checkbox" checked={filters.propertyTypes.includes(type)} readOnly style={{ cursor: 'pointer' }} /> {type}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Locality</label>
            <select name="locality" value={filters.locality} onChange={handleFilterChange} style={inputStyle}>
              <option value="">Locality</option>
              <option value="Gozo">Gozo</option>
              <option value="Mellieha">Mellieha</option>
              <option value="St Julian's">St Julian's</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', ...formGroupStyle }}>
            <div style={{ flex: '1 1 calc(50% - 15px)', minWidth: '120px' }}><label style={labelStyle}>Min Price</label><input type="number" name="minPrice" placeholder="Min" value={filters.minPrice} onChange={handleFilterChange} style={inputStyle} /></div>
            <div style={{ flex: '1 1 calc(50% - 15px)', minWidth: '120px' }}><label style={labelStyle}>Max Price</label><input type="number" name="maxPrice" placeholder="Max" value={filters.maxPrice} onChange={handleFilterChange} style={inputStyle} /></div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', ...formGroupStyle }}>
            <div style={{ flex: '1 1 calc(50% - 15px)', minWidth: '120px' }}>
              <label style={labelStyle}>Bedrooms</label>
              <select name="bedrooms" value={filters.bedrooms} onChange={handleFilterChange} style={inputStyle}>
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
              </select>
            </div>
            <div style={{ flex: '1 1 calc(50% - 15px)', minWidth: '120px' }}>
              <label style={labelStyle}>Bathrooms</label>
              <select name="bathrooms" value={filters.bathrooms} onChange={handleFilterChange} style={inputStyle}>
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
              </select>
            </div>
          </div>

          <button onClick={handleSearchClick} style={{ 
            width: '100%', boxSizing: 'border-box', backgroundColor: '#000', color: '#fff', padding: '16px', borderRadius: '8px', 
            fontWeight: '700', border: 'none', cursor: 'pointer', marginTop: '10px', fontSize: '1rem',
            transition: 'background-color 0.2s'
          }}>
            Find Properties
          </button>
        </div>

        {/* --- RIGHT MAIN CONTENT (GRID) --- */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: '15px', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '1.3rem', color: '#c27329', fontWeight: '800', margin: 0 }}>
              {processedProperties.length} Properties Found.
            </h2>
            
            <div style={{ fontSize: '0.95rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Sort by: 
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{ border: 'none', backgroundColor: 'transparent', fontWeight: '700', color: '#1e293b', cursor: 'pointer', outline: 'none', fontSize: '0.95rem' }}>
                <option value="Latest Properties">Latest Properties</option>
                <option value="Price (Low to High)">Price (Low to High)</option>
                <option value="Price (High to Low)">Price (High to Low)</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
            {processedProperties.map((property, index) => (
              <motion.div key={property.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.5 }} whileHover={{ y: -8, transition: { duration: 0.2 } }} style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.08)', border: '1px solid #f1f5f9', cursor: 'pointer' }}>
                <div style={{ height: '240px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                  <img src={property.image} alt={property.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'} />
                  <div style={{ position: 'absolute', top: '15px', left: '15px', backgroundColor: '#000', padding: '6px 12px', borderRadius: '6px', fontWeight: '700', fontSize: '0.8rem', color: '#fff', letterSpacing: '0.5px' }}>For Sale</div>
                </div>

                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <span style={{ backgroundColor: '#fff7ed', color: '#c27329', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>{property.type}</span>
                      <p style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: '600', marginTop: '12px', marginBottom: '6px' }}>{property.reference}</p>
                      <p style={{ color: '#64748b', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>📍 {property.location}</p>
                    </div>
                  </div>
                  
                  <div style={{ borderTop: '1px solid #f1f5f9', margin: '20px 0' }}></div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a' }}>{property.price}</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#c27329' }}>More detail →</span>
                  </div>

                  <div style={{ display: 'flex', gap: '15px', marginTop: '15px', color: '#64748b', fontSize: '0.9rem', fontWeight: '500' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>🛏️ {property.beds}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>🛁 {property.baths}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}