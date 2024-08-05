import React, {useState, useEffect} from 'react'
import logo4 from '../../../../markupBlanco.png'

const Footer = () => {
    return (
        <footer
                className="mt-32 bg-gray-900 sm:mt-56"
                aria-labelledby="footer-heading"
            >
                <h2 id="footer-heading" className="sr-only">
                    Footer
                </h2>
                <div className="mx-auto max-w-7xl px-6 py-16 flex items-center justify-between">
                    <div className="logo">
                        <img src={logo4} alt="Logo" className="h-16 w-auto" />
                    </div>
                    <p className="text-white text-center">
                        <strong>© 2024 por Markup Developers.</strong> Todos los derechos
                        son reservados.
                    </p>
                </div>
        </footer>
    )
}

export default Footer;