import React from 'react'
import Hovering from '../components/Hovering/Hovering'
import {Link} from 'react-router-dom';
import AboutImg from '../../public/assets/images/about.png'
import ProjectsImg from '../../public/assets/images/projects.png'
import SkillsImg from '../../public/assets/images/skills.png'
import ContactImg from '../../public/assets/images/contact.png'

/* Home Page */
function Home() {
    return (

          <div className = "grid lg:grid-cols-4  m-0 p-0 min-h-[95vh] w-full overflow-hidden ">
            {/* About Link */}
            <Link to = '/about'>
            <div className = " relative bg-blue-gradient border-[var(--color-dark-blue)] border-5 border-b-0 group h-full overflow-hidden">
              <div  className = {`absolute inset-0 bg-cover bg-center hidden lg:block opacity-80 transform transition-transform duration-500 group-hover:scale-110`}
                    style = {{
                            backgroundImage: `url(${AboutImg})`
                    }}
              ></div>
            
                          
              <Hovering title = "ABOUT" color = "var(--color-dark-blue)"/>
            </div>
            </Link>

            {/* Projects Link */}
            <Link to="/projects">
            <div className = "relative bg-green-gradient border-[var(--color-dark-green)]  border-5 border-b-0 group h-full overflow-hidden">
              <div  className = {`absolute inset-0 bg-cover bg-center hidden lg:block opacity-80 transform transition-transform duration-500 group-hover:scale-110`}
                  style = {{
                          backgroundImage: `url(${ProjectsImg})`
                  }}
              ></div>

              <Hovering title = "PROJECTS" color = "var(--color-dark-green)"/>
            </div>
            </Link>

            {/* Skills Link */}
            <Link to="/skills">
            <div className = "relative bg-red-gradient border-[var(--color-dark-red)] border-5 border-b-0 group h-full overflow-hidden">
              <div  className = {`absolute inset-0 bg-cover bg-center hidden lg:block opacity-80 transform transition-transform duration-500 group-hover:scale-110`}
                  style = {{
                          backgroundImage: `url(${SkillsImg})`
                  }}>
              </div>
              <Hovering title = "SKILLS" color = "var(--color-dark-red)"/>
            </div>
            </Link>

            {/* Contact Link */}
            <Link to="/contact">
            <div className = "relative bg-purple-gradient border-[var(--color-dark-purple)] border-5 border-b-0 group h-full overflow-hidden">
              <div  className = {`absolute inset-0 bg-cover bg-center hidden lg:block opacity-70 transform transition-transform duration-500 group-hover:scale-110`}
                  style = {{
                          backgroundImage: `url(${ContactImg})`
                  }}>
              </div>
              <Hovering title = "CONTACT" color = "var(--color-dark-purple)"/>
            </div>
            </Link>
        </div>
        
        
    
    
    );

}

export default Home