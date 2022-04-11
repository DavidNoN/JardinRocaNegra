import React from 'react';
import '../Styles/Cover.scss';
import { Link } from "react-router-dom";

const MyComponent = () => {
    return (
        <div className="inner cover">
            <h1 className="cover-heading">Jardin Roca Negra</h1>
            <p className="lead">Somos cultivadores de plantas Suculentas y Cactus con mas de 3 años en el mercado, y mas de 5 de experiencia, cultivamos plantas poco comunes, vendemos al por mayor y al detal</p>
            <p className="lead">
                <Link to="/plants-available" className="btn btn-lg btn-default">Ver Plantas Disponibles</Link>
            </p>
        </div>
    );
};

export default MyComponent;
