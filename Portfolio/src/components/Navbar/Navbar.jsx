import React from 'react'
import {useNavigate} from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import PropTypes from 'prop-types'

/* Home navbar component */
function Navbar({color}) {
    const navigate = useNavigate();

    // Go back to home page
    const backHome = () => {

        navigate("/"); 
    }


    return (

        // simple button on the top left 
        //! TODO: update for future custom user setting preferences 
        <div className="relative p-5 mb-[50px] ">
            <button 
                className= " flex justify-center items-center w-auto h-full p-3 text-white text-[30px] border-2 rounded-md border-black cursor-pointer hover:scale-110"
                style = {{backgroundColor: color}}
                onClick = {backHome}
                
                >
                <GiHamburgerMenu/>
                    
            </button>
        </div>
        
    );
}

Navbar.propTypes = {
    color: PropTypes.string
}


export default Navbar;
