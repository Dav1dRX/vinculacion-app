// src/components/LinkageForm/LinkageForm.js
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Grid, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';

const LinkageSchema = Yup.object().shape({
  estudiante: Yup.string()
    .required('Requerido'),
  fechaInicio: Yup.date()
    .required('Requerido'),
  fechaFin: Yup.date()
    .min(
      Yup.ref('fechaInicio'),
      'La fecha de fin debe ser posterior a la fecha de inicio'
    )
    .required('Requerido'),
  institucion: Yup.string()
    .required('Requerido'),
  profesorCoordinador: Yup.string()
    .required('Requerido'),
  horasTotales: Yup.number()
    .positive('Debe ser un número positivo')
    .max(240, 'No puede exceder 240 horas')
    .required('Requerido'),
  culminacion: Yup.boolean(),
});

const LinkageForm = () => {
  const handleSubmit = async (values, { setSubmitting, resetForm, setFieldError }) => {
    try {
      const studentQuery = query(collection(db, 'estudiantes'), 
        where('nombre', '==', values.estudiante.split(' ')[0]),
        where('apellido', '==', values.estudiante.split(' ')[1])
      );
      const studentSnapshot = await getDocs(studentQuery);
      
      if (studentSnapshot.empty) {
        setFieldError('estudiante', 'Este estudiante no existe en el sistema');
        setSubmitting(false);
        return;
      }

      await addDoc(collection(db, 'vinculaciones'), values);
      alert('Vinculación guardada con éxito');
      resetForm();
    } catch (error) {
      console.error('Error al guardar vinculación:', error);
      alert('Error al guardar vinculación');
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        estudiante: '',
        fechaInicio: '',
        fechaFin: '',
        institucion: '',
        profesorCoordinador: '',
        horasTotales: '',
        culminacion: false,
      }}
      validationSchema={LinkageSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" component="h2">
                Ingresar Nueva Vinculación
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                fullWidth
                name="estudiante"
                label="Estudiante"
                error={touched.estudiante && !!errors.estudiante}
                helperText={touched.estudiante && errors.estudiante}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                fullWidth
                type="date"
                name="fechaInicio"
                label="Fecha de Inicio"
                InputLabelProps={{ shrink: true }}
                error={touched.fechaInicio && !!errors.fechaInicio}
                helperText={touched.fechaInicio && errors.fechaInicio}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                fullWidth
                type="date"
                name="fechaFin"
                label="Fecha de Fin"
                InputLabelProps={{ shrink: true }}
                error={touched.fechaFin && !!errors.fechaFin}
                helperText={touched.fechaFin && errors.fechaFin}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                fullWidth
                name="institucion"
                label="Institución"
                error={touched.institucion && !!errors.institucion}
                helperText={touched.institucion && errors.institucion}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                fullWidth
                name="profesorCoordinador"
                label="Profesor Coordinador"
                error={touched.profesorCoordinador && !!errors.profesorCoordinador}
                helperText={touched.profesorCoordinador && errors.profesorCoordinador}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                fullWidth
                type="number"
                name="horasTotales"
                label="Horas Totales"
                error={touched.horasTotales && !!errors.horasTotales}
                helperText={touched.horasTotales && errors.horasTotales}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Field as={Checkbox} name="culminacion" color="primary" />
                }
                label="Culminación de vinculación"
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                Guardar Vinculación
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default LinkageForm;
