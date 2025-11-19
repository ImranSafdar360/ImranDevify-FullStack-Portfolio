import { cn } from '@/lib/utils'
import React from 'react'

const Section = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={cn('w-full h-full flex items-center justify-center', className)}>
        {children}
    </div>
  )
}

export default Section