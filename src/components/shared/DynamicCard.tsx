import React from 'react'
import { cn } from '@/lib/utils'
import SpotlightCard from '../ui/SpotlightCard';

interface DynamicCardProps {
    children: React.ReactNode;
    className?: string;
}

const DynamicCard = ({ children, className }: DynamicCardProps) => {
    return (
        <SpotlightCard className={cn("custom-spotlight-card cursor-pointer relative w-full max-w-[370px] h-full min-h-[375px] p-[30px] bg-[#080808] rounded-[20px] border-[1px] border-white/5 flex flex-col gap-[14px] transition-all duration-300 hover:scale-105", className)} 
        spotlightColor="rgba(0, 128, 255, 0.15)">
            {/* Gradient Glow Line */}
            <div
                className="absolute top-[1px] left-1/2 -translate-x-1/2"
                style={{
                    width: "40%",
                    height: "1px",
                    background: "linear-gradient(to right, rgba(0, 128, 255, 0) 0%, rgba(0, 128, 255, 1) 50%, rgba(0, 128, 255, 0) 100%)",
                }}
            />
            {children}
        </SpotlightCard>
    )
}

export default DynamicCard