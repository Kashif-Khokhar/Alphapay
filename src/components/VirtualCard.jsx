import { useRef, useState, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Snowflake } from 'lucide-react';

const ROTATION_RANGE = 25;
const HALF_ROTATION_RANGE = 25 / 2;

export default function VirtualCard({ 
  holderName = "K S REHMAN", 
  fullNumber = "4782780040847157", 
  expiry = "02/30", 
  cvv = "733",
  isRevealed: externalRevealed = null,
  isFrozen = false,
  onToggle = null
}) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [internalRevealed, setInternalRevealed] = useState(false);

  const isRevealed = externalRevealed !== null ? externalRevealed : internalRevealed;

  useEffect(() => {
    // Reset spring to 0 when not hovering
    if (!isHovered) {
      x.set(0);
      y.set(0);
    }
  }, [isHovered, x, y]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    
    // Calculate rotation
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;
    const rY = mouseX / width - HALF_ROTATION_RANGE;
    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    x.set(rX);
    y.set(rY);

    // Calculate glare position
    const posX = ((e.clientX - rect.left) / width) * 100;
    const posY = ((e.clientY - rect.top) / height) * 100;
    setMousePosition({ x: posX, y: posY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    setMousePosition({ x: 50, y: 50 });
  };


  const numberGroups = (fullNumber || "").match(/.{1,4}/g) || [];

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative w-[280px] h-[440px] rounded-[32px] overflow-hidden shadow-2xl transition-shadow duration-300 group"
    >
      {/* Dynamic Background Gradient (Midnight Teal Theme) */}
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(165deg, #020617 0%, #0d1254 40%, #065F46 75%, #10B981 100%)'
        }}
      />

      {/* Interactive Glare overlay */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 50%)`,
          mixBlendMode: 'overlay'
        }}
      />

      {/* Grain texture for premium feel */}
      <div className="absolute inset-0 opacity-[0.1] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }} />

      {/* Card Content - elevated in 3D */}
      <div 
        className="absolute inset-[40px] flex flex-col justify-between"
        style={{ transform: "translateZ(50px)" }}
      >
        {/* Top Header */}
        <div className="flex justify-between items-start">
          {/* Official Alpha Logo - Direct teal symbol */}
          <div className="flex items-center drop-shadow-[0_0_15px_rgba(23,224,181,0.3)]">
             <span className="text-[#17e0b5] font-black text-5xl italic select-none">α</span>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20">
            <span className="text-white text-[10px] font-black tracking-[0.2em] uppercase">Virtual</span>
          </div>
        </div>

        {/* Holder Name & Card Number Section */}
        <div className="my-auto space-y-4">
          <div>
            <p className="text-white text-sm font-bold tracking-[0.2em] uppercase truncate max-w-[200px] drop-shadow-sm">{holderName}</p>
          </div>
          
          <AnimatePresence mode="wait">
            {!isRevealed ? (
              <motion.div 
                key="hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5"
              >
                {[1, 2, 3].map((g) => (
                  <div key={g} className="flex gap-1 items-center">
                    {[1, 2, 3, 4].map((d) => (
                      <div key={d} className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    ))}
                    <span className="mx-1" />
                  </div>
                ))}
                <span className="text-white font-mono text-2xl tracking-widest drop-shadow-md">
                  {(fullNumber || "").slice(-4)}
                </span>
              </motion.div>
            ) : (
              <motion.div 
                key="visible"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-white font-mono text-2xl tracking-[0.15em] drop-shadow-lg"
              >
                {(fullNumber || "").match(/.{1,4}/g)?.join(' ')}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Footer: Minimal Expiry & CVV */}
        <div className="flex justify-between items-end">
          <div className="flex gap-8 mb-1">
            <div>
              <p className="text-white/60 text-[9px] uppercase font-bold tracking-widest mb-0.5">Expiry</p>
              <p className="text-white text-sm font-bold font-mono tracking-wider">{isRevealed ? expiry : "••/••"}</p>
            </div>
            <div>
              <p className="text-white/60 text-[9px] uppercase font-bold tracking-widest mb-0.5">CVV</p>
              <p className="text-white text-sm font-bold font-mono tracking-wider">{isRevealed ? cvv : "•••"}</p>
            </div>
          </div>
          
          {/* Verified High-Fidelity VISA Logo */}
          <div className="w-[180px] h-[66px] relative opacity-95 drop-shadow-md mb-1 shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
              <path d="M15.854 11.329l-2.003 9.367h-2.424l2.006-9.367zM26.051 17.377l1.275-3.518 0.735 3.518zM28.754 20.696h2.242l-1.956-9.367h-2.069c-0.003-0-0.007-0-0.010-0-0.459 0-0.853 0.281-1.019 0.68l-0.003 0.007-3.635 8.68h2.544l0.506-1.4h3.109zM22.429 17.638c0.010-2.473-3.419-2.609-3.395-3.714 0.008-0.336 0.327-0.694 1.027-0.785 0.13-0.013 0.28-0.021 0.432-0.021 0.711 0 1.385 0.162 1.985 0.452l-0.027-0.012 0.425-1.987c-0.673-0.261-1.452-0.413-2.266-0.416h-0.001c-2.396 0-4.081 1.275-4.096 3.098-0.015 1.348 1.203 2.099 2.122 2.549 0.945 0.459 1.262 0.754 1.257 1.163-0.006 0.63-0.752 0.906-1.45 0.917-0.032 0.001-0.071 0.001-0.109 0.001-0.871 0-1.691-0.219-2.407-0.606l0.027 0.013-0.439 2.052c0.786 0.315 1.697 0.497 2.651 0.497 0.015 0 0.030-0 0.045-0h-0.002c2.546 0 4.211-1.257 4.22-3.204zM12.391 11.329l-3.926 9.367h-2.562l-1.932-7.477c-0.037-0.364-0.26-0.668-0.57-0.82l-0.003-0.003c-0.688-0.338-1.488-0.613-2.325-0.786l-0.066-0.011 0.058-0.271h4.124c0 0 0.001 0 0.001 0 0.562 0 1.028 0.411 1.115 0.948l0.001 0.006 1.021 5.421 2.522-6.376z" fill="currentColor"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Frozen Overlay */}
      <AnimatePresence>
        {isFrozen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] z-50 flex flex-col items-center justify-center p-6 text-center"
            style={{ transform: "translateZ(60px)" }}
          >
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 border border-white/20">
              <Snowflake size={32} className="text-white" />
            </div>
            <p className="text-white text-lg font-black tracking-tight uppercase italic">Frozen</p>
            <p className="text-white/60 text-[10px] font-bold mt-1 uppercase tracking-widest">Unfreeze to use card</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
