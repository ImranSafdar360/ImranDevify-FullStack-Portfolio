import { cn } from '@/lib/utils'
import React from 'react'

const Section = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={cn('w-full max-w-[1440px] h-full flex items-center justify-center my-[120px]', className)}>
        {children}
    </div>
  )
}

export default Section