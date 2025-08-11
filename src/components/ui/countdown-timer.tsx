'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface CountdownTimerProps extends React.HTMLAttributes<HTMLDivElement> {
  targetDate: Date
  onExpire?: () => void
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const CountdownTimer = React.forwardRef<HTMLDivElement, CountdownTimerProps>(
  ({ targetDate, onExpire, className, ...props }, ref) => {
    const [timeLeft, setTimeLeft] = React.useState<TimeLeft>({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    })
    
    React.useEffect(() => {
      const calculateTimeLeft = () => {
        const difference = targetDate.getTime() - new Date().getTime()
        
        if (difference > 0) {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          })
        } else {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
          if (onExpire) onExpire()
        }
      }
      
      calculateTimeLeft()
      const timer = setInterval(calculateTimeLeft, 1000)
      
      return () => clearInterval(timer)
    }, [targetDate, onExpire])
    
    const timeUnits = [
      { label: 'DIAS', value: timeLeft.days },
      { label: 'HORAS', value: timeLeft.hours },
      { label: 'MIN', value: timeLeft.minutes },
      { label: 'SEG', value: timeLeft.seconds },
    ]
    
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-center gap-3 md:gap-4', className)}
        {...props}
      >
        {timeUnits.map((unit, index) => (
          <React.Fragment key={unit.label}>
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl" />
                <div className="relative bg-black border-2 border-primary p-3 md:p-4 min-w-[60px] md:min-w-[80px] neon-border">
                  <motion.span
                    key={unit.value}
                    className="block text-2xl md:text-3xl font-bold text-primary text-center tabular-nums"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {String(unit.value).padStart(2, '0')}
                  </motion.span>
                </div>
              </div>
              <span className="text-xs md:text-sm text-primary/80 mt-2 font-medium tracking-wider">
                {unit.label}
              </span>
            </motion.div>
            
            {index < timeUnits.length - 1 && (
              <span className="text-primary text-2xl md:text-3xl font-bold animate-pulse">
                :
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    )
  }
)
CountdownTimer.displayName = 'CountdownTimer'

export { CountdownTimer }