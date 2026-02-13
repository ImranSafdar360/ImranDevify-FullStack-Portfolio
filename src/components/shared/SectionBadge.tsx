import React from 'react'
import GradientText from '../ui/gradient-text'

const SectionBadge = ({ text }: { text: string }) => {
    return (
        <div className="relative w-fit flex justify-center items-center gap-[10px] px-[16px] py-[8px] bg-[#080808] rounded-[30px] border-[1px] border-white/70 text-[16px] leading-[26px] font-normal"
            style={{
                background: "rgba(255, 255, 255, 0.04)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
        ><span className="w-[5px] h-[5px] bg-white rounded-full flex items-center justify-center" /><GradientText fromColor="#FFFFFF" toColor="#999999">{text}</GradientText>
            {/* Gradient Glow Line */}
            <div
                className="absolute top-[-1px] left-1/2 -translate-x-1/2 z-40"
                style={{
                    width: "40%",
                    height: "1px",
                    background: "linear-gradient(to right, rgba(0, 128, 255, 0) 0%, rgba(0, 128, 255, 1) 50%, rgba(0, 128, 255, 0) 100%)",
                }}
            />
        </div>
    )
}

export default SectionBadge