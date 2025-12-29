import React from 'react'

function StandardButton({children, type="button", onClick, className}) {
    return (
        <button className={`rounded-full bg-black text-white font-bold py-3 shadow-lg shadow-brand-dark transition-all transform active:scale-[0.98] hover:bg-brand-dark ${className}`}
        type={type} 
        onClick={onClick} 
        >
           {children} 
        </button>
    );
}
export default StandardButton;