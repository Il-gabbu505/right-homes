import { useState, useEffect, Suspense, useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, useTexture } from '@react-three/drei';
import { motion as motion3d } from 'framer-motion-3d';
import { motion, AnimatePresence } from 'framer-motion';
import DoorModel from './Door'; 

// --- EXCLUSIVELY EXCEL DATA (Using Local Public Folder Images) ---
const MOCK_AGENTS = [
  { 
    id: 1, name: 'Caroline Agius', role: 'Receptionist', phone: '77160394', email: 'caroline@righthomes.com.mt', 
    image: '/caroline.jpg',
    specialization: 'Updating systems and ensuring smooth operations', experience: '1 Year', 
    tip: 'Direct people to the right agent.', fact: 'I am a little bit clumsy sometimes!'
  },
  { 
    id: 2, name: 'Clint Barbara', role: 'Real Estate Agent', phone: '79709796', email: 'clint@righthomes.com.mt', 
    image: '/clint.jpg',
    specialization: 'South/Central West Areas (Mqabba, Qrendi, Kirkop, Zurrieq, Safi, Siggiewi, Zebbug)', experience: '8 Years', 
    tip: 'Know your priorities, but keep an open mind. Focus on location and potential, because finishes can change, but fundamentals usually can’t.', fact: 'I’m a people person by nature. Even when off duty, I imagine how properties could be transformed.'
  },
  { 
    id: 3, name: 'Mehdi Bezine', role: 'Real Estate Agent', phone: '99978211', email: 'mehdi@righthomes.com.mt', 
    image: '/mehdi.jpg',
    specialization: 'Central & North Malta', experience: '11 Years', 
    tip: 'The best time to buy is always 5 years ago, the next best time is today!', fact: 'I’m a father of 3 daughters, love traveling and always learning.'
  },
  { 
    id: 4, name: 'Marlon Sammut', role: 'Real Estate Agent', phone: '79919212', email: 'marlon@righthomes.com.mt', 
    image: '/marlon.JPG',
    specialization: 'Central Malta', experience: '1 Year', 
    tip: 'If you love a property, act with confidence. Good opportunities don’t always stay on the market for long.', fact: 'I believe every property has a story, I just help people find theirs.'
  },
  { 
    id: 5, name: 'Quelin Sammut', role: 'Real Estate Agent', phone: '79958686', email: 'quelin@righthomes.com.mt', 
    image: '/quelin.JPG',
    specialization: 'Central Malta', experience: '4 Years', 
    tip: 'Be clear about your priorities, but keep an open mind. Sometimes the right property isn’t the one you initially pictured.', fact: 'I wanted to be an architect—now I just judge floor plans for a living.'
  },
  { 
    id: 6, name: 'Jeffrey Briffa Cauchi', role: 'Real Estate Agent', phone: '77098050', email: 'jeffrey@righthomes.com.mt', 
    image: '/jeffrey.jpg',
    specialization: 'Residential Property Sales', experience: 'Experienced Professional', 
    tip: 'Always view a property in person before making your final decision.', fact: 'Passionate about local Maltese architecture.'
  }
];

function InteriorBackground() {
  const texture = useTexture('/background.webp'); 
  return (
    <mesh position={[0, 0, -18]}>
      <planeGeometry args={[50, 30]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}

export default function About() {
  const [isEntered, setIsEntered] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null); 
  const carouselRef = useRef();
  
  useEffect(() => {
    const timer = setTimeout(() => setIsEntered(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 285 * 2; 
      carouselRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  const cameraWalkVariants = {
    initial: { z: 0 }, 
    entered: { z: 9, transition: { duration: 3.5, ease: "easeInOut", delay: 1.0 } } 
  };

  // OPTIMIZATION 1: Memoize the heavy 3D scene so it never re-renders when a modal is clicked
  const MemoizedCanvas = useMemo(() => (
    <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} />
        <Environment preset="city" />
        <Suspense fallback={null}>
          <motion3d.group variants={cameraWalkVariants} initial="initial" animate={isEntered ? "entered" : "initial"} position={[0, -1, 0]}>
            <DoorModel isEntered={isEntered} scale={1.7} position={[0, -1.5, -0.2]} />
            <mesh position={[-11.5, 3, -0.2]}><boxGeometry args={[20, 15, 0.5]} /><meshStandardMaterial color="#ecf0f1" /></mesh>
            <mesh position={[11.5, 3, -0.2]}><boxGeometry args={[20, 15, 0.5]} /><meshStandardMaterial color="#ecf0f1" /></mesh>
            <mesh position={[0, 7.5, -0.2]}><boxGeometry args={[3, 10, 0.5]} /><meshStandardMaterial color="#ecf0f1" /></mesh>
            <mesh position={[0, -1.9, 10]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[40, 20]} /><meshStandardMaterial color="#95a5a6" /></mesh>
            <InteriorBackground />
          </motion3d.group>
        </Suspense>
      </Canvas>
    </div>
  ), [isEntered]);

  // OPTIMIZATION 2: Memoize the agent cards list to prevent 6 heavy layout calculations on click
  const MemoizedAgentList = useMemo(() => (
    <div 
      ref={carouselRef} 
      className="hide-scroll"
      style={{ 
        display: 'flex', gap: '25px', overflowX: 'auto', padding: '30px 10px',
        scrollBehavior: 'smooth' 
      }}
    >
      {MOCK_AGENTS.map((agent, index) => (
        <motion.div 
          key={agent.id} 
          initial="hidden"
          animate={isEntered ? "visible" : "hidden"}
          whileHover="hover"
          onClick={() => setSelectedAgent(agent)} 
          variants={{
            hidden: { y: 50, opacity: 0, borderColor: '#f1f5f9', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' },
            visible: { 
              y: 0, opacity: 1, borderColor: '#f1f5f9', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)',
              transition: { delay: 2.0 + (index * 0.05), type: 'spring', stiffness: 100 }
            },
            hover: { 
              y: -12, 
              borderColor: '#c48b63', 
              boxShadow: '0 25px 50px -15px rgba(196, 139, 99, 0.4)',
              transition: { type: 'spring', stiffness: 300 }
            }
          }}
          style={{ 
            background: '#ffffff', padding: '40px 20px', borderRadius: '16px', 
            textAlign: 'center', borderStyle: 'solid', borderWidth: '1px',
            minWidth: '260px', flexShrink: 0, cursor: 'pointer',
            willChange: 'transform, opacity, box-shadow' // Hardware acceleration hint
          }}
        >
          <div style={{ 
            width: '130px', height: '140px', margin: '0 auto 25px', 
            backgroundColor: '#0a0a0a', 
            borderRadius: '60px 15px 60px 15px', 
            overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)'
          }}>
            <motion.img 
              src={agent.image} 
              alt={agent.name} 
              variants={{
                hidden: { scale: 1, opacity: 0.85 },
                visible: { scale: 1, opacity: 0.85 },
                hover: { scale: 1.15, opacity: 1 }
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>

          <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem', color: '#c48b63', fontWeight: '700' }}>{agent.name}</h3>
          <p style={{ margin: '0 0 20px 0', color: '#64748b', fontSize: '0.85rem', fontWeight: '500', minHeight: '20px' }}>{agent.role}</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', color: '#475569', fontSize: '0.8rem', fontWeight: '500' }}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              📞 +356 {agent.phone}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              ✉️ {agent.email}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  ), [isEntered]); // Only re-render list if 'isEntered' changes, ignore selectedAgent

  return (
    <div style={{ position: 'relative', height: '100vh', background: '#ecf0f1', overflow: 'hidden', fontFamily: '"Inter", sans-serif' }}>
      
      <style>{`
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* --- 1. THE 3D SCENE --- */}
      {MemoizedCanvas}

      {/* --- 2. THE UI OVERLAY --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isEntered ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 1.8 }} 
        style={{ 
          position: 'absolute', inset: 0, zIndex: 10, 
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
          background: 'rgba(255, 255, 255, 0.85)', 
          backdropFilter: 'blur(8px)', 
          paddingTop: '60px',
          overflowY: 'auto', 
          pointerEvents: isEntered ? 'auto' : 'none'
        }}
      >
        {/* --- OUR STORY --- */}
        <div style={{ maxWidth: '900px', textAlign: 'center', marginBottom: '50px', padding: '0 20px' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#c48b63', fontWeight: '800', marginBottom: '20px' }}>
            Our Story
          </h2>
          <p style={{ color: '#334155', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '15px', fontWeight: '500' }}>
            At Right Homes, we specialize in helping clients discover their perfect property. Whether you're buying, selling or investing, our experienced team is here to provide expert guidance and tailored solutions to meet your unique needs. With a strong commitment to professionalism, transparency, and exceptional service, we aim to make every real estate journey smooth, stress-free, and rewarding.
          </p>
          <p style={{ color: '#334155', fontSize: '1.05rem', lineHeight: '1.8', fontWeight: '700' }}>
            Let us help you find more than just a property — let us help you find a place to call home.
          </p>
        </div>

        {/* --- MEET OUR TEAM --- */}
        <h1 style={{ fontSize: '2.5rem', color: '#c48b63', marginBottom: '5px', fontWeight: '800' }}>
          Meet Our Team
        </h1>
        <p style={{ fontSize: '1rem', color: '#475569', marginBottom: '20px', fontWeight: '500' }}>
          Professional & Dedicated Team
        </p>
        
        <div style={{ position: 'relative', width: '95%', maxWidth: '1200px', marginBottom: '60px' }}>
          
          <motion.button 
            whileHover={{ scale: 1.1, backgroundColor: '#f8fafc' }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll('left')}
            style={{
              position: 'absolute', left: '-25px', top: '50%', transform: 'translateY(-50%)',
              width: '50px', height: '50px', borderRadius: '50%', border: 'none',
              backgroundColor: '#ffffff', boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
              fontSize: '1.2rem', color: '#0f172a', cursor: 'pointer', zIndex: 20,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            ❮
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.1, backgroundColor: '#f8fafc' }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll('right')}
            style={{
              position: 'absolute', right: '-25px', top: '50%', transform: 'translateY(-50%)',
              width: '50px', height: '50px', borderRadius: '50%', border: 'none',
              backgroundColor: '#ffffff', boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
              fontSize: '1.2rem', color: '#0f172a', cursor: 'pointer', zIndex: 20,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            ❯
          </motion.button>

          {/* Render the optimized list */}
          {MemoizedAgentList}
          
        </div>
      </motion.div>

      {/* --- AGENT MODAL POPUP --- */}
      <AnimatePresence>
        {selectedAgent && (
          <motion.div 
            key="modal-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedAgent(null)} 
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
              backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 9999, 
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
              fontFamily: '"Inter", sans-serif',
              willChange: 'opacity' // OPTIMIZATION 3: Hardware accelerate the overlay
            }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()} 
              style={{
                backgroundColor: 'white', borderRadius: '16px', padding: '40px', 
                maxWidth: '600px', width: '100%', position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                willChange: 'transform, opacity' // OPTIMIZATION 3: Hardware accelerate the modal
              }}
            >
              <button 
                onClick={() => setSelectedAgent(null)}
                style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748b' }}
              >
                ✕
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                <div style={{ 
                  width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', 
                  border: '3px solid #c48b63', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' 
                }}>
                  <img src={selectedAgent.image} alt={selectedAgent.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <h2 style={{ margin: '0 0 5px 0', fontSize: '1.8rem', color: '#0f172a', fontWeight: '800' }}>{selectedAgent.name}</h2>
                  <p style={{ margin: 0, color: '#c48b63', fontWeight: '600', fontSize: '1.1rem' }}>{selectedAgent.role}</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ flex: 1 }}>
                    <strong style={{ color: '#1e293b', fontSize: '0.95rem' }}>📞 Direct Contact:</strong>
                    <p style={{ margin: '5px 0 0 0', color: '#64748b' }}>+356 {selectedAgent.phone}</p>
                  </div>
                  <div style={{ flex: 1 }}>
                    <strong style={{ color: '#1e293b', fontSize: '0.95rem' }}>✉️ Email:</strong>
                    <p style={{ margin: '5px 0 0 0', color: '#64748b' }}>{selectedAgent.email}</p>
                  </div>
                </div>
                <div>
                  <strong style={{ color: '#1e293b', fontSize: '0.95rem' }}>📍 Specialization:</strong>
                  <p style={{ margin: '5px 0 0 0', color: '#64748b' }}>{selectedAgent.specialization}</p>
                </div>
                <div>
                  <strong style={{ color: '#1e293b', fontSize: '0.95rem' }}>⏳ Experience:</strong>
                  <p style={{ margin: '5px 0 0 0', color: '#64748b' }}>{selectedAgent.experience}</p>
                </div>
                <div style={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #c48b63' }}>
                  <strong style={{ color: '#1e293b', fontSize: '0.95rem' }}>💡 Go-To Malta Tip:</strong>
                  <p style={{ margin: '8px 0 0 0', color: '#475569', fontStyle: 'italic' }}>"{selectedAgent.tip}"</p>
                </div>
                <div>
                  <strong style={{ color: '#1e293b', fontSize: '0.95rem' }}>✨ Fun Fact:</strong>
                  <p style={{ margin: '5px 0 0 0', color: '#64748b' }}>{selectedAgent.fact}</p>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}