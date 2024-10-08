import React, { useRef, useEffect, useState } from 'react'
import { parseSRT } from '../utils/srtParser'

interface AudioPlayerProps {
  audioFile: File | null
  srtFile: File | null
  onSubtitleChange: (subtitle: string) => void
  isFullscreen: boolean
}

interface Subtitle {
  start: number
  end: number
  text: string
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioFile, srtFile, onSubtitleChange, isFullscreen }) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [subtitles, setSubtitles] = useState<Subtitle[]>([])

  useEffect(() => {
    if (audioFile) {
      const audioUrl = URL.createObjectURL(audioFile)
      if (audioRef.current) {
        audioRef.current.src = audioUrl
        audioRef.current.play().catch(error => console.error("Autoplay failed:", error))
      }
    }
  }, [audioFile])

  useEffect(() => {
    if (srtFile) {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const text = e.target?.result
        if (typeof text === 'string') {
          const parsedSubtitles = await parseSRT(text)
          setSubtitles(parsedSubtitles)
          if (parsedSubtitles.length > 0) {
            onSubtitleChange(parsedSubtitles[0].text)
          }
        }
      }
      reader.readAsText(srtFile)
    }
  }, [srtFile, onSubtitleChange])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateSubtitle = () => {
      const currentTime = audio.currentTime
      const currentSubtitle = subtitles.find(
        sub => currentTime >= sub.start && currentTime <= sub.end
      )
      onSubtitleChange(currentSubtitle ? currentSubtitle.text : '')
    }

    audio.addEventListener('timeupdate', updateSubtitle)
    return () => audio.removeEventListener('timeupdate', updateSubtitle)
  }, [subtitles, onSubtitleChange])

  return (
    <audio 
      ref={audioRef} 
      controls 
      className={`w-full max-w-md ${isFullscreen ? 'opacity-0 absolute' : ''}`}
    />
  )
}

export default AudioPlayer