import React, { useContext, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface PrivateRouteProps {
  children: ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    // Opcional: lanzar error si el contexto no está disponible
    throw new Error('AuthContext no disponible');
  }

  const { user } = authContext;

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default PrivateRoute;