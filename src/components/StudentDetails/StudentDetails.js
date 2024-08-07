import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Grid } from '@mui/material';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

const StudentDetails = ({ studentId, onClose }) => {
  const [student, setStudent] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      const docRef = doc(db, 'estudiantes', studentId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setStudent({ id: docSnap.id, ...docSnap.data() });
      }
    };
    fetchStudent();
  }, [studentId]);

  const handleEdit = async () => {
    if (editing) {
      try {
        const docRef = doc(db, 'estudiantes', studentId);
        await updateDoc(docRef, student);
        alert('Estudiante actualizado con éxito');
        setEditing(false);
      } catch (error) {
        console.error('Error al actualizar estudiante:', error);
        alert('Error al actualizar estudiante');
      }
    } else {
      setEditing(true);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este estudiante?')) {
      try {
        await deleteDoc(doc(db, 'estudiantes', studentId));
        alert('Estudiante eliminado con éxito');
        onClose();
      } catch (error) {
        console.error('Error al eliminar estudiante:', error);
        alert('Error al eliminar estudiante');
      }
    }
  };

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  if (!student) return <Typography>Cargando...</Typography>;

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6">Detalles del Estudiante</Typography>
      <Grid container spacing={2}>
        {Object.entries(student).map(([key, value]) => {
          if (key === 'id') return null;
          return (
            <Grid item xs={12} key={key}>
              <TextField
                fullWidth
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                name={key}
                value={value}
                onChange={handleChange}
                disabled={!editing}
              />
            </Grid>
          );
        })}
      </Grid>
      <Button onClick={handleEdit} style={{ marginTop: 16, marginRight: 8 }}>
        {editing ? 'Guardar' : 'Editar'}
      </Button>
      <Button onClick={handleDelete} color="secondary" style={{ marginTop: 16 }}>
        Eliminar
      </Button>
      <Button onClick={onClose} style={{ marginTop: 16, marginLeft: 8 }}>
        Cerrar
      </Button>
    </Paper>
  );
};

export default StudentDetails;