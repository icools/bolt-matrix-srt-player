import React from 'react'
import { Maximize2, Minimize2 } from 'lucide-react'

interface FullscreenButtonProps {
  onClick: () => void
  isFullscreen: boolean
}

const FullscreenButton: React.FC<FullscreenButtonProps> = ({ onClick, isFullscreen }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-4 left-4 z-50 bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition duration-300 ease-in-out"
    >
      {isFullscreen ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
    </button>
  )
}

export default FullscreenButton