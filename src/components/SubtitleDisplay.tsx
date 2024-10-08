import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SubtitleDisplayProps {
  subtitle: string
  fontSize: number
}

const SubtitleDisplay: React.FC<SubtitleDisplayProps> = ({ subtitle, fontSize }) => {
  return (
    <div className="w-full max-w-2xl text-center mb-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-black bg-opacity-50 p-4 rounded-lg"
        >
          <p 
            className="text-green-400 font-mono" 
            style={{ fontSize: `${fontSize}px` }}
          >
            {subtitle}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default SubtitleDisplay