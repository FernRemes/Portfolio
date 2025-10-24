import React from 'react';
import PropTypes from 'prop-types';

/* Hovering overlay component otherwise simple text */
function Hovering({title, color}){
    return (
        <>
            {/* tablets and smaller devices text (hidden for desktops) */}
            <span   className = "text-5xl text-white font-semibold relative flex justify-center items-center lg:hidden w-full h-full"
                    // text stroke and subtle text shadow
                    style={{
                                textShadow: `2px 2px 2px ${color}, 4px 4px 4px ${color}`,
                                WebkitTextStroke: '1px #000',
                            }}>
                    {title}
            </span>


            {/*  Gradient black overlay with custom page title text */}
            <div className = "hidden lg:block relative w-full h-full group cursor-pointer" >
                <div className = " flex justify-center bg- bg-linear-to-t from-[#000000] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-full">
                    
                    <div className = "absolute top-3/4 left-1/2 -translate-x-1/2 text-center opacity-0 translate-y-[30px] group-hover:opacity-100 group-hover:translate-y-[0px] transform transition-all duration-500 ease-out">
                    <span   className="text-white text-5xl font-[600]"
                            style={{
                                textShadow: `1px 2px 4px ${color}, 1px 4px 6px ${color}`,
                                WebkitTextStroke: '1px #000',
                            }}>
                        {title}
                    </span>

                    </div>
                </div>
            </div>
        </>
    )
}

Hovering.propTypes = {
    title: PropTypes.string.isRequired,
    color: PropTypes.string,
};

Hovering.defaultProps = {
    color: '#ffffff',
};

export default Hovering;