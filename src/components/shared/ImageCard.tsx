import React from 'react'
import Image from "next/image";
import { StaticImageData } from 'next/image';

const ImageCard = ({ image, alt }: { image: StaticImageData | string, alt: string }) => {
  return (
    <div className="relative">
    <div className="relative w-[530px] h-[535px] p-[10px] bg-[#080808] rounded-[30px] border-[1px] border-white/5 z-10">
      <Image src={image} alt={alt} width={530} height={535} className="rounded-[20px] border-[1px] border-white/10 object-cover z-30" />
      {/* Gradient Glow Line */}
      <div
        className="absolute bottom-[-1px] left-1/2 -translate-x-1/2 z-40"
        style={{
          width: "40%",
          height: "1px",
          background: "linear-gradient(to right, rgba(0, 128, 255, 0) 0%, rgba(0, 128, 255, 1) 50%, rgba(0, 128, 255, 0) 100%)",
        }}
      />
    </div>
    {/* Circular Glow Effect */}
    <div
      className="absolute bottom-[15px] left-1/2 -translate-x-1/2 z-0"
      style={{
        width: "285px",
        height: "55px",
        backgroundColor: "#0080FF",
        borderRadius: "50%",
        filter: "blur(40px)",
        opacity: 0.8,
      }}
    />
  </div>
  )
}

export default ImageCard