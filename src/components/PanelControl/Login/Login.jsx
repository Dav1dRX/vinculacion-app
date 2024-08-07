import React, { useState } from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import NetworkBackground from '../NetworkBackground/NetworkBackground';
import { useNavigate } from 'react-router-dom';

import './Login.css';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      await login(usuario, password);
      showNotification('Inicio de sesión exitoso', 'success');
      navigate('/home');
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      showNotification('Error al iniciar sesión: ' + error.message, 'error');
    }
  };

  return (
    <div className="login-container">
      <NetworkBackground />
      <Paper elevation={3} className="login-paper">
        <div className="login-image-container">
          <img src="https://latinrev.flacso.org.ar/sites/default/files/logos/logo-ug-transparencia.png" alt="Logo" className="login-image" />
        </div>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Vinculacion 
        </Typography>
        <form onSubmit={handleSubmit} className="login-form">
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            type="email"
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Acceder
          </Button>
        </form>
        <Typography variant="body2" align="center" className="copyright">
          © Universidad de Guayaquil
        </Typography>
      </Paper>
    </div>
  );
};

export default Login;