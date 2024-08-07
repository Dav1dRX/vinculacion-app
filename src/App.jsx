import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login/Login';
import Home from './pages/Home/Home';
import PanelControl from './components/PanelControl/PanelControl';
import IngresarEstudiante from './pages/IngresarEstudiante/IngresarEstudiante';
import IngresarVinculacion from './pages/IngresarVinculacion/IngresarVinculacion';
import Consultas from './pages/Consultas/Consultas';
import Layout from './components/Layout/Layout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#00bcd4',
    },
  },
});

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <Layout>{children}</Layout> : <Navigate to="/login" />;
};

function AppContent() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showLanding, setShowLanding] = useState(!user);

  const handleEnter = () => {
    setShowLanding(false);
    navigate('/login');
  };

  if (showLanding && !user) {
    return <LandingPage onEnter={handleEnter} />;
  }

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/panel-control" element={<ProtectedRoute><PanelControl /></ProtectedRoute>} />
      <Route path="/ingresar-estudiante" element={<ProtectedRoute><IngresarEstudiante /></ProtectedRoute>} />
      <Route path="/ingresar-vinculacion" element={<ProtectedRoute><IngresarVinculacion /></ProtectedRoute>} />
      <Route path="/consultas" element={<ProtectedRoute><Consultas /></ProtectedRoute>} />
      <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <AuthProvider>
          <Router>
            <AppContent />
          </Router>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;