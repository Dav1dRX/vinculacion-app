import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';

const ConsultaInstitucion = () => {
  const [institucion, setInstitucion] = useState('');
  const [resultado, setResultado] = useState(null);

  const handleConsulta = async () => {
    const q = query(collection(db, 'vinculaciones'), where('institucion', '==', institucion));
    const querySnapshot = await getDocs(q);
    
    const estudiantes = [];
    const estudiantesCompletados = new Set();
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      estudiantes.push(data.estudiante);
      if (data.culminacion) estudiantesCompletados.add(data.estudiante);
    });

    setResultado({ 
      total: new Set(estudiantes).size, 
      completados: estudiantesCompletados.size,
      enProceso: new Set(estudiantes).size - estudiantesCompletados.size
    });
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6">Consulta por Institución</Typography>
      <TextField 
        label="Nombre de la Institución" 
        value={institucion} 
        onChange={(e) => setInstitucion(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleConsulta}>
        Consultar
      </Button>
      {resultado && (
        <div style={{ marginTop: 16 }}>
          <Typography>Total de estudiantes: {resultado.total}</Typography>
          <Typography>Estudiantes que completaron: {resultado.completados}</Typography>
          <Typography>Estudiantes en proceso: {resultado.enProceso}</Typography>
        </div>
      )}
    </Paper>
  );
};

export default ConsultaInstitucion;