import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container, Typography, Box, Card, CardContent, Grid , CircularProgress, } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckIcon from '@mui/icons-material/Check';
import {useStore} from "../../../store";
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";


const CreateCategoryForm = () => {

    const navigate = useNavigate();
    
    const [isLoading, setIsLoading] = useState(false);

    const {createCategory} = useStore((state) => ({
        createCategory: state.createCategory
    }));
  
    const formik = useFormik({
      initialValues: {
        title: '',
        image: null,
      },
      validationSchema: Yup.object({
        title: Yup.string()
        .required('اسم المادة مطلوب')
        .min(3 , "يجب ان يكون اسم الماده 3 احرف على الاقل")
        .max(50 , "يجب ان لا يتجاوز اسم الماده 50 حرف"),
        image: Yup.mixed().required('الصورة مطلوبة'),
      }),
      onSubmit: async (values, { setSubmitting }) => {
        setIsLoading(true); 
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('image', values.image);
  
        try {
          await createCategory(formData);
          toast.success('تمت إضافة المادة بنجاح');
          navigate("/category")
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
              } else {
                toast.error('حدث خطأ أثناء إضافة المادة');
              }
        } finally {
          setIsLoading(false);
          setSubmitting(false);
        }
      },
    });
  
    return (
      <Container maxWidth="sm">
        <Card variant="outlined" sx={{ mt: 15 ,  ml: { xs: 5 }}}>
          <CardContent>
            <Typography gutterBottom align="center" sx={{ fontSize: 32, fontFamily: 'Almarai' }}>
              إضافة مادة جديدة
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                {/* ===== title field ===== */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="title"
                    name="title"
                    label="اسم المادة"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                    margin="normal"
                  />
                </Grid>
                {/* ===== image field ===== */}
                <Grid item xs={12}>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="image-upload"
                    type="file"
                    disabled={isLoading}
                    onChange={(event) => {
                      formik.setFieldValue('image', event.currentTarget.files[0]);
                    }}
                  />
                  <label htmlFor="image-upload">
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                      startIcon={<CloudUploadIcon />}
                      fullWidth
                      sx={{ fontFamily: 'Almarai' }}
                    >
                       {isLoading ? 'جاري التحميل...' : "اضافه صوره"}
                    </Button>
                  </label>
                  {formik.values.image && (
                    <Typography variant="body1" sx={{ mt: 2 }}>
                      {formik.values.image.name}
                    </Typography>
                  )}
                  {formik.touched.image && formik.errors.image ? (
                    <Typography color="error" sx={{ mt: 1 , fontFamily: 'Almarai' }}>
                      {formik.errors.image}
                    </Typography>
                  ) : null}
                </Grid>
                {/* ===== btn submit ===== */}
                <Grid item xs={12}>
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                    disabled={formik.isSubmitting}
                    sx={{ fontFamily: 'Almarai' }}
                    startIcon={ <CheckIcon/> }
                  >
                    {isLoading ? <CircularProgress size={24} /> : 'اضافه الماده'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Container>
    );
  };
  

export default CreateCategoryForm;
