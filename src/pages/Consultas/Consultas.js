import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import ConsultaEstudiante from '../../components/ConsultaEstudiante/ConsultaEstudiante';
import ConsultaInstitucion from '../../components/ConsultaInstitucion/ConsultaInstitucion';
import ConsultaDocente from '../../components/ConsultaDocente/ConsultaDocente';

const Consultas = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Consultas
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ConsultaEstudiante />
        </Grid>
        <Grid item xs={12}>
          <ConsultaInstitucion />
        </Grid>
        <Grid item xs={12}>
          <ConsultaDocente />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Consultas;