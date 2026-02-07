import React, { use } from 'react';
import { UserCircleIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function UserLoginButton() {
    const { user, isAuthenticated, logout } = useAuth();
    const location = useLocation();
    return (
        <div>
            {/* LÓGICA DE USUARIO */}
            {isAuthenticated ? (
                // --- ESTADO: LOGUEADO ---
                <div className="flex-1 flex items-center gap-1">
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
                <Link to="/login" state={{from:location}}title="Iniciar Sesión" className="">
                    <div className="flex-1 flex items-center gap-1 p-2 text-brand-militar hover:text-brand-dark transition-colors">
                        <span className=" text-sm font-bold  hidden sm:flex">
                            Ingresar
                        </span>
                        <UserCircleIcon className="flex w-8 h-8" />
                    </div>
                </Link>
            )}
        </div>
    );
}

export default UserLoginButton;


