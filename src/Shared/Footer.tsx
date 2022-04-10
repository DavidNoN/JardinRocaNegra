import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons"
import '../Styles/Footer.scss';

const MyComponent = () => {
    return (
            <footer className="py-5 bg-white pe-5 px-5">
                <div className="row">
                    <div className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-3">
                        <h5 className="text-center">¿Quienes Somos?</h5>
                        <ul className="nav flex-column align-content-center">
                            <li className="nav-item mb-2"><a href="/" className="nav-link p-0 text-muted">FAQs</a>
                            </li>
                            <li className="nav-item mb-2"><a href="/"
                                                             className="nav-link p-0 text-muted">Envios</a></li>
                            <li className="nav-item mb-2"><a href="/"
                                                             className="nav-link p-0 text-muted">Sobre Nosotros</a></li>
                            <li className="nav-item mb-2"><a href="/" className="nav-link p-0 text-muted">Calidad</a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-2 col-xxl-2">
                        <h5>Contáctanos</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2 c-pointer">
                                <a href="https://api.whatsapp.com/send?phone=573234917873&text=¡Hola Jardín Roca Negra!, Estoy interesado/a en tus plantas" target="_blank">
                                    <FontAwesomeIcon icon={ faWhatsapp } className="whatsApp__contact"/>
                                </a>
                            </li>
                            <li className="nav-item mb-2 mx-2 fw-bold">
                                Escribe ya!
                            </li>
                        </ul>
                    </div>

                    <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-2 col-xxl-2 mt-3 mt-sm-3 mt-md-0 mt-lg-0 mt-xl-0 mt-xxl-0">
                        <h5 className="text-center text-sm-center text-md-start text-lg-start text-xl-start text-xxl-start">Síguenos</h5>
                        <ul className="nav flex-row align-content-sm-center justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start justify-content-xxl-start">
                            <li className="nav-item mb-2 me-4">
                                <a href="https://www.facebook.com/jardinrocanegra" target="_blank" className="nav-link p-0 text-muted">
                                    <FontAwesomeIcon icon={ faFacebook } className="facebook__contact"/>
                                </a>
                            </li>
                            <li className="nav-item mb-2">
                                <a href="https://instagram.com/jardinrocanegra"  target="_blank" className="nav-link p-0 text-muted">
                                    <FontAwesomeIcon icon={ faInstagram } className="instagram__contact"/>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-5 col-xxl-5 mt-3 mt-sm-3 mt-md-0 mt-lg-0 mt-xl-0 mt-xxl-0">
                        <form>
                            <h5>Subscribe to our newsletter</h5>
                            <p>Monthly digest of whats new and exciting from us.</p>
                            <div className="d-flex w-100 gap-2">
                                <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                                <input id="newsletter1" type="text" className="form-control"
                                       placeholder="Email address"/>
                                <button className="btn btn-primary" type="button">Subscribe</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="d-flex justify-content-between py-4 my-4 border-top">
                    <p>&copy; 2018 Jardín Roca Negra, Inc. Todos los derechos reservados.</p>
                    <ul className="list-unstyled d-flex">
                        <li className="ms-3"><a className="link-dark" href="/">
                            <svg className="bi" width="24" height="24">
                                <use xlinkHref="/twitter"/>
                            </svg>
                        </a></li>
                        <li className="ms-3"><a className="link-dark" href="/">
                            <svg className="bi" width="24" height="24">
                                <use xlinkHref="/instagram"/>
                            </svg>
                        </a></li>
                        <li className="ms-3"><a className="link-dark" href="/">
                            <svg className="bi" width="24" height="24">
                                <use xlinkHref="/facebook"/>
                            </svg>
                        </a></li>
                    </ul>
                </div>
            </footer>
    );
};

export default MyComponent;
