import { useRef, useState, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const ROTATION_RANGE = 25;
const HALF_ROTATION_RANGE = 25 / 2;

export default function VirtualCard({ 
  holderName = "K S REHMAN", 
  fullNumber = "4782780040847157", 
  expiry = "02/30", 
  cvv = "733" 
}) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

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

  const handleClick = () => {
    setIsRevealed(prev => !prev);
  };

  const numberGroups = fullNumber.match(/.{1,4}/g) || [];

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative w-[280px] h-[440px] rounded-[32px] overflow-hidden cursor-pointer shadow-2xl transition-shadow duration-300 group"
    >
      {/* Dynamic Background Gradient (NayaPay Style) */}
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(165deg, #0d1254 0%, #301f6e 40%, #a2298e 75%, #ef3054 100%)'
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
        className="absolute inset-0 p-8 flex flex-col justify-between"
        style={{ transform: "translateZ(50px)" }}
      >
        {/* Top Header */}
        <div className="flex justify-between items-start h-[160px]">
          {/* Logo representation */}
          <div className="text-white flex flex-col -space-y-1 mt-1 drop-shadow-md">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 20L20 5L30 20H25L20 12.5L15 20H10Z" fill="white"/>
              <path d="M10 20L20 35L30 20H25L20 27.5L15 20H10Z" fill="white"/>
            </svg>
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
                <span className="text-white font-bold tracking-widest text-[22px] font-mono drop-shadow-sm">{fullNumber.slice(-4)}</span>
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
          <div className="w-[72px] h-[24px] relative opacity-90 drop-shadow-md pb-1 shrink-0">
            <svg viewBox="0 0 50 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.5796 0.165039H18.397L15.3995 10.3807L14.7088 6.94273C14.4719 5.61399 13.4111 4.31687 11.2335 3.52267L19.4975 15.65H23.0102L28.1824 0.165039H24.5779L21.5796 0.165039ZM34.7214 10.8407L36.3243 6.4385L37.2882 10.8407H34.7214ZM38.2575 1.51604C37.5259 1.51604 36.9365 1.93339 36.6508 2.62886L30.9822 15.65H34.7214L35.4674 13.5678H40.0911L40.5262 15.65H43.9113L40.7303 0.165039H38.2575V1.51604ZM13.8841 0.165039H4.15617C3.39414 0.165039 2.72124 0.536768 2.37892 1.21852L0.0153809 13.5678C0.35467 13.0649 1.10928 12.3888 2.05374 12.0003C3.59756 11.3653 5.48003 10.3204 6.70327 8.35515C8.0463 6.19553 7.8288 3.42852 13.8841 0.165039ZM28.5303 15.65H32.1221L35.5901 0.165039H32.0624L28.5303 15.65Z" fill="white"/>
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
