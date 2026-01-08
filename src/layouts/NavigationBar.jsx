import React from 'react'
import { ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import CartButton from '../components/CartButton';
import { Link } from 'react-router-dom';
import HomeButton from '../components/neumaniaticosButton';

function NavigationBar() {

    return (
        <div>
            <nav className="bg-brand-light p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <HomeButton />

                    <div className='flex items-end '>
                        {/* User */}
                        <Link to="/login" className="p-2 text-brand-militar hover:text-black">
                            <UserCircleIcon className="w-7 h-7" />
                        </Link>
                        <CartButton />
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavigationBar;