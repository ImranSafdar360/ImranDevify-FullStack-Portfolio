import { cn } from '@/lib/utils'
import React from 'react'

const Container = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={cn('w-full max-w-[1440px] h-full min-h-screen mx-auto px-[60px]', className)}>
        {children}
    </div>
  )
}

export default Container