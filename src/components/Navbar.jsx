import React, { useEffect, useRef } from 'react'
import { IoMenu } from 'react-icons/io5';
const Navbar = ({ isOpen, setIsOpen }) => {
    return (
        <div className='fixed h-20 w-screen bg-black z-50'>
            <div className='hidden md:flex h-20 justify-evenly items-center'>
                {['Objective', 'Skills', 'Education', 'Achievements', 'Contact', 'About'].map((item, index) => (
                    <li key={index} className='text-sky-500 text-xl hover:scale-125 hover:text-white list-none transition-all duration-500'>
                        {item}
                    </li>
                ))}
            </div>
            <div className='flex md:hidden fixed h-screen w-screen'>
                <IoMenu className={`text-sky-500  my-5 mx-10 w-8 h-10 hover:scale-125 hover:text-white hover:cursor-pointer transition-all duration-500 `}
                    onClick={() => setIsOpen(!isOpen)} />
                <div className={`flex-col justify-around space-y-5 fixed top-1/3 left-1/3  ease-linear transition-all duration-1000 ${isOpen ? 'opacity-0 translate-x-0' : 'opacity-100 translate-x-5'}`}>
                    {['Objective', 'Skills', 'Education', 'Achievements', 'Contact', 'About'].map((item, index) => (
                        <li key={index} className={`text-sky-500 text-2xl list-none hover:text-white hover:scale-125 `}>
                            {item}
                        </li>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Navbar