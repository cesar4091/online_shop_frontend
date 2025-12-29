import React from 'react'

function Footer() {
    return (
        <section className='bg-brand-light relative pt-10'>
            <div className='opacity-20 absolute inset-0 z-0 bg-[url(./assets/transparent-tire-track.png)] bg-center' aria-hidden="true" />
            <div className='relative z-20 flex gap-4 items-center justify-center flex-col sm:flex-row'>
                <a href="#" class="text-black-300 hover:text-white px-3 ">Llantas</a>
                <p className='hidden sm:block'> • </p>
                <a href="#" class="text-black-300 hover:text-white px-3 ">Puntos de venta</a>
                <p className='hidden sm:inline-block'> • </p>
                <a href="#" class="text-black-300 hover:text-white px-3">Contacto</a>
            </div>
            <p className='text-center pt-10'>2025 Neumaniaticos, S.A. © Todos los derechos reservados.</p>
        </section>
    );
}

export default Footer;