"use client";;

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import Nav from '../components/Navbar/Navbar'
import AutoCarousel from "../components/Carousel/AutoCarousel";

import { MdKeyboardArrowLeft,  MdKeyboardArrowRight } from "react-icons/md";

import {projects} from '../data/projects.json'

/* Projects Page*/
function Projects() {
    // state to manage active project open
    const [active, setActive] = useState(false);
    // pagination states default = 4 projects per page
    const [projectsPerPage, setProjectsPerPage] = useState(4);
    // current page state default = 1
    const [currPage, setCurrPage] = useState(1);

    // adjust amount of projects per page based on screen size 
    useEffect(() => {
        const updateProjectsPerPage = () => {
            if (window.innerWidth > 768) setProjectsPerPage(6);
            else setProjectsPerPage(4);
        }

        updateProjectsPerPage(); // first load of page
        
        window.addEventListener("resize", updateProjectsPerPage); 
        return () => window.removeEventListener("resize", updateProjectsPerPage);
    
    }, [])

    // calculate start index and current projects to display
    const start = (currPage - 1) * projectsPerPage;
    // slice projects array to get current page projects
    const currProjects = projects.slice(start,  start + projectsPerPage);
    // total number of pages
    const totalPages = Math.ceil(projects.length / projectsPerPage);

    // ensure last page is always the valid even when changing screen size
    useEffect(() => {
        if(currPage > totalPages) {
            setCurrPage(totalPages)
        }


    
    },[projects.length, projectsPerPage])

    // handle escape options for exiting project component
    useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") { // click escape key
        setActive(false);
      }
    }
 
    if (active && typeof active === "object") { 
      document.body.style.overflow = "hidden";  // disable background scroll when project is active
    } else {    
      document.body.style.overflow = "auto";    // enable background scroll when project is not active
    }
 
    globalThis.addEventListener("keydown", onKeyDown);
    return () => globalThis.removeEventListener("keydown", onKeyDown);
  }, [active]);
 

    return (
        <div className = "no-scrollbar m-0 p-0  md:h-[95vh] h-[95vh] w-full overflow-y-auto bg-green-gradient">
        <Nav color = "var(--color-dark-green)"/>
        <div className="lg:px-[150px] md:px-[50px] px-[20px]"> {/* horizontal padding for better viewing */}
                {/* title text */}
                <div className = "flex justify-center m-5">
                    <span className='text-5xl font-semibold'> 
                        Projects
                    </span>
                </div>

                {/* Active Project Modal */}
                <AnimatePresence>
                    {active && typeof active === "object" && (
                        <motion.div
                            initial={{ opacity: 0}}
                            animate={{ opacity: 1}}
                            exit={{ opacity: 0}}
                            className="fixed inset-0 bg-black/20 h-full w-full z-10"
                            onClick={() => setActive(false)}
                        >
                            <div className=" fixed inset-0 grid place-items-center z-[20]">
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    
                                    className="relative w-[90%] h-[60%] sm:w-[500px] sm:h-auto max-w-[600px] flex flex-col bg-[#ffffff] rounded-3xl overflow-hidden shadow-xl "
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {/* Carousel */}
                                    <AutoCarousel images={active?.images} resetTrigger={active} />

                                    {/* Close X Button (For small devices) */}
                                    <button 
                                        className = "absolute top-1 right-1 flex justify-center items-center w-5 h-5 m-3 bg-gray-600/10 rounded-2xl p-3 text-black/80 cursor-pointer"
                                        onClick = {() => setActive(false)}    
                                    >
                                        X
                                    </button>
                                    {/* Project tags */}
                                    <div 
                                        className = "flex flex-nowrap items-center whitespace-nowrap mx-3 mt-2 px-1 py-2 text-black text-[12px] sm:text-sm overflow-x-auto gap-2 overflow-y-hidden  [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300">
                                            {active?.tags.map((tag) => (
                                                <div key={active.id} className=" rounded-3xl border border-(--glass-border) w-auto px-2 py-0 mb-1 sm:px-3 sm:py-1 sm:mb-2 font-semibold shadow-md/20 inset-shadow-sm inset-shadow-current/20 backdrop-blur-sm bg-(--glass-bg)">
                                                    {tag}
                                                </div>

                                            ))}
                                    </div>
                                    {/* Project Title and Description */}
                                    <motion.div // small bounce animation for title and description
                                        initial={{ y: 50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: 50, opacity: 0 }}
                                    >
                                        <div className="px-5 pb-5 pt-1 flex flex-col gap-1">
                                            <div className = "flex items-center gap-2 ">
                                                <h2 className="text-[#111111] text-md sm:text-2xl font-semibold">{active?.title} </h2>
                                                <h4 className = "font-medium text-sm sm:text-md md:text-lg">{active?.role}</h4>
                                            </div>
                                            <span className="text-[#111111] font-medium text-sm sm:text-md md:text-base">
                                                {active?.description}
                                            </span>
                                        
                                        </div>
                                    </motion.div>
                                    
                                </motion.div>
                            </div>
                
                        </motion.div>
                    )}
                </AnimatePresence>
                
                {/* Projects Grid */}
                <div className="w-full mb-2">
                    <div className="flex justify-center flex-wrap md:px-4 mt-4 md:mt-10 gap-5 md:gap-6 lg:gap-10 overflow-y-auto lg:overflow-hidden pb-10 z-5 ">
                        {currProjects.map((project) => (
                        <motion.div
                    
                            key={project.id}
                            onClick={() => setActive(project)}
                            className={`relative mt-4 overflow-hidden rounded-xl hover:scale-105 transition-transform duration-300 cursor-pointer z-0`}
                        >
                            <img
                            src={project.images[0]} // shows first image as preview
                            alt={project.title}
                            className="rounded-t-xl w-[320px] h-[200px] object-cover"
                            />
                            <div className="absolute bottom-0 left-0 w-full flex justify-center items-center bg-black/40 p-4 text-white hover:scale-120 transition-transform duration-300">
                            <span className="font-semibold">{project.title}</span>
                            </div>
                        </motion.div>
                        ))}
                    </div>
                </div>

                {/* Pagination Controls */}
                            
                <div className = "flex gap-3 mt-5 mb-3 ">
                    <button
                        onClick={() => setCurrPage((p) => Math.max(p - 1, 1))} // Go to previous page by ensuring current page doesnt go below 1
                        disabled={currPage === 1}
                        className="px-2 py-2 bg-[#f2f2f2] rounded-4xl disabled:opacity-50 cursor-pointer disabled:cursor-auto"
                    >
                        <MdKeyboardArrowLeft/>
                    </button>

                    {Array.from({length: totalPages}, (_, i) => (
                        <button
                            key={i}
                            onClick = {() => setCurrPage(i + 1)}
                            className = {`px-3 py-1 rounded-4xl border border-(--glass-border) font-semibold shadow-md/20 inset-shadow-sm inset-shadow-current/20 backdrop-blur ${
                                        currPage == i + 1 ? 'bg-(--glass-bg) text-white' : 'bg-[#f2f2f2]  cursor-pointer' 
                                        }
                                        ` } >
                                        {i+1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrPage((p) => Math.min(p+1, totalPages))} // Go to next page by ensuring current page doesnt exceed total pages
                        disabled={currPage === totalPages}
                        className="px-2 py-2 bg-[#f2f2f2] rounded-4xl disabled:opacity-50 cursor-pointer disabled:cursor-auto"
                    >
                        <MdKeyboardArrowRight/>
                    </button>

                </div>
        
            </div>
        </div>
    )
}

export default Projects;
