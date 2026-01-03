import React from 'react'

function SimpleButton({children, type="button", onClick, className}) {
    return (
        <button className={`rounded bg-black text-white font-bold py-3 transition-all transform active:scale-[0.95] hover:bg-brand-dark ${className}`}
        type={type} 
        onClick={onClick} 
        >
           {children} 
        </button>
    );
}
export default SimpleButton;