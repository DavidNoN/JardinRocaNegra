import React from 'react';
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";


export const AdminRoute = ({typeUser, redirectPath = '/unauthorized', children}) => {
    if (typeUser !== 'Admin') {
        return <Navigate to={redirectPath} replace />
    }

    return children;
}

AdminRoute.propTypes = {
    typeUser: PropTypes.string.isRequired,
    redirectPath: PropTypes.string,
    children: PropTypes.object.isRequired
};
