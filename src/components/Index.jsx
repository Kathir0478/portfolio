import React, { useState } from 'react'
import Content from './Content'
import Navbar from './Navbar';

const Index = () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className='w-screen h-screen'>
            <div className='bg-fixed bg-gradient-to-b from-black to-gray-900'>
                <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
                <div className='w-screen bg-fixed bg-gradient-to-b from-black to-gray-900 absolute top-20'>
                    <div className={`${isOpen ? 'opacity-100' : 'opacity-0'} md:opacity-100 ease-out transition-all duration-1000 `}>
                        <Content />
                        <Content />
                        <Content />
                        <Content />
                        <Content />
                        <Content />
                        <Content />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index