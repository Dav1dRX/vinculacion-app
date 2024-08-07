import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, List, ListItem } from '@mui/material';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';

const ConsultaDocente = () => {
  const [docente, setDocente] = useState('');
  const [resultado, setResultado] = useState(null);

  const handleConsulta = async () => {
    const q = query(collection(db, 'vinculaciones'), where('profesorCoordinador', '==', docente));
    const querySnapshot = await getDocs(q);
    
    const estudiantes = new Set();
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (!data.culminacion) estudiantes.add(data.estudiante);
    });

    setResultado({ 
      enProceso: estudiantes.size,
      estudiantes: Array.from(estudiantes)
    });
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6">Consulta por Docente Coordinador</Typography>
      <TextField 
        label="Nombre del Docente" 
        value={docente} 
        onChange={(e) => setDocente(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleConsulta}>
        Consultar
      </Button>
      {resultado && (
        <div style={{ marginTop: 16 }}>
          <Typography>Estudiantes en proceso: {resultado.enProceso}</Typography>
          <List>
            {resultado.estudiantes.map((estudiante, index) => (
              <ListItem key={index}>{estudiante}</ListItem>
            ))}
          </List>
        </div>
      )}
    </Paper>
  );
};

export default ConsultaDocente;