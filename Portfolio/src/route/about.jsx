import {React, useState, useEffect} from 'react'
import Nav from '../components/Navbar/Navbar'

/* About Page */
function About() {
    // greetings text that changes based on time use state 
    const [greeting, setGreeting] = useState("")

    // Change greeting based on time of day
    //! Changes once reopening the page (not reloading or on focused page)
    useEffect(() => {
        
        function getGreeting(){
            const timeOfDay = new Date().getHours()

            if(timeOfDay >= 0 && timeOfDay < 12){
                setGreeting("Good Morning ☀️")
            }
            else if (timeOfDay >= 12 && timeOfDay < 18){
                setGreeting("Good Afternoon 🌤️")    
            }
            else {
            
                setGreeting("Good Evening 🌙")
            }
        }

        getGreeting();
    }, [])


    return (
        
        <div className = "w-full min-h-screen bg-blue-gradient ">
            
            <Nav color = "var(--color-dark-blue)"/>
            
            <div className="lg:px-[150px] md:px-[50px] px-[20px]"> {/* horizontal padding for better viewing */}
                <div className = "flex flex-col items-center w-full flex-grow">
                    <span className='text-6xl sm:text-5xl font-semibold mt-[2vh] mb-[3vh]'> 
                    
                        About
                    
                    </span>
            
            
                </div>

                {/* Self-Portrait image container*/}
                <div className = "flex justify-center md:block md:justify-start">
                    <img
                        src = {"./IMG_4.jpg"}
                        alt = {"profile"}
                        className="  md:float-left md:mr-8 mb-5 w-[80%] h-[350px] object-contain object-center rounded-md md:w-auto sm:h-[340px] sm:mb-4 bg-black/90 border-1 shadow-2xl border-black/30"

                    
                    />
                </div>

                {/* About Me paragraphs */}
                <div className = " text-[26px] sm:text-[24px] md:text-[20px] pb-5"
                        // text contain slight text-shadow to be less intense with the background
                        style={{
                            textShadow: `1px 1px 2px #fff, 1px 1px 4px #fff`,
                        }}>
                    <p className=" mb-4">
                        {greeting} my name is Fernando H. Remes 👋, born and raised in El Paso Tx. I have many goals and aspirations relating to Computer Science, but my main goal is to be well-rounded in the world of computing.
                    </p>

                    <p className="mb-4">
                        My passion for Computer Science began in high school when I enrolled in a Cybersecurity class during my senior year. Initially, I felt intimidated by the advanced knowledge of my classmates and the complexity of the subject. However, as I worked closely with my teacher and engaged in hands-on projects, like developing an autobiography website using HTML and CSS, assembling a PC, operating a drone, and winning an airline website design competition, I discovered a genuine enthusiasm for technology. 
                        These experiences ensured my decision to pursue a career in Computer Science and Cybersecurity.
                        {/* ensuring the next paragraph doesnt overlap with image*/}
                        <br/> 
                        <br/>    
                        {/* ensuring the next paragraph doesnt overlap with image*/}
                    </p>

                    {/* Goals / Education / Hobbies */}
                    <p className = " mb-2 flex flex-col lg:flex-row justify-around">
                        <div>
                        Goals:
                            <ul className="list-disc ml-[50px] py-1">
                                <li>Cybersecurity Specialist</li>
                                <li>I.T. Specialist</li>
                                <li>Web Development</li>
                            </ul>  
                        </div>
                        <div>
                        Academic Background:
                            <ul className="list-disc ml-[50px] py-1">
                                <li>Minor: Mathematics</li>
                                <li>Concentration: Secure Cyber Systems</li>
                                <li>[CS 4310/11], [CS 4316], [CS 4318], [CS 4379]</li>
                            </ul>  
                        
                        </div>

                        <div>
                        Hobbies:
                            <ul className="list-disc ml-[50px] py-1">
                                <li>Coding</li>
                                <li>Reading</li>
                                <li>Editing</li>

                            </ul>  
                        </div>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About;