import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- FULL ARTICLE DATA INCORPORATING LEAD MAGNET CONTENT ---
const ARTICLES = [
  {
    id: 1,
    title: 'The Expat’s Essential Guide to Buying Property in Malta',
    date: '12/4/2026',
    excerpt: 'Moving to Malta offers Mediterranean sunshine, exceptional safety, an attractive tax regime, and vibrant coastal living. However, for foreign nationals, navigating real estate transactions requires a clear understanding of local regulations, acquisition permits, and strategic zoning rules.',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80',
    content: (
      <div style={{ color: '#334155', lineHeight: '1.7', fontSize: '1.05rem' }}>
        <h4 style={{ color: '#b4690e', fontSize: '1.3rem', fontWeight: '700', marginBottom: '20px' }}>Permits, Tax Structures & Special Designated Areas (SDAs) Explained</h4>
        <p style={{ marginBottom: '20px' }}>Moving to Malta offers Mediterranean sunshine, exceptional safety, an attractive tax regime, and vibrant coastal living. However, for foreign nationals, navigating real estate transactions requires a clear understanding of local regulations, acquisition permits, and strategic zoning rules.</p>
        
        <h5 style={{ color: '#0f172a', fontSize: '1.15rem', fontWeight: '700', marginTop: '30px', marginBottom: '10px' }}>1. AIP Permits vs. Special Designated Areas (SDAs)</h5>
        <p style={{ marginBottom: '15px' }}>Understanding where and how you can buy is the most critical first step for foreign buyers:</p>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <li><strong>Acquisition of Immovable Property (AIP) Permit:</strong> Non-EU citizens (and EU citizens who have not resided in Malta continuously for 5 years) purchasing standard residential properties generally require an AIP permit (costing a flat fee of €233). Properties acquired via AIP must serve as the primary residence and cannot be rented out to third parties.</li>
          <li><strong>Special Designated Areas (SDAs):</strong> SDAs are premier, high-end luxury developments located across Malta and Gozo (such as Portomaso, Tigné Point, and Mercury Towers). In SDAs, non-Maltese buyers can acquire multiple properties without needing an AIP permit, enjoy complete freedom to lease their units for high rental yields, and benefit from strong capital appreciation.</li>
        </ul>

        <h5 style={{ color: '#0f172a', fontSize: '1.15rem', fontWeight: '700', marginTop: '30px', marginBottom: '10px' }}>2. Ancillary Costs & Fees Beyond the Purchase Price</h5>
        <p style={{ marginBottom: '15px' }}>When budgeting for your property purchase in Malta, expect additional closing costs of approximately 7% to 8% above the agreed purchase price:</p>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <li><strong>Stamp Duty:</strong> Standard duty is 5% of the total purchase price (1% paid upon signing the Konvenju, 4% paid upon final deed execution).</li>
          <li><strong>Notary Fees:</strong> Typically ranges between 1.0% and 1.5% for title searches, tax declarations, and legal drafting.</li>
          <li><strong>Architect Inspection Fees:</strong> Standard structural survey and planning authority verification fees (approx. €300 - €800).</li>
        </ul>

        <h5 style={{ color: '#0f172a', fontSize: '1.15rem', fontWeight: '700', marginTop: '30px', marginBottom: '10px' }}>3. The 3 Key Milestones of the Purchase Process</h5>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <li><strong>Step 1: Signing the Konvenju (Preliminary Agreement):</strong> The buyer and seller sign a legally binding preliminary contract. A 10% deposit is held in escrow, and 1% provisional stamp duty is paid. The Konvenju typically lasts 3 to 6 months.</li>
          <li><strong>Step 2: Notary Title Searches & AIP Application:</strong> The notary conducts land registry searches to verify unencumbered title. If an AIP permit is required, the application is lodged with the Ministry of Finance.</li>
          <li><strong>Step 3: Execution of the Final Deed:</strong> Both parties meet to sign the final deed. Remaining funds (90% balance + remaining stamp duty + notary fees) are settled, and keys are handed over.</li>
        </ul>
      </div>
    )
  },
  {
    id: 2,
    title: 'Maximizing Rental Yields in Malta: High-Growth Neighborhoods & Tax Strategies',
    date: '08/4/2026',
    excerpt: 'Malta’s booming economy, expanding tech and iGaming sectors, and year-round tourism generate continuous demand in the residential rental market. With average gross yields ranging from 5% to 8%, strategic property acquisition offers consistent cash flow and long-term equity growth.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    content: (
      <div style={{ color: '#334155', lineHeight: '1.7', fontSize: '1.05rem' }}>
        <h4 style={{ color: '#b4690e', fontSize: '1.3rem', fontWeight: '700', marginBottom: '20px' }}>A Data-Driven Guide for Buy-to-Let Investors</h4>
        <p style={{ marginBottom: '20px' }}>Malta’s booming economy, expanding tech and iGaming sectors, and year-round tourism generate continuous demand in the residential rental market. With average gross yields ranging from 5% to 8%, strategic property acquisition offers consistent cash flow and long-term equity growth.</p>
        
        <h5 style={{ color: '#0f172a', fontSize: '1.15rem', fontWeight: '700', marginTop: '30px', marginBottom: '15px' }}>Neighborhood Yield & Target Tenant Breakdown</h5>
        
        <div style={{ overflowX: 'auto', marginBottom: '30px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#0f172a', color: 'white', textAlign: 'left' }}>
                <th style={{ padding: '12px', border: '1px solid #cbd5e1' }}>Target Zone</th>
                <th style={{ padding: '12px', border: '1px solid #cbd5e1' }}>Property Style</th>
                <th style={{ padding: '12px', border: '1px solid #cbd5e1' }}>Avg. Gross Yield</th>
                <th style={{ padding: '12px', border: '1px solid #cbd5e1' }}>Target Tenant Persona</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '12px', border: '1px solid #cbd5e1', fontWeight: '600' }}>Waterfront / SDAs (Sliema, St. Julian's, Ta' Xbiex)</td>
                <td style={{ padding: '12px', border: '1px solid #cbd5e1' }}>Luxury Penthouses & Apartments</td>
                <td style={{ padding: '12px', border: '1px solid #cbd5e1', color: '#0f766e', fontWeight: '700' }}>4.5% – 6.0% (High Liquidity)</td>
                <td style={{ padding: '12px', border: '1px solid #cbd5e1' }}>iGaming Executives, Corporate Expats</td>
              </tr>
              <tr style={{ backgroundColor: '#f8fafc' }}>
                <td style={{ padding: '12px', border: '1px solid #cbd5e1', fontWeight: '600' }}>Gentrifying Hubs (Pietà, Msida, Three Cities)</td>
                <td style={{ padding: '12px', border: '1px solid #cbd5e1' }}>Renovated Apartments, Townhouses</td>
                <td style={{ padding: '12px', border: '1px solid #cbd5e1', color: '#0f766e', fontWeight: '700' }}>6.0% – 8.0% (High Growth)</td>
                <td style={{ padding: '12px', border: '1px solid #cbd5e1' }}>Healthcare Staff, Tech Professionals, Students</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', border: '1px solid #cbd5e1', fontWeight: '600' }}>Gozo & North (Xagħra, Mellieħa)</td>
                <td style={{ padding: '12px', border: '1px solid #cbd5e1' }}>Character Houses, Holiday Units</td>
                <td style={{ padding: '12px', border: '1px solid #cbd5e1', color: '#0f766e', fontWeight: '700' }}>5.0% – 7.0% (Seasonal/Short-Let)</td>
                <td style={{ padding: '12px', border: '1px solid #cbd5e1' }}>Digital Nomads, Vacationers, Eco-Tourists</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h5 style={{ color: '#0f172a', fontSize: '1.15rem', fontWeight: '700', marginTop: '30px', marginBottom: '10px' }}>3 Strategic Investor Takeaways</h5>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <li><strong>Opt for the 15% Flat Tax Regime:</strong> Malta allows landlords to opt for a favorable flat tax rate of 15% on gross rental income from residential leases, significantly reducing administrative overhead compared to standard progressive tax rates.</li>
          <li><strong>Prioritize High-Demand Amenities:</strong> Rental properties offering private outdoor terraces, dedicated underground parking, and lift access achieve 15% to 20% higher rental rates and minimize vacancy turnover.</li>
          <li><strong>Utilize Professional Property Management:</strong> Outsourcing tenant screening, lease registration with the Housing Authority, maintenance, and utility allocation ensures high retention rates and passive income security for overseas owners.</li>
        </ul>
      </div>
    )
  },
  {
    id: 3,
    title: 'The First-Time Buyer’s Checklist: Schemes, UCAs & Renovation Grants',
    date: '28/3/2026',
    excerpt: 'Buying your first home is one of life\'s biggest milestones. In Malta, the government provides lucrative duty exemptions and restoration grants that can save first-time buyers over €15,000 when structured correctly.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    content: (
      <div style={{ color: '#334155', lineHeight: '1.7', fontSize: '1.05rem' }}>
        <h4 style={{ color: '#b4690e', fontSize: '1.3rem', fontWeight: '700', marginBottom: '20px' }}>How to Save Thousands When Purchasing Your First Home in Malta</h4>
        <p style={{ marginBottom: '20px' }}>Buying your first home is one of life's biggest milestones. In Malta, the government provides lucrative duty exemptions and restoration grants that can save first-time buyers over €15,000 when structured correctly.</p>

        <h5 style={{ color: '#0f172a', fontSize: '1.15rem', fontWeight: '700', marginTop: '30px', marginBottom: '10px' }}>1. Government Schemes & Tax Savings</h5>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <li><strong>First-Time Buyer Stamp Duty Exemption:</strong> First-time home buyers are exempt from paying the 5% stamp duty on the first €200,000 of the property value, resulting in direct savings of up to €10,000.</li>
          <li><strong>Urban Conservation Area (UCA) Incentives:</strong> Purchasing a home located within a designated UCA or a property that has been vacant for over 20 years yields complete stamp duty exemptions on property value up to €750,000, plus VAT refunds on restoration expenses up to €54,000.</li>
        </ul>

        <h5 style={{ color: '#0f172a', fontSize: '1.15rem', fontWeight: '700', marginTop: '30px', marginBottom: '10px' }}>2. Comparing Property Types: Traditional vs. Modern</h5>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <li><strong>Houses of Character & Townhouses:</strong> Offer historic charm, stone features, high ceilings, and courtyard spaces. Requires careful structural inspection for dampness, roof soundness, and plumbing upgrades.</li>
          <li><strong>Modern Apartments & Maisonettes:</strong> Lower initial maintenance, lift accessibility, turnkey living, and standard floor layouts. Ideal for busy professionals.</li>
        </ul>

        <h5 style={{ color: '#0f172a', fontSize: '1.15rem', fontWeight: '700', marginTop: '30px', marginBottom: '10px' }}>3. Essential Pre-Offer Checklist</h5>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <li><strong>Step 1: Secure Bank Pre-Approval:</strong> Obtain a formal Home Loan Agreement in Principle from your bank to establish your maximum purchasing budget.</li>
          <li><strong>Step 2: Architect Planning Check:</strong> Have your architect verify Planning Authority (PA) permits to confirm the property matches approved layout plans and has no illegal developments.</li>
          <li><strong>Step 3: Negotiate Konvenju Duration:</strong> Ensure the preliminary agreement grants sufficient time (at least 3–4 months) to complete bank sanction letters and searches.</li>
        </ul>
      </div>
    )
  },
  {
    id: 4,
    title: 'The Maltese Konvenju Decoded: Essential Conditions & Legal Safeguards for Buyers',
    date: '15/3/2026',
    excerpt: 'The Konvenju (Promise of Sale) is the single most critical legal document in a Maltese property purchase. Unlike informal reservation agreements in other European jurisdictions, a signed Konvenju is a binding contract where a default can lead to the forfeiture of your 10% deposit or court-ordered enforcement.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    content: (
      <div style={{ color: '#334155', lineHeight: '1.7', fontSize: '1.05rem' }}>
        <p style={{ marginBottom: '20px' }}>The Konvenju (Promise of Sale) is the single most critical legal document in a Maltese property purchase. Unlike informal reservation agreements in other European jurisdictions, a signed Konvenju is a binding contract where a default can lead to the forfeiture of your 10% deposit or court-ordered enforcement.</p>

        <h5 style={{ color: '#0f172a', fontSize: '1.15rem', fontWeight: '700', marginTop: '30px', marginBottom: '10px' }}>Key Clauses Every Buyer Must Insert:</h5>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <li><strong>Subject to Bank Sanction:</strong> Protects your deposit if your bank fails to issue the final mortgage sanction letter within the agreement period.</li>
          <li><strong>Planning Authority (PA) Compliance:</strong> Mandatory clause requiring the seller to rectify any illegal additions or unpermitted structural changes before the final deed.</li>
          <li><strong>Subject to AIP / Residency Approval:</strong> Essential for foreign buyers requiring an Acquisition of Immovable Property permit.</li>
          <li><strong>Clear Title & Unencumbered Search:</strong> Ensures all outstanding mortgages, hypothecs, and legal claims against the seller are discharged prior to transfer.</li>
        </ul>

        <h5 style={{ color: '#0f172a', fontSize: '1.15rem', fontWeight: '700', marginTop: '30px', marginBottom: '10px' }}>Financial Commitments at Signing:</h5>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <li><strong>10% Deposit:</strong> Paid into a secure escrow account managed by the notary.</li>
          <li><strong>1% Provisional Stamp Duty:</strong> Registered with the tax authority within 21 days of signing.</li>
        </ul>

        <h5 style={{ color: '#0f172a', fontSize: '1.15rem', fontWeight: '700', marginTop: '30px', marginBottom: '10px' }}>The Role of the Notary Public:</h5>
        <p>In Malta, the notary is selected by the buyer but acts as a neutral public officer who conducts 30-year title searches, verifies ground rent (ċens), and registers tax transfers.</p>
      </div>
    )
  },
  {
    id: 5,
    title: 'Restoring Historic Malta: A Buyer’s Guide to Houses of Character, UCAs & €54,000 Grants',
    date: '02/3/2026',
    excerpt: 'Maltese Houses of Character, Townhouses, and Palazzos located within Urban Conservation Areas (UCAs) offer unmatched architectural beauty, but require dedicated planning and restoration strategies.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
    content: (
      <div style={{ color: '#334155', lineHeight: '1.7', fontSize: '1.05rem' }}>
        <p style={{ marginBottom: '20px' }}>Maltese Houses of Character, Townhouses, and Palazzos located within Urban Conservation Areas (UCAs) offer unmatched architectural beauty, but require dedicated planning and restoration strategies.</p>

        <h5 style={{ color: '#0f172a', fontSize: '1.15rem', fontWeight: '700', marginTop: '30px', marginBottom: '15px' }}>Incentives & Grants Breakdown</h5>
        
        <div style={{ overflowX: 'auto', marginBottom: '30px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#0f172a', color: 'white', textAlign: 'left' }}>
                <th style={{ padding: '12px', border: '1px solid #cbd5e1' }}>Incentive / Feature</th>
                <th style={{ padding: '12px', border: '1px solid #cbd5e1' }}>UCA & Traditional Property Benefit</th>
                <th style={{ padding: '12px', border: '1px solid #cbd5e1' }}>Financial Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '12px', border: '1px solid #cbd5e1', fontWeight: '600' }}>Stamp Duty Relief</td>
                <td style={{ padding: '12px', border: '1px solid #cbd5e1' }}>0% Stamp Duty on the first €750,000 of the transfer value.</td>
                <td style={{ padding: '12px', border: '1px solid #cbd5e1', color: '#0f766e', fontWeight: '700' }}>Saves up to €37,500 on stamp duty.</td>
              </tr>
              <tr style={{ backgroundColor: '#f8fafc' }}>
                <td style={{ padding: '12px', border: '1px solid #cbd5e1', fontWeight: '600' }}>Restoration Grant</td>
                <td style={{ padding: '12px', border: '1px solid #cbd5e1' }}>18% VAT refund on qualifying restoration and finishing costs.</td>
                <td style={{ padding: '12px', border: '1px solid #cbd5e1', color: '#0f766e', fontWeight: '700' }}>Capped at €54,000 per property.</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', border: '1px solid #cbd5e1', fontWeight: '600' }}>First-Time Buyer UCA Cash Grant</td>
                <td style={{ padding: '12px', border: '1px solid #cbd5e1' }}>Direct cash grant for buying a UCA/vacant traditional home.</td>
                <td style={{ padding: '12px', border: '1px solid #cbd5e1', color: '#0f766e', fontWeight: '700' }}>€15,000 (Malta) / €40,000 (Gozo).</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h5 style={{ color: '#0f172a', fontSize: '1.15rem', fontWeight: '700', marginTop: '30px', marginBottom: '10px' }}>3 Architectural Restoration Factors:</h5>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <li><strong>Planning Authority Restrictions:</strong> External facades, traditional timber balconies (gallens), limestone arches, and stone slab ceilings (ċangatura) must be preserved according to heritage guidelines.</li>
          <li><strong>Ground Rent (Ċens) Redemption:</strong> Many traditional properties carry historic perpetual or temporary ground rents that must be researched and legally redeemed or converted before completion.</li>
          <li><strong>Moisture & Ventilation:</strong> Globigerina limestone requires specialized breathable lime mortars and damp-proofing solutions (damp-proof courses) to avoid long-term salt dampness.</li>
        </ul>
      </div>
    )
  },
  {
    id: 6,
    title: 'The Structural & Architectural Inspection Guide: Avoiding Hidden Costs Before You Buy',
    date: '20/2/2026',
    excerpt: 'In Malta, a bank\'s property valuation architect protects the bank\'s lending exposure, not the buyer\'s private interest. Commissioning an independent structural survey from a qualified architect (perit) before signing or concluding the Konvenju is essential.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    content: (
      <div style={{ color: '#334155', lineHeight: '1.7', fontSize: '1.05rem' }}>
        <p style={{ marginBottom: '20px' }}>In Malta, a bank's property valuation architect protects the bank's lending exposure, not the buyer's private interest. Commissioning an independent structural survey from a qualified architect (perit) before signing or concluding the Konvenju is essential.</p>

        <h5 style={{ color: '#0f172a', fontSize: '1.15rem', fontWeight: '700', marginTop: '30px', marginBottom: '10px' }}>Red Flags in Maltese Construction:</h5>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <li><strong>Rising Damp & Water Infiltration:</strong> Caused by porous limestone absorbing groundwater or degraded roof membrane insulation.</li>
          <li><strong>Unsanctioned Structural Alterations:</strong> Removal of load-bearing walls (ħajt ta' max-xaqquf) or illegal roof structures without PA permits.</li>
          <li><strong>Excavation Risks:</strong> Neighboring construction sites require joint structural condition reports to document preexisting cracks and protect your boundary walls.</li>
        </ul>

        <h5 style={{ color: '#0f172a', fontSize: '1.15rem', fontWeight: '700', marginTop: '30px', marginBottom: '10px' }}>Essential Inspection Protocol:</h5>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <li>Verify the approved Planning Authority drawings against physical layout.</li>
          <li>Inspect common area allocations, lift usage rights, and shared maintenance obligations in apartment blocks.</li>
          <li>Check electrical loading capacity and plumbing drainage connections to main sewage mains.</li>
        </ul>
      </div>
    )
  }
];

export default function ArticlesPage() {
  // State to track which article modal is open
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Lock scrolling on the main page when the modal is open
  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedArticle]);

  return (
    <div style={{ width: '100%', fontFamily: '"Inter", sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', position: 'relative' }}>
      
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
              onClick={() => setSelectedArticle(article)} // Open Modal on click
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
                  backgroundColor: '#0f766e', 
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
                  color: '#b4690e', 
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

      {/* --- FULL ARTICLE MODAL OVERLAY --- */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div 
            key="article-modal"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArticle(null)} // Click outside to close
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
              backgroundColor: 'rgba(0,0,0,0.75)', zIndex: 9999, 
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
              fontFamily: '"Inter", sans-serif'
            }}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 30 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.95, y: 30 }}
              onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
              style={{
                backgroundColor: 'white', 
                borderRadius: '16px', 
                maxWidth: '900px', 
                width: '100%', 
                maxHeight: '90vh', // Ensures it fits on screen
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                overflow: 'hidden'
              }}
            >
              {/* Sticky Header with Close Button */}
              <div style={{ 
                padding: '20px 30px', 
                borderBottom: '1px solid #e2e8f0', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                backgroundColor: '#f8fafc',
                position: 'sticky',
                top: 0,
                zIndex: 10
              }}>
                <div style={{ 
                  backgroundColor: '#0f766e', 
                  color: 'white', 
                  padding: '6px 14px', 
                  borderRadius: '6px', 
                  fontSize: '0.8rem', 
                  fontWeight: '700'
                }}>
                  {selectedArticle.date}
                </div>
                <button 
                  onClick={() => setSelectedArticle(null)}
                  style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748b', fontWeight: 'bold' }}
                >
                  ✕
                </button>
              </div>

              {/* Scrollable Content Area */}
              <div style={{ padding: '30px 40px', overflowY: 'auto' }}>
                <h2 style={{ fontSize: '2rem', color: '#0f172a', fontWeight: '800', lineHeight: '1.3', marginBottom: '30px' }}>
                  {selectedArticle.title}
                </h2>
                
                {/* Embedded JSX Content */}
                {selectedArticle.content}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}