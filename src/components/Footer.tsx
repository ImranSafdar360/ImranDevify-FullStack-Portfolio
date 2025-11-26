'use client';

import CustomButton from "./Button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return <div className="w-full h-[625px] bg-[#262626] rounded-[30px] mx-auto px-[32px] flex justify-between items-center flex-col">
    <div className="w-full flex flex-row items-center justify-between">
      <div>
        <h1 className="text-[100px] text-white font-bold" style={{ fontFamily: 'var(--font-boldonse), sans-serif' }}>Let&apos;s Work Together</h1>
        <CustomButton onClick={() => {}}>Contact Me</CustomButton>
      </div>
    </div>
    <div className="w-full flex flex-row items-center justify-between py-[32px] border-t border-white border-dashed">
    <p className="text-[20px] text-[#C9C9C9]">© {currentYear} Imran Safdar All rights reserved.</p>
    <p className="text-[20px] text-[#C9C9C9]">Designed by: Amina Gul</p>
    </div>
  </div>;
}
