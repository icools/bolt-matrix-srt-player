import React from 'react';
import { motion } from 'framer-motion';

const WaveEffect: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute bottom-0 left-0 right-0 h-64 opacity-30"
          style={{
            background: `linear-gradient(180deg, transparent, rgba(0,255,0,${0.1 - index * 0.03}))`,
          }}
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 5 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5,
          }}
        />
      ))}
    </div>
  );
};

export default WaveEffect;