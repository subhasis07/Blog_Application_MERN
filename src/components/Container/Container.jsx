import React from "react";


// The Container component wraps its children in a styled div for consistent spacing and layout.
function Container({children}){
    return (
        <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>
    )
}

export default Container;