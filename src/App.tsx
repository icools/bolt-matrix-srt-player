import React, { useState, useEffect, useCallback } from 'react'
import Particle from './components/Particle'
import WaveEffect from './components/WaveEffect'
import DynamicWave from './components/DynamicWave'
import MatrixRain from './components/MatrixRain'
import AudioPlayer from './components/AudioPlayer'
import SubtitleDisplay from './components/SubtitleDisplay'
import FileUpload from './components/FileUpload'
import FullscreenButton from './components/FullscreenButton'
import { motion } from 'framer-motion'

const NUM_PARTICLES = 50

function App() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number; color: string }>>([])
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [srtFile, setSrtFile] = useState<File | null>(null)
  const [currentSubtitle, setCurrentSubtitle] = useState<string>('')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [fontSize, setFontSize] = useState(32) // New state for font size

  const generateColor = useCallback(() => {
    const hue = Math.floor(Math.random() * 60) + 100 // Green hues
    return `hsla(${hue}, 100%, 50%, 0.6)`
  }, [])

  useEffect(() => {
    const newParticles = Array.from({ length: NUM_PARTICLES }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      color: generateColor(),
    }))
    setParticles(newParticles)
  }, [generateColor])

  useEffect(() => {
    const updateParticles = () => {
      setParticles(prevParticles =>
        prevParticles.map(particle => {
          let { x, y, vx, vy } = particle
          x += vx
          y += vy

          if (x < 0 || x > window.innerWidth) vx = -vx
          if (y < 0 || y > window.innerHeight) vy = -vy

          return { ...particle, x, y, vx, vy }
        })
      )
    }

    const intervalId = setInterval(updateParticles, 30)
    return () => clearInterval(intervalId)
  }, [])

  const handleAudioUpload = (file: File) => {
    setAudioFile(file)
  }

  const handleSrtUpload = (file: File) => {
    setSrtFile(file)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsFullscreen(false)
      } else if (event.key === '+' || event.key === '=') {
        setFontSize(prevSize => Math.min(prevSize + 2, 72)) // Increase font size, max 72px
      } else if (event.key === '-' || event.key === '_') {
        setFontSize(prevSize => Math.max(prevSize - 2, 16)) // Decrease font size, min 16px
      }
    }

    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-green-900 overflow-hidden relative">
      <MatrixRain />
      <WaveEffect />
      {particles.map(particle => (
        <Particle key={particle.id} {...particle} />
      ))}
      <DynamicWave />
      <FullscreenButton onClick={toggleFullscreen} isFullscreen={isFullscreen} />
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {!isFullscreen && (
          <>
            <h1 className="text-6xl font-bold text-green-400 text-center px-6 py-3 bg-black bg-opacity-30 rounded-lg shadow-lg font-mono mb-8">
              Matrix Harmony
            </h1>
            <div className="flex space-x-4 mb-8">
              <FileUpload onFileUpload={handleAudioUpload} accept="audio/*" label="Upload Audio" />
              <FileUpload onFileUpload={handleSrtUpload} accept=".srt" label="Upload SRT" />
            </div>
          </>
        )}
        <SubtitleDisplay subtitle={currentSubtitle} fontSize={fontSize} />
        <AudioPlayer 
          audioFile={audioFile} 
          srtFile={srtFile} 
          onSubtitleChange={setCurrentSubtitle} 
          isFullscreen={isFullscreen}
        />
      </motion.div>
    </div>
  )
}

export default App