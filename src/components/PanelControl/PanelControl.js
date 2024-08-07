import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Person, Link, Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import './PanelControl.css';

const AnimatedCard = animated(Card);

const PanelControl = () => {
  const navigate = useNavigate();

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 300,
  });

  const options = [
    {
      title: "Ingresar Estudiante",
      description: "Registra nuevos estudiantes en el sistema",
      icon: <Person fontSize="large" />,
      path: "/ingresar-estudiante",
      image: "https://images.stockcake.com/public/5/a/7/5a7792a0-036f-41e5-9287-01fd43d821a0_large/focused-student-studying-stockcake.jpg"
    },
    {
      title: "Ingresar Vinculación",
      description: "Añade nuevas vinculaciones para los estudiantes",
      icon: <Link fontSize="large" />,
      path: "/ingresar-vinculacion",
      image: "https://images.stockcake.com/public/7/0/7/707d712a-55ab-4b5c-81ad-c8e77e5d6e3a_large/student-analyzing-data-stockcake.jpg"
    },
    {
      title: "Consultas",
      description: "Realiza consultas sobre estudiantes y vinculaciones",
      icon: <Search fontSize="large" />,
      path: "/consultas",
      image: "https://images.stockcake.com/public/1/a/8/1a80fcb4-cdf1-4dbb-96ef-c76cd1fcbd79_large/virtual-team-meeting-stockcake.jpg"
    }
  ];

  return (
    <div className="panel-control-container">
      <Typography variant="h3" component="h1" gutterBottom className="panel-title">
        Panel de Control
      </Typography>
      <Grid container spacing={4}>
        {options.map((option, index) => (
          <Grid item xs={12} md={4} key={index}>
            <AnimatedCard 
              className="option-card" 
              style={fadeIn} 
              onClick={() => navigate(option.path)}
            >
              <CardMedia
                component="img"
                height="140"
                image={option.image}
                alt={option.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" className="card-title">
                  {option.icon}
                  {option.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {option.description}
                </Typography>
              </CardContent>
            </AnimatedCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PanelControl;