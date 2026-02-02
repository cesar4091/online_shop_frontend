import React from 'react'
import { ShoppingCartIcon, UserCircleIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import CartButton from '../components/CartButton';
import { Link } from 'react-router-dom';
import HomeButton from '../components/neumaniaticosButton';
import { useAuth } from '../hooks/useAuth';

function NavigationBar() {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <div>
            <nav className="bg-brand-light p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <HomeButton />

                    <div className='flex items-end'>

                        {/* LÓGICA DE USUARIO */}
                        {isAuthenticated ? (
                            // --- ESTADO: LOGUEADO ---
                            <div className="">
                                {/* Nombre del Usuario */}
                                <div className="text-right hidden sm:block">
                                    <p className="text-[10px] uppercase tracking-wider text-brand-gray font-bold">Hola,</p>
                                    <p className="text-sm font-bold text-brand-militar truncate max-w-35.5">
                                        {user?.name || "Usuario"}
                                    </p>
                                </div>

                                {/* Botón Logout (Icono de Salida) */}
                                <button
                                    onClick={logout}
                                    title="Cerrar Sesión"
                                    className="p-2 rounded-full hover:bg-brand-light text-brand-gray hover:text-red-600 transition-all"
                                >
                                    <ArrowRightStartOnRectangleIcon className="w-7 h-7" />
                                </button>
                            </div>
                        ) : (
                            // --- ESTADO: NO LOGUEADO (Invitado) ---
                            <Link to="/login" title="Iniciar Sesión" className="pl-4 border-l border-gray-200">
                                <div className="flex items-center gap-2 group cursor-pointer">
                                    <span className="text-sm font-bold text-brand-dark group-hover:text-brand-militar hidden sm:block">
                                        Ingresar
                                    </span>
                                    <UserCircleIcon className="w-7 h-7 text-brand-dark group-hover:text-brand-militar transition-colors" />
                                </div>
                            </Link>
                        )}


                        <CartButton />
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavigationBar;