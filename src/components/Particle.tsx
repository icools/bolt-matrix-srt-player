import React from 'react'
import { motion } from 'framer-motion'

interface ParticleProps {
  x: number
  y: number
  color: string
}

const Particle: React.FC<ParticleProps> = ({ x, y, color }) => {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: x,
        top: y,
        width: '10px',
        height: '10px',
        backgroundColor: color,
        boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
      }}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )
}

export default Particle