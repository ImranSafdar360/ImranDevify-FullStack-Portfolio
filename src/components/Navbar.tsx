'use client';

import Link from 'next/link';
import Logo from './header/Logo';
import CustomButton from './Button';


export default function Navbar() {

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Portfolio', href: '/projects' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleResumeClick = () => {
    console.log('Resume clicked');
  }

  return (
    <nav
      className="w-full fixed top-0 z-50 py-[16px] px-[12px]"
    >
      <div className='w-full max-w-[1000px] h-[76px] rounded-full bg-[#262626] mx-auto px-[24px] flex flex-row items-center justify-between'>
       <Logo />
        <div className='flex flex-row items-center gap-[32px]' style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}>
          {navigation.map((link, index) => (
            <Link key={index} href={link.href} className='text-[20px] text-white hover:text-[#00C3FF] transition-colors relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#00C3FF] after:scale-x-0 after:hover:scale-x-100 after:transition-all after:duration-300'>{link.name}</Link>
          ))}
        </div>
        <CustomButton onClick={handleResumeClick}>Resume</CustomButton>
      </div>
    </nav>
  );
}

