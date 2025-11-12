import {React, useState, useEffect} from 'react'
import Nav from '../components/Navbar/Navbar'
import { MdKeyboardArrowLeft,  MdKeyboardArrowRight } from "react-icons/md";

import {skills} from "../data/skills.json";

/* Skills Page*/
function Skills() {
    // pagination states default = 8 skills per page
    const [skillsPerPage, setSkillsPerPage] = useState(8);
    // current page state default = 1
    const [currPage, setCurrPage] = useState(1);
    
    // adjust amount of skills per page based on screen size 
    useEffect(() => {
        const updateSkillsPerPage = () => {
            if (window.innerWidth > 1024) setSkillsPerPage(18);
            else if (window.innerWidth > 768) setSkillsPerPage(16);
            else if (window.innerWidth > 425) setSkillsPerPage(12)
            else setSkillsPerPage(8);
        
        }

        updateSkillsPerPage(); // first load of page
        
        window.addEventListener("resize", updateSkillsPerPage); 
        return () => window.removeEventListener("resize", updateSkillsPerPage);
    
    }, [])
    // calculate start index and current skills to display
    const start = (currPage - 1) * skillsPerPage;
    // slice skills array to get current page projects
    const currSkills = skills.slice(start,  start + skillsPerPage);
    // total number of pages
    const totalPages = Math.ceil(skills.length / skillsPerPage);

    // ensure last page is always the valid even when changing screen size
    useEffect(() => {
        if(currPage > totalPages) {
            setCurrPage(totalPages)
        }


    
    },[skills.length, skillsPerPage])


    return (
        <div className = "no-scrollbar m-0 p-0  min-h-[95vh] w-full overflow-y-auto md:overflow-y-auto bg-red-gradient [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2  [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
        <Nav color = "var(--color-dark-red)"/>
        <div className="lg:px-[150px] md:px-[50px] px-[20px]"> {/* horizontal padding for better viewing */}
                {/* title text */}
                <div className = "flex flex-col items-center w-full flex-grow">
                    <span className='text-4xl sm:text-5xl font-semibold mt-[2vh] mb-[3vh]'> 
                        Skills
                    </span>
                </div>

               
                {/* skills grid list */}
                
                    <div className = "flex justify-center lg:justify-normal flex-wrap mt-4 md:mt-14 gap-2 md:gap-4 overflow-y-auto sm:h-[50vh] md:h-[55vh] lg:h-[60vh] pb-2  [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                        {currSkills.map((skill) => (
                        
                        <div key={skill.id} className= " rounded-3xl border border-(--glass-border) p-2 sm:p-5 font-semibold shadow-md/20 inset-shadow-sm inset-shadow-current/20 backdrop-blur-sm bg-(--glass-bg) text-white w-[120px] h-[100px] sm:w-[180px] sm:h-[130px] [&:hover]:scale-110 transition duration-300">
                            <div className = "flex justify-center items-center ">
                                <img src={skill.icon} alt={skill.name} className = "object-contain w-[60px] h-[60px] mb-2 inset-shadow-sm inset-shadow-black/20 backdrop-blur-md "/>
                            </div>
                            <span className = "flex justify-center items-center w-auto text-[12px] sm:text-[16px]">
                                {skill.name}
                            </span>
                        </div>
                        ))} 
                    </div>
                
                {/* Pagination Controls */}
                
                <div className = "flex gap-3 mb-[3vh] mt-5 z-20 relative">
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
                                        ` }>
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

export default Skills;

