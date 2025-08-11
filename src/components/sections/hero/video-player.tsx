'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Play, Volume2, VolumeX } from 'lucide-react'

interface VideoPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  videoUrl: string
  autoPlay?: boolean
  muted?: boolean
  poster?: string
}

const VideoPlayer = React.forwardRef<HTMLDivElement, VideoPlayerProps>(
  ({ videoUrl, autoPlay = true, muted = true, poster, className, ...props }, ref) => {
    const videoRef = React.useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = React.useState(autoPlay)
    const [isMuted, setIsMuted] = React.useState(muted)
    const [isLoading, setIsLoading] = React.useState(true)
    
    React.useEffect(() => {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.play().catch(() => {
            setIsPlaying(false)
          })
        } else {
          videoRef.current.pause()
        }
      }
    }, [isPlaying])
    
    const togglePlay = () => {
      setIsPlaying(!isPlaying)
    }
    
    const toggleMute = () => {
      if (videoRef.current) {
        videoRef.current.muted = !isMuted
        setIsMuted(!isMuted)
      }
    }
    
    return (
      <div
        ref={ref}
        className={cn('relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg', className)}
        {...props}
      >
        {/* Video container with border */}
        <div className="relative border-2 border-primary/30 rounded-lg overflow-hidden bg-black">
          {/* Loading state */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
              <div className="text-primary">
                <motion.div
                  className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>
          )}
          
          {/* Video element */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay={autoPlay}
            muted={muted}
            loop
            playsInline
            poster={poster}
            onLoadedData={() => setIsLoading(false)}
          >
            <source src={videoUrl} type="video/mp4" />
            Seu navegador não suporta o elemento de vídeo.
          </video>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary" />
          
          {/* Controls */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <motion.button
              className="p-2 bg-black/80 border border-primary/30 rounded text-primary hover:bg-primary hover:text-black transition-colors"
              onClick={togglePlay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? (
                <div className="w-4 h-4 flex gap-1">
                  <div className="w-1.5 h-4 bg-current" />
                  <div className="w-1.5 h-4 bg-current" />
                </div>
              ) : (
                <Play className="w-4 h-4" />
              )}
            </motion.button>
            
            <motion.button
              className="p-2 bg-black/80 border border-primary/30 rounded text-primary hover:bg-primary hover:text-black transition-colors"
              onClick={toggleMute}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </motion.button>
          </div>
        </div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 -z-10 blur-3xl opacity-30">
          <div className="h-full w-full bg-primary/20" />
        </div>
      </div>
    )
  }
)
VideoPlayer.displayName = 'VideoPlayer'

export { VideoPlayer }