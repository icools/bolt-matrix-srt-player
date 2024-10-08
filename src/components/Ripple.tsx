import React from 'react'

interface RippleProps {
  x: number
  y: number
  color: string
}

const Ripple: React.FC<RippleProps> = ({ x, y, color }) => {
  return (
    <div
      className="absolute w-0 h-0 animate-ripple"
      style={{
        left: x,
        top: y,
        background: `radial-gradient(circle, ${color} 0%, rgba(255,255,255,0) 70%)`,
        boxShadow: `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}`,
      }}
    ></div>
  )
}

export default Ripple