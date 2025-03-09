import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const userAuth = !!localStorage.getItem('token');

    return userAuth ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;