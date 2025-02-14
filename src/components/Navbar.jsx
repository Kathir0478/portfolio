import React from 'react'
import { TiThMenu } from "react-icons/ti";

const Navbar = ({ isOpen, setIsOpen }) => {
    return (
        <div className='fixed top-0 left-0 w-full bg-black z-50 text-2xl text-sky-500'>
            <nav className='hidden md:flex h-20 items-center justify-around'>
                {['Objective', 'Skills', 'Education', 'Achievements', 'Contact', 'About'].map((item, index) => (
                    <li className='list-none hover:scale-125 hover:text-white transition-all duration-500'>{item}</li>
                ))}
            </nav>
            <div className='flex flex-col md:hidden'>
                <TiThMenu className='h-20 mx-10 hover:text-white hover:scale-125 transition-all duration-500' onClick={() => setIsOpen(!isOpen)} />
                <nav className={`flex flex-col px-50 gap-5 ${isOpen ? 'py-40 h-screen opacity-100' : 'h-0 opacity-0'} transition-all duration-500`}>
                    {['Objective', 'Skills', 'Education', 'Achievements', 'Contact', 'About'].map((item, index) => (
                        <li className='list-none hover:scale-125 hover:text-white transition-all duration-500'>{item}</li>
                    ))}
                </nav>
            </div>
        </div>

    )
}

export default Navbar