import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Layout.css';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="layout">
      <AppBar position="static" className="app-bar">
        <Toolbar>
          <Typography variant="h6" className="title" onClick={() => navigate('/home')}>
            Sistema de Vinculación
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Cerrar Sesión</Button>
        </Toolbar>
      </AppBar>
      <Container className="main-content">
        {children}
      </Container>
      <footer className="footer">
        <Typography variant="body2" align="center">
          © 2024 Sistema de Vinculación. Todos los derechos reservados.
        </Typography>
      </footer>
    </div>
  );
};

export default Layout;