import Link from 'next/link';
import React from 'react'

const Logo = () => {
  return (
    <Link href='/' className='flex flex-row items-center gap-[6px] cursor-pointer font-sora font-bold'>
        <h3 className='text-[28px] text-black bg-white px-[6px] rounded-[5px]'>Imran</h3>
        <h3 className='text-[28px] text-white'>Dev</h3>
    </Link>
  )
}

export default Logo;