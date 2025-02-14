import React, { useState } from 'react'
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io'

const Projects = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className='flex flex-col p-20 gap-10 justify-evenly bg-white'>
            <p className='text-4xl md:text-5xl font-bold'>Skills</p>
            <div className='flex flex-col gap-5 bg-gray-600'>
                <p>Smart Networking & Recommendation Engine</p>
                <p>A platform that facilitates business networking by recommending potential collaborators based on profiles and business goals. Features personalized recommendations, top matches, and a streamlined user experience. Built using Node.js, Express.js, MongoDB, Flask API, React, HTML, and CSS. Collaborated with a team to ensure seamless functionality.</p>
            </div>
            <IoIosArrowDown />
            <IoIosArrowBack />
        </div >
    )
}

export default Projects