import React from 'react'
import CartButton from '../components/CartButton';
import UserLoginButton from '../components/UserLoginButon';
import HomeButton from '../components/neumaniaticosButton';
import { useAuth } from '../hooks/useAuth';

function NavigationBar() {
    return (
        <div>
            <nav className="bg-brand-light p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <HomeButton />

                    <div className='flex items-end'>
                        <UserLoginButton />
                        <CartButton />
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavigationBar;