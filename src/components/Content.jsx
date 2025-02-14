import React from 'react'
import ProfileImage from '../assets/profile.png'
import { FaLinkedin, FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const Content = () => {
    return (
        <div className='h-screen flex flex-col p-10 md:p-20 justify-center gap-20 text-xs md:text-2xl text-sky-500 font-mono'>
            <div className='flex flex-col justify-evenly gap-10'>
                <p className='text-4xl md:text-5xl font-bold'>Kathiravan</p>
                <p>Innovative full-stack developer and machine learning enthusiast with hands-on experience in building intelligent, scalable applications. Passionate about AI-driven solutions and continuous learning to create impactful, tech-driven products.</p>
            </div>
            <div className='flex md:flex flex-row-reverse justify-around items-center gap-5 '>
                <img src={ProfileImage} className='rounded-full border-4 size-30 md:size-50' />
                <div className='flex flex-col items-start gap-4 md:gap-8 '>
                    <a href='https://www.linkedin.com/in/kathiravan-b-980b00313' target='_blank' className='flex items-center gap-4 hover:scale-125 hover:text-white transition-all duration-500'><FaLinkedin className='size-8 md:size-10' />LinkedIn</a>
                    <a href='https://github.com/Kathir0478' target='_blank' className='flex items-center gap-4 hover:scale-125 hover:text-white transition-all duration-500'><FaGithub className='size-8 md:size-10' />Github</a>
                    <a href='https://leetcode.com/u/kathiravan_b/' target='_blank' className='flex items-center gap-4 hover:scale-125 hover:text-white transition-all duration-500'><SiLeetcode className='size-8 md:size-10' />LeetCode</a>
                </div>
            </div>
        </div>
    )
}

export default Content
