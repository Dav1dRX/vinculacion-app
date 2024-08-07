import React from 'react';
import { Typography, Button, Container, Grid, Paper, Box } from '@mui/material';
import { ArrowForward, School, Work, TrendingUp } from '@mui/icons-material';
import { useSpring, animated } from 'react-spring';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const AnimatedTypography = animated(Typography);
const AnimatedPaper = animated(Paper);

const Home = () => {
  const navigate = useNavigate();

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 300,
  });

  const slideUp = useSpring({
    transform: 'translateY(0)',
    from: { transform: 'translateY(50px)' },
    delay: 500,
  });

  return (
    <Container maxWidth="lg" className="home-container">
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <AnimatedTypography variant="h2" component="h1" gutterBottom style={fadeIn} className="gradient-text">
            Sistema de Vinculación
          </AnimatedTypography>
          <AnimatedTypography variant="h5" paragraph style={slideUp} className="subtitle">
            Conectamos estudiantes con oportunidades de crecimiento profesional y personal.
          </AnimatedTypography>
          <AnimatedPaper elevation={3} className="info-paper" style={slideUp}>
            <Typography variant="body1" className="feature-title">
              Nuestro sistema ofrece:
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Paper elevation={2} className="feature-card">
                  <School className="feature-icon" />
                  <Typography variant="body2">Oportunidades de prácticas</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper elevation={2} className="feature-card">
                  <Work className="feature-icon" />
                  <Typography variant="body2">Seguimiento de horas</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper elevation={2} className="feature-card">
                  <TrendingUp className="feature-icon" />
                  <Typography variant="body2">Conexión con mentores</Typography>
                </Paper>
              </Grid>
            </Grid>
          </AnimatedPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box className="image-container">
            <img 
              src="https://images.stockcake.com/public/1/2/0/1202e784-28ed-45cb-ae9d-71b9a1cef270_large/student-a-grade-stockcake.jpg" 
              alt="Estudiantes en vinculación" 
              className="home-image"
            />
          </Box>
        </Grid>
      </Grid>
      <Box className="control-panel-link">
        <Button 
          variant="contained" 
          color="primary" 
          endIcon={<ArrowForward />}
          onClick={() => navigate('/panel-control')}
          size="large"
          className="gradient-button"
        >
          Panel de Control
        </Button>
        <div className="line"></div>
      </Box>
    </Container>
  );
};

export default Home;