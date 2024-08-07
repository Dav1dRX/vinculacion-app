import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

const StudentSchema = Yup.object().shape({
  nombre: Yup.string().required('Requerido'),
  apellido: Yup.string().required('Requerido'),
  direccion: Yup.string().required('Requerido'),
  fechaNacimiento: Yup.date().required('Requerido'),
  curso: Yup.string().required('Requerido'),
  paralelo: Yup.string().required('Requerido'),
});

const IngresarEstudiante = () => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
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
                error={touched.nombre && errors.nombre}
                helperText={touched.nombre && errors.nombre}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                fullWidth
                name="apellido"
                label="Apellido"
                error={touched.apellido && errors.apellido}
                helperText={touched.apellido && errors.apellido}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                fullWidth
                name="direccion"
                label="Dirección"
                error={touched.direccion && errors.direccion}
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
                error={touched.fechaNacimiento && errors.fechaNacimiento}
                helperText={touched.fechaNacimiento && errors.fechaNacimiento}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Field
                as={TextField}
                fullWidth
                name="curso"
                label="Curso"
                error={touched.curso && errors.curso}
                helperText={touched.curso && errors.curso}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Field
                as={TextField}
                fullWidth
                name="paralelo"
                label="Paralelo"
                error={touched.paralelo && errors.paralelo}
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

export default IngresarEstudiante;