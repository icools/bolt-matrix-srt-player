import React from 'react'

const BackgroundAnimation: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="stars"></div>
      <div className="twinkling"></div>
    </div>
  )
}

export default BackgroundAnimation