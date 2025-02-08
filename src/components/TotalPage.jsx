import React, { useEffect, useRef, useState } from 'react'
import { TiThMenu } from "react-icons/ti";

const TotalPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);
    return (
        <>
            <div className='relative w-screen h-screen bg-amber-500'>
                <ul className='hidden lg:flex justify-around items-center px-10 py-5 text-white text-2xl'>
                    {['Objective', 'Skills', 'Education', 'Achievements', 'Projects', 'Contact'].map((item, index) => (
                        <li className='hover:scale-110 transition duration-500 hover:text-black hover:cursor-pointer' key={index}>{item}</li>
                    ))}
                </ul>
                <div>
                    <button onClick={() => setIsOpen(!isOpen)}>
                        <TiThMenu className={`lg:hidden absolute top-5 left-5 text-white text-2xl m-2 hover:text-black hover:scale-125 transition duration-500 hover:cursor-pointer ${isOpen && 'hidden'}`} />
                    </button>
                </div>
                <ul ref={menuRef} className={`md:hidden absolute top-0 left-0 flex flex-col justify-between p-16 items-start text-white text-2xl space-y-5  transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'}`}>
                    {['Objective', 'Skills', 'Education', 'Achievements', 'Projects', 'Contact'].map((item, index) => (
                        <li className='hover:scale-110 transition duration-500 hover:text-black hover:cursor-pointer' key={index} onClick={() => setIsOpen(false)}>{item}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default TotalPage