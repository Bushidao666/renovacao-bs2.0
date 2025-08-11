'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface PandaVideoPlayerProps extends React.HTMLAttributes<HTMLDivElement> {}

declare global {
  interface Window {
    pandascripttag?: any[]
    PandaPlayer?: any
  }
}

const PandaVideoPlayer = React.forwardRef<HTMLDivElement, PandaVideoPlayerProps>(
  ({ className, ...props }, ref) => {
    const [isLoading, setIsLoading] = React.useState(true)
    
    React.useEffect(() => {
      // Inject PandaVideo script
      if (!document.querySelector('script[src="https://player.pandavideo.com.br/api.v2.js"]')) {
        const script = document.createElement('script')
        script.src = 'https://player.pandavideo.com.br/api.v2.js'
        script.async = true
        document.head.appendChild(script)
      }
      
      // Initialize PandaPlayer
      window.pandascripttag = window.pandascripttag || []
      window.pandascripttag.push(function() {
        const panda_id_player = 'panda-e7f29e1a-ad41-4c75-b287-e99f7c6bbcd8'
        const p = new window.PandaPlayer(panda_id_player, {
          onReady() {
            p.pipScrollFollow({ panda_id_player })
            setIsLoading(false)
          }
        })
      })
    }, [])
    
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
          
          {/* Responsive container for 16:9 aspect ratio */}
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              id="panda-e7f29e1a-ad41-4c75-b287-e99f7c6bbcd8"
              src="https://player-vz-63b254c5-cad.tv.pandavideo.com.br/embed/?v=e7f29e1a-ad41-4c75-b287-e99f7c6bbcd8"
              className="absolute top-0 left-0 w-full h-full"
              style={{ border: 'none' }}
              allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
              allowFullScreen
              fetchPriority="high"
              onLoad={() => setIsLoading(false)}
            />
          </div>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary" />
        </div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 -z-10 blur-3xl opacity-30">
          <div className="h-full w-full bg-primary/20" />
        </div>
      </div>
    )
  }
)
PandaVideoPlayer.displayName = 'PandaVideoPlayer'

export { PandaVideoPlayer }