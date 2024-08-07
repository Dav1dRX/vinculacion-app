import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';

const StudentSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(2, 'Muy corto')
    .max(50, 'Muy largo')
    .required('Requerido'),
  apellido: Yup.string()
    .min(2, 'Muy corto')
    .max(50, 'Muy largo')
    .required('Requerido'),
  direccion: Yup.string()
    .min(5, 'Muy corta')
    .max(100, 'Muy larga')
    .required('Requerido'),
  fechaNacimiento: Yup.date()
    .max(new Date(), 'La fecha no puede ser futura')
    .required('Requerido'),
  curso: Yup.string()
    .required('Requerido'),
  paralelo: Yup.string()
    .required('Requerido'),
});

const StudentForm = () => {
  const handleSubmit = async (values, { setSubmitting, resetForm, setFieldError }) => {
    try {
      const studentQuery = query(collection(db, 'estudiantes'), 
        where('nombre', '==', values.nombre),
        where('apellido', '==', values.apellido)
      );
      const studentSnapshot = await getDocs(studentQuery);
      
      if (!studentSnapshot.empty) {
        setFieldError('nombre', 'Este estudiante ya existe');
        setFieldError('apellido', 'Este estudiante ya existe');
        setSubmitting(false);
        return;
      }

      await addDoc(collection(db, 'estudiantes'), values);
      alert('Estudiante guardado con éxito');
      resetForm();
    } catch (error) {
      console.error('Error al guardar estudiante:', error);
      alert('Error al guardar estudiante');
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        nombre: '',
        apellido: '',
        direccion: '',
        fechaNacimiento: '',
        curso: '',
        paralelo: '',
      }}
      validationSchema={StudentSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" component="h2">
                Ingresar Nuevo Estudiante
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                fullWidth
                name="nombre"
                label="Nombre"
                error={touched.nombre && !!errors.nombre}
                helperText={touched.nombre && errors.nombre}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                fullWidth
                name="apellido"
                label="Apellido"
                error={touched.apellido && !!errors.apellido}
                helperText={touched.apellido && errors.apellido}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                fullWidth
                name="direccion"
                label="Dirección"
                error={touched.direccion && !!errors.direccion}
                helperText={touched.direccion && errors.direccion}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                fullWidth
                type="date"
                name="fechaNacimiento"
                label="Fecha de Nacimiento"
                InputLabelProps={{ shrink: true }}
                error={touched.fechaNacimiento && !!errors.fechaNacimiento}
                helperText={touched.fechaNacimiento && errors.fechaNacimiento}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Field
                as={TextField}
                fullWidth
                name="curso"
                label="Curso"
                error={touched.curso && !!errors.curso}
                helperText={touched.curso && errors.curso}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Field
                as={TextField}
                fullWidth
                name="paralelo"
                label="Paralelo"
                error={touched.paralelo && !!errors.paralelo}
                helperText={touched.paralelo && errors.paralelo}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                Guardar Estudiante
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default StudentForm;
