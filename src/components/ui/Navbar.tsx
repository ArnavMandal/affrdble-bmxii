import React from 'react'
import Link from 'next/link'
import { RiNextjsFill } from 'react-icons/ri'
const Navbar = () => {
    return (
        <div className='z-10 top-14 left-1/2 -translate-x-1/2 
        fixed flex items-center gap-5 py-2 px-4 rounded-full bg-black/60 backdrop-blur-md border text-white
        border-zinc-800'>
            <a href="">
                <RiNextjsFill className='text-4xl'></RiNextjsFill>
            </a>
            <Link href="/" className='hover:text-gray-300 transition-colors'>
               <span>home</span>
            </Link>
            <a
                href="https://www.linkedin.com/in/shriyanbachigari" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors"
            >
                <span>shriyan</span>
            </a>
            <a
                href="https://www.linkedin.com/in/arnav-mandal-21o" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors"
            >
                <span>arnav</span>
            </a>
            <a
                href="https://www.linkedin.com/in/rithvik-reddy-siddenki0105" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors"
            >
                <span>rithvik</span>
            </a>
        </div>
    )
}

export default Navbar