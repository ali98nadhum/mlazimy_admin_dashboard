import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckIcon from '@mui/icons-material/Check';
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";
import {useStore} from "../../../store.js";
import { TextField, Button, Typography, Box, Card, CardContent, Grid , CircularProgress, Avatar, } from '@mui/material';

const CreateNewTraining = () => {
    const navigate = useNavigate();
    
    const [isLoading, setIsLoading] = useState(false);

    const {createWork} = useStore((state) => ({
        createWork: state.createWork
    }));


    const formik = useFormik({
        initialValues:{
            title: '',
            description: '',
            link: '',
            image: null
        },
        validationSchema:Yup.object({
            title: Yup.string()
            .required('اسم التدريب مطلوب')
            .min(10 , 'يجب ان يكون عنوان التدريب 10 احرف على الاقل')
            .max(100 , 'يجب ان لا يتجاوز عنوان التدريب 100 حرف'),
            description: Yup.string()
            .required('وصف التدريب مطلوب')
            .min(25 , 'يجب ان يكون وصف التدريب 25 حرف على الاقل')
            .max(750 , 'يجب ان لا يتجاوز وصف التدريب 750 حرف'),
            link: Yup.string()
            .required('رابط التدريب مطلوب')
            .url("الرجاء ادخال رابط صالح"),
            image: Yup.mixed()
            .required("الصوره مطلوبه")
        }),
        onSubmit: async (values, { setSubmitting}) => {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("title" , values.title);
            formData.append("description" , values.description);
            formData.append("link" , values.link);
            formData.append("image" , values.image);

            try {
                await createWork(formData);
                toast.success("تم اضافه التدريب بنجاح");
                navigate('/training');
            } catch (error) {
                if (error.response) {
                    toast.error(error.response.data.message);
                  } else {
                    toast.error('حدث خطا غير متوقع اثناء اضافه التدريب');
                  }
            } finally{
                setIsLoading(false);
                setSubmitting(false);
            }
        }
    })



    return (
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ maxWidth: { md: '600px', xs: '300px' }, ml: { xs: 8, md: "auto" } ,mt: 3, mx: 'auto', p: 2, border: '1px solid #ddd', borderRadius: '8px' }}
        >
          <Typography gutterBottom sx={{fontFamily: 'Almarai' , fontSize:30 , textAlign:'center'}}>
            إضافة تدريب جديد
          </Typography>
          <Grid container spacing={2}>
            {/* ===== title field ===== */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="title"
                name="title"
                label="عنوان التدريب"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                margin="normal"
              />
            </Grid>
            {/* ===== description field ===== */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="وصف التدريب"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                margin="normal"
                multiline
                rows={8}
              />
            </Grid>
            {/* ===== link field ===== */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="link"
                name="link"
                label="رابط التدريب"
                value={formik.values.link}
                onChange={formik.handleChange}
                error={formik.touched.link && Boolean(formik.errors.link)}
                helperText={formik.touched.link && formik.errors.link}
                margin="normal"
              />
            </Grid>
            {/* ===== image field ===== */}
            <Grid item xs={12}>
              <input
                id="image"
                name="image"
                type="file"
                onChange={(event) => {
                formik.setFieldValue('image', event.currentTarget.files[0]);
                }}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <label htmlFor="image" >
                <Button sx={{fontFamily:'Almarai'}} variant="contained" color="primary" component="span" startIcon={<CloudUploadIcon/> }>
                 اضافه صوره
                </Button>
                {formik.values.image && (
                    <Avatar
                     src={URL.createObjectURL(formik.values.image)}
                     alt="صورة المحاضرة"
                     sx={{ width: 56, height: 56 , mt:2 }}
                    />
                )}
              </label>
              {formik.touched.image && formik.errors.image && (
                <Typography color="error" sx={{fontFamily:'Almarai' , mt:1 , fontWeight:"bold"}}>
                  {formik.errors.image}
                </Typography>
              )}
            </Grid>
            {/* ===== btn submit ===== */}
            <Grid item xs={12}>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                disabled={isLoading || formik.isSubmitting}
                sx={{ mt: 2 , fontFamily: 'Almarai' }}
                startIcon={ <CheckIcon/> }
              >
                {isLoading ? <CircularProgress size={24} /> : 'إضافة التدريب'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      );
}

export default CreateNewTraining
