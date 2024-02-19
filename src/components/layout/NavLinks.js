import Link from 'next/link'
import React from 'react'

const NavLinks = () => {
  return (
    <>
    <ul className='NavLinks'>
        <li><Link href="#">Home</Link></li>
        <li><Link href="#">About Us</Link></li>
        <li><Link href="#">FAQs</Link></li>
        <li><Link href="#">Blog</Link></li>
        <li><Link href="#">Contact</Link></li>
    </ul>
    </>
  )
}

export default NavLinks