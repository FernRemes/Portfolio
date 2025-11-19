import {React, useState } from 'react'
import Nav from '../components/Navbar/Navbar'
// react icons
import { TiSocialLinkedinCircular } from "react-icons/ti"
import { VscGithub } from 'react-icons/vsc'
import { MdDownload } from 'react-icons/md'
// globe assets
import World from '../components/ui/globe.jsx'
import globeGif from '../../public/assets/globe-transparent.gif' 

// inclusion of animation
import { motion, AnimatePresence } from "framer-motion"

/* Contact page */
function Contact() {
    // preview resume default false
    const [showResume, setShowResume] = useState(false);
    const resume = './pdf/Resume.pdf';

    // configuration setup for 3D globe
    const globeConfig = {
        pointSize: 1,                                       // Size of the points on the globe
        globeColor: "#ffffff",                              // Color of the globe
        showAtmosphere: true,                               // Whether to show the atmosphere
        atmosphereColor: "#000000",                         // Color of the atmosphere
        atmosphereAltitude: 0.2,                            // Altitude of the atmosphere
        emissive: "#ffffff",                                // Emissive color of the globe
        emissiveIntensity: 1.5,                             // Emissive intensity of the globe
        shininess: 0.1,                                     // Shininess of the globe
        polygonColor: "#000000",                            // Color of the globe polygons
        ambientLight: "#000000",                            // Ambient light color
        directionalLeftLight: "#ffffff",                    // Directional light color (left)
        directionalTopLight: "#ffffff",                     // Directional light color (top)
        pointLight: "#ffffff",                              // Point light color
        arcTime: 1000,                                      // Arc animation time
        arcLength: 0.9,                                     // Arc length
        rings: 1,                                           // Number of rings
        maxRings: 3,                                        // Maximum number of rings
        initialPosition: { lat: 22.3193, lng: 114.1694 },   // Initial position of the globe
        autoRotate: true,                                   // Whether to enable auto-rotation
        autoRotateSpeed: 0.3,                               // Speed of auto-rotation
    };  
    
    return (
        <div className = "relative no-scrollbar m-0 p-0   min-h-screen overflow-y-auto  bg-purple-gradient [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
            {/* A 3D globe would be too much for smaller devices to load, thus, change globe to a png */}
            <div className={`absolute  inset-0 bg-cover bg-center lg:hidden opacity-90`} style = {{ backgroundImage: `url(${globeGif})`}}></div>
            
            <Nav color = "var(--color-dark-purple)"/>
            <div className="lg:px-[140px] md:px-[40px] px-[20px]"> {/* horizontal padding for better viewing */}
                <div className = "flex flex-col items-center w-full flex-grow">
                    <span className='text-4xl sm:text-5xl font-semibold mt-[2vh] mb-[3vh] lg:m-0'>  
                
                    Contact
                
                </span>
            
            
                </div>

                <div className = "flex justify-center py-5 mt:5 sm:mt-10 md:mt-14 md:overflow-hidden min-h-[450px] md:min-h-[60vh] lg:min-h-[68vh]">
                    {/*  3D Globe  */}
                    <div className='hidden lg:flex lg:w-[min(40vw,300px)] xl:w-[40vw] static top-[10%] lg:min-h-[500px] lg:h-full aspect-squared '>
                        <div className = "items-center static w-full">
                            <World globeConfig = {globeConfig} />
                        </div>
                    </div>
                    {/* 3d Globe */}

                    {/* Contact container */}
                    <div className = "flex justify-center sm:items-center lg:items-baseline text-center z-10 md:w-[60%] w-full  ">
                        <div className ="bg-dark-purple  w-[90%] sm:w-[85%] md:w-[80%] rounded-3xl lg:rounded-4xl shadow-md p-5 sm:p-6 ">
                            <div className="flex flex-col my-3 sm:mt-8 lg:mt-4  gap-2 justify-center items-center">

                                {/* Header and Subheader*/}
                                <div className="text-center">
                                    <span className="text-white text-xl sm:text-2xl lg:text-3xl font-semibold block">
                                    These are my socials
                                    </span>
                                    <span className="text-white text-xs sm:text-sm lg:text-xs block md:mx-5 md:my-2">
                                    If you have any questions, comments, or concerns do not be afraid to contact me
                                    </span>
                                </div>

                                    {/* Contact Info */}
                                    <div className="bg-white my-2 sm:my-4 md:h-[90%] h-[80%] w-full rounded-2xl justify-center items-center">
                                        <span className = "font-semibold md:text-xl text-md flex pl-4">Current Residence</span>
                                        <span className = "font-semibold md:text-lg text-sm flex justify-center">El Paso TX. United Sates</span>
                                    
                                    </div>
                                    <div className="bg-white my-2 sm:my-4 md:h-[90%] h-[80%] w-full rounded-2xl">
                                        <span className = "font-semibold md:text-xl text-md flex pl-4 stroke-red">Phone Number</span>
                                        <span className = "font-semibold md:text-lg text-sm flex justify-center">(915) 228-8292</span>

                                    </div>
                                    <div className="bg-white my-2 sm:my-4 md:h-[90%] h-[80%] w-full rounded-2xl">
                                        <span className = "font-semibold md:text-xl text-md flex pl-4">Email</span>
                                        <span className = "font-semibold md:text-lg text-sm  flex justify-center">nandoremes@gmail.com</span>
                                    </div>
                                {/* Resume preview and download button */}
                                <button className="group flex items-center justify-center gap-2 bg-light-purple rounded-2xl shadow-md py-2 px-6  sm:w-[220px] md:w-[210px] lg:w-[220px] hover:scale-125 cursor-pointer" 
                                        onClick={() => {
                                            if (window.innerWidth < 1024) {
                                                const link = document.createElement('a');
                                                link.href = resume;
                                                link.download = "Resume.pdf"
                                                link.click()
                                            
                                            }
                                            else setShowResume(true);
                                        }
                                        }>
                                    <span className = "text-white text-[12px] sm:text-sm md:text-md block">Download Resume</span>
                                    <div className=" text-dark-green text-center text-2xl md:text-xl  ">
                                    <MdDownload />
                                    </div>
                                </button>
                                    
                                
                                {/* Social buttons */}
                                <div className='flex justify-center items-center text-center w-[80%] gap-3 sm:gap-6 flex-wrap mt-2'>
                                        <button className = "bg-light-purple rounded-full w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center text-white text-5xl sm:text-5xl shadow-md hover:scale-125 cursor-pointer"
                                                onClick = {() => {
                                                    const link = document.createElement('a');
                                                    link.href = 'https://www.linkedin.com/in/fernremes/';
                                                    link.target = "_blank"
                                                    link.click()
                                                
                                                }}
                                        >
                                            <TiSocialLinkedinCircular/>
                                        </button>
                                        <button className = " bg-light-purple rounded-full w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center text-white text-3xl sm:text-4xl shadow-md hover:scale-125 cursor-pointer"
                                                onClick = {() => {
                                                    const link = document.createElement('a');
                                                    link.href = 'https://github.com/FernRemes';
                                                    link.target = "_blank"
                                                    link.click()
                                                
                                                }}
                                            >
                                            <VscGithub/>
                                        </button>
                                        
                                </div>
                            </div>
                            
                            {/* Resume Preview Container */}
                            <AnimatePresence>
                            {showResume && (
                                <motion.div 
                                    className="fixed inset-0 bg-black/50 flex justify-center items-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, transition: { duration: 0 } }}
                                    onClick={() => setShowResume(false)}
                                >
                                <motion.div 
                                    className="bg-linear-to-b from-dark-blue to-light-purple p-4 rounded-lg shadow-lg w-[80%] h-[80%] relative"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ type: "spring", stiffness: 120, damping: 15 }}
                                    >
                                    <iframe
                                    src={resume}
                                    title="PDF Preview"
                                    className="w-full h-full border-none"
                                    ></iframe>
                                    <div className="flex justify-end mt-2">
                                    <a
                                        href={resume}
                                        download
                                        className="bg-dark-blue text-white px-4 py-2 rounded-lg hover:scale-110 mr-2"
                                    >
                                        Download
                                    </a>
                                    <button
                                        onClick={() => setShowResume(false)}
                                        className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                                    >
                                        Close
                                    </button>
                                    </div>
                                </motion.div>
                                </motion.div>
                            )}
                                </AnimatePresence>
                        </div>
                    
                    
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Contact;