import React, { useState } from 'react'
import Navbar from './Navbar';
import Content from './Content';

const Index = () => {
    const [isOpen, setIsOpen] = useState(false);

    console.log(isOpen)
    return (
        <div className='w-full h-full'>
            <div className='bg-fixed bg-gradient-to-b from-black to-gray-900'>
                <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
                <div className={`${isOpen ? 'opacity-0 ' : 'opacity-100 '} md:opacity-100 transition-all duration-500`}>
                    <Content />
                </div>
            </div>
        </div>
    )
}

export default Index