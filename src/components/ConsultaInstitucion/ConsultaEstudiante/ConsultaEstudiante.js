import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';

const ConsultaEstudiante = () => {
  const [estudiante, setEstudiante] = useState('');
  const [resultado, setResultado] = useState(null);

  const handleConsulta = async () => {
    const q = query(collection(db, 'vinculaciones'), where('estudiante', '==', estudiante));
    const querySnapshot = await getDocs(q);
    
    let horasTotales = 0;
    let vinculacionesCompletadas = 0;
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      horasTotales += data.horasTotales;
      if (data.culminacion) vinculacionesCompletadas++;
    });

    setResultado({ horasTotales, vinculacionesCompletadas });
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6">Consulta por Estudiante</Typography>
      <TextField 
        label="Nombre del Estudiante" 
        value={estudiante} 
        onChange={(e) => setEstudiante(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleConsulta}>
        Consultar
      </Button>
      {resultado && (
        <div style={{ marginTop: 16 }}>
          <Typography>Horas totales: {resultado.horasTotales}</Typography>
          <Typography>Vinculaciones completadas: {resultado.vinculacionesCompletadas}</Typography>
          <Typography>
            Estado: {resultado.horasTotales >= 240 ? 'Completado' : 'En progreso'}
          </Typography>
        </div>
      )}
    </Paper>
  );
};

export default ConsultaEstudiante;