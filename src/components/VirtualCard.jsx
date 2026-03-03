import { useRef, useState, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const ROTATION_RANGE = 25;
const HALF_ROTATION_RANGE = 25 / 2;

export default function VirtualCard({ 
  holderName = "K S REHMAN", 
  fullNumber = "4782780040847157", 
  expiry = "02/30", 
  cvv = "733",
  isRevealed: externalRevealed = null,
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
      {/* Dynamic Background Gradient (NayaPay Style) */}
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(165deg, #020617 0%, #0d1254 40%, #115e59 80%, #17e0b5 100%)'
        }}
      />

      {/* Interactive Glare overlay */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 50%)`,
          mixBlendMode: 'overlay'
        }}
      />

      {/* Grain texture for premium feel */}
      <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }} />

      {/* Card Content - elevated in 3D */}
      <div 
        className="absolute inset-0 px-14 py-16 flex flex-col justify-between"
        style={{ transform: "translateZ(50px)" }}
      >
        {/* Top Header */}
        <div className="flex justify-between items-start h-[160px]">
          {/* Logo representation */}
          <div className="flex items-center gap-3 drop-shadow-lg">
            <div className="w-9 h-9 bg-secondary rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-[#17e0b5] font-black text-xl italic">α</span>
            </div>
            <span className="font-bold text-lg tracking-tighter text-white">
              Alpha<span className="text-[#17e0b5]">Pay</span>
            </span>
          </div>
          
          <AnimatePresence mode="wait">
            {!isRevealed ? (
              <motion.span 
                key="tag"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-white/90 text-[13px] font-medium tracking-[0.15em]"
              >
                VIRTUAL
              </motion.span>
            ) : (
              <motion.div 
                key="numbers"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col items-end gap-1"
              >
                {numberGroups.map((group, idx) => (
                  <div key={idx} className="flex relative items-center">
                    {/* Vertical line separator styling seen in NayaPay reference */}
                    <div className="absolute right-full mr-2 h-[120%] w-[1px] bg-white/40 rotate-[15deg]"></div>
                    <span className="text-white font-mono text-[26px] tracking-[0.15em] leading-[1.1] drop-shadow-sm">{group}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Middle Area */}
        <div className="mt-auto mb-6">
          <p className="text-white/95 text-[15px] font-bold tracking-[0.1em] uppercase drop-shadow-sm">{holderName}</p>
        </div>

        {/* Bottom Footer */}
        <div className="flex justify-between items-end">
          <div className="flex-1 flex gap-8">
            {!isRevealed ? (
              <div className="flex items-end h-9">
                <span className="text-white font-bold tracking-widest text-[22px] font-mono drop-shadow-sm">{(fullNumber || "").slice(-4)}</span>
              </div>
            ) : (
               <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-6"
               >
                 {/* Detail columns */}
                 <div className="flex flex-col gap-3">
                   <div>
                     <p className="text-white/70 text-[10px] uppercase font-bold tracking-wider leading-tight">EXP<br/>DATE</p>
                   </div>
                   <div>
                     <p className="text-white/70 text-[10px] uppercase font-bold tracking-wider leading-tight">SECURITY<br/>CODE</p>
                   </div>
                 </div>
                 <div className="flex flex-col justify-between items-start gap-4 pt-1">
                   <p className="text-white font-bold text-lg font-mono drop-shadow-sm">{expiry}</p>
                   <p className="text-white font-bold text-lg font-mono drop-shadow-sm">{cvv}</p>
                 </div>
               </motion.div>
            )}
          </div>
          
          {/* VISA Logo */}
          <div className="w-[64px] h-[20px] relative opacity-90 drop-shadow-md mb-1 shrink-0">
            <svg viewBox="0 0 100 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M36.7 22.8H41L43.7 6.3H39.4L36.7 22.8ZM58.9 6.6C57.1 6.3 54.3 6 51.5 6C45 6 40.4 9.5 40.4 14.6C40.4 18.2 43.6 20.2 46.1 21.4C48.6 22.6 49.5 23.4 49.5 24.5C49.4 26.2 47.4 26.9 45.6 26.9C43.8 26.9 42 26.4 40.5 25.6L39.8 28.9C41.3 29.6 44.1 30.2 46.9 30.2C53.7 30.2 58.1 26.8 58.2 21.7C58.2 18.4 56.1 15.9 51.2 13.5C48.7 12.3 47.8 11.5 47.8 10.5C47.8 9 49.5 8.1 52.1 8.1C54.1 8.1 56.1 8.6 57.5 9.2L58.2 5.9C57.4 5.6 58.1 5.9 58.9 6.6ZM81.2 6.3H77.2C75.8 6.3 75.1 7.1 74.5 8.5L68.8 22.8H73.3L74.2 20.3H79.8L80.5 22.8H84.8L81.2 6.3ZM75.1 17.5L77 12.3L78.1 17.5H75.1ZM14.3 6.3L9.1 19.3L8.6 16.5C7.9 11.7 4.1 7.4 0 7.4V7.9C2.7 8.5 5.5 10.6 7.4 13.1C7.8 13.6 8.3 14.4 9.1 17.5L13.7 30H18L26 6.3H14.3Z" fill="white"/>
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
