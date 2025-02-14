import React from 'react'
import Objective from './Objective'
import Skills from './Skills'
import Projects from './Projects'


const Content = () => {
    return (
        <div className='text-xs md:text-2xl text-sky-500 font-mono'>
            <Objective />
            {/* <Skills /> */}
            <Projects />
        </div>
    )
}

export default Content
