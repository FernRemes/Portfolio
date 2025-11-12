import React from 'react';

/* Footer component to appear below every page*/
function Footer() {
    return (
        <footer className = "z-20 flex justify-center items-center text-center m-0 py-1 h-[5vh] bg-[#f2f2f2e5] font-semibold text-[20px] sm:text-[24px] md:text-[18px] overflow-hidden"
            style={{
                    WebkitTextStroke: '0.2px #ffffff',
                    }}>
            © 2025 Fernando H Remes
        </footer>
    
    );
    
}

export default Footer;