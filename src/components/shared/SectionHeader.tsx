import React from 'react'
import SectionBadge from './SectionBadge'
import GradientText from '../ui/gradient-text'
import { cn } from '@/lib/utils'

const SectionHeader = ({ title, description, badgeText, gradientText, gradientTextClassName, className, isAbout = false }: { title: string, description: string, badgeText: string, gradientText?: string, gradientTextClassName?: string, className?: string, isAbout?: boolean }) => {
    return (
        <div className={cn("w-full flex flex-col gap-[16px]", className)}>
            <SectionBadge className='mb-[24px]' text={badgeText} />
            <h1 className={cn("text-[52px] leading-[32px] font-bold text-white font-sora", isAbout ? "text-start" : 'text-center')}>
                {title}
                {gradientText && (
                    <GradientText className={cn('font-sora', gradientTextClassName)}>{gradientText}</GradientText>
                )}
            </h1>
            <p className={cn("max-w-[80%] text-[18px] leading-[22px] font-medium text-white/70", isAbout ? "text-start max-w-[80%]" : 'text-center max-w-[70%]')}>{description}</p>
        </div>
    );
};

export default SectionHeader;