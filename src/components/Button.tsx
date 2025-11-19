import React from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

const CustomButton = ({ children, onClick, className }: { children: React.ReactNode, onClick: () => void, className?: string }) => {
  return (
    <Button onClick={onClick} className={cn('w-[135px] h-[50px] flex items-center justify-center rounded-full bg-white text-black cursor-pointer text-[20px]', className)} style={{ fontFamily: 'var(--font-boldonse), sans-serif' }}>{children}</Button>
  )
}

export default CustomButton;