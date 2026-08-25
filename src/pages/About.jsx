import { useState, useEffect, Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, useTexture } from '@react-three/drei';
import { motion as motion3d } from 'framer-motion-3d';
import { motion } from 'framer-motion';
import DoorModel from './Door'; 

// --- UPDATED DATA ---
const MOCK_AGENTS = [
  { id: 1, name: 'Mehdi Bezine', role: 'Director', phone: '99978211', email: 'mehdi@righthomes.com.mt', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80' },
  { id: 2, name: 'Charlton Gatt', role: 'Real Estate Sales Agent', phone: '79091571', email: 'charlton@righthomes.com.mt', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=250&q=80' },
  { id: 3, name: 'Mark Borg', role: 'Real Estate Sales Agent', phone: '99978214', email: 'mark@righthomes.com.mt', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&q=80' },
  { id: 4, name: 'Leanne Gatt', role: 'Real Estate Sales Agent', phone: '79244282', email: 'leanne@righthomes.com.mt', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80' },
  { id: 5, name: 'Clint Barbara', role: 'Real Estate Sales Agent', phone: '79709796', email: 'clint@righthomes.com.mt', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80' },
  { id: 6, name: 'Head Office', role: '', phone: '99978211', email: 'chloe@righthomes.com.mt', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80' },
  { id: 7, name: 'Quelin Sammut', role: 'Real Estate Sales Agent', phone: '79958683', email: 'quelin@righthomes.com.mt', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80' },
  { id: 8, name: 'Jeffrey Briffa Cauchi', role: 'Real Estate Sales Agent', phone: '77098050', email: 'jeffrey@righthomes.com.mt', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80' },
  { id: 9, name: 'Donovan Vella', role: '', phone: '79051387', email: 'donovan@righthomes.com.mt', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80' },
  { id: 10, name: 'Christian Gauci', role: '', phone: '99438127', email: 'christian@righthomes.com.mt', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80' },
  { id: 11, name: 'Luke Vassallo', role: '', phone: '79551248', email: 'luke@righthomes.com.mt', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80' },
  { id: 12, name: 'Marlon Sammut', role: '', phone: '79919212', email: 'marlon@righthomes.com.mt', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80' },
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
  
  useEffect(() => {
    const timer = setTimeout(() => setIsEntered(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const carouselRef = useRef();

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
    entered: { z: 9, transition: { duration: 1.5, ease: "easeInOut", delay: 0.5 } } 
  };

  return (
    <div style={{ position: 'relative', height: '100vh', background: '#ecf0f1', overflow: 'hidden', fontFamily: '"Inter", sans-serif' }}>
      
      <style>{`
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* --- 1. THE 3D SCENE --- */}
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

          <div 
            ref={carouselRef} 
            className="hide-scroll"
            style={{ 
              display: 'flex', gap: '25px', overflowX: 'auto', padding: '30px 10px',
              scrollBehavior: 'smooth' 
            }}
          >
            {MOCK_AGENTS.map((agent, index) => (
              
              /* 
                 THE CARD MAGIC HAPPENS HERE: 
                 By setting `whileHover="hover"`, we tell this card AND everything 
                 inside it (like the image) to run their "hover" variant animation!
              */
              <motion.div 
                key={agent.id} 
                initial="hidden"
                animate={isEntered ? "visible" : "hidden"}
                whileHover="hover"
                variants={{
                  hidden: { y: 50, opacity: 0, borderColor: '#f1f5f9', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' },
                  visible: { 
                    y: 0, opacity: 1, borderColor: '#f1f5f9', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)',
                    transition: { delay: 2.0 + (index * 0.05), type: 'spring', stiffness: 100 }
                  },
                  // The new glow, border, and float effect
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
                  minWidth: '260px', flexShrink: 0, cursor: 'pointer' 
                }}
              >
                <div style={{ 
                  width: '130px', height: '140px', margin: '0 auto 25px', 
                  backgroundColor: '#0a0a0a', 
                  borderRadius: '60px 15px 60px 15px', 
                  overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)'
                }}>
                  {/* Notice this is now a <motion.img>! It waits for the card to be hovered, then zooms. */}
                  <motion.img 
                    src={agent.image} 
                    alt={agent.name} 
                    variants={{
                      hidden: { scale: 1, opacity: 0.85 },
                      visible: { scale: 1, opacity: 0.85 },
                      // The new image zoom effect
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
                    📞 {agent.phone}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    ✉️ {agent.email}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}