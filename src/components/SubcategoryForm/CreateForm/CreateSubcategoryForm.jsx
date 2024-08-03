import { 
    TextField, 
    Button,
    Container, 
    Typography, 
    Box, 
    Card, 
    CardContent, 
    Grid, 
    CircularProgress, 
    Select, 
    MenuItem, 
    FormControl, 
    InputLabel, 
    Avatar, 
    Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckIcon from '@mui/icons-material/Check';
import {useStore} from "../../../store";
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const CreateSubcategoryForm = () => {

    const navigate = useNavigate();
    
    const [isLoading, setIsLoading] = useState(false);

    const {createSubcategory , categoryData , fetchCategory} = useStore((state) => ({
        createSubcategory: state.createSubcategory,
        categoryData: state.categoryData,
        fetchCategory: state.fetchCategory
    }));


    useEffect(() => {
        fetchCategory();
    } , [fetchCategory])


    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            category: '',
            image: null,
            file: null
        },
        validationSchema: Yup.object({
            title: Yup.string()
            .required('اسم الماده مطلوب')
            .min(5 , 'يجب ان يتكون عنوان المحاضره من 5 احرف على الاقل')
            .max(200 , 'يجب ان لا يتجاوز عنوان المحاضره 200 حرف'),
            category: Yup.string()
            .required('اختيار الفئة مطلوب'),
            description: Yup.string()
            .required('وصف المحاضره مطلوب')
            .min(10 , 'يجب ان يكون وصف المحاضره 10 احرف على الاقل')
            .max(200 , 'يجب ان لا يتجاوز وصف المحاضره 200 حرف'),
            image: Yup.mixed()
            .required('يجب وضع صوره للمحاضره'),
            file: Yup.mixed()
            .required('يجب رفع ملف المحاضره')
        }),
        onSubmit: async (values , { setSubmitting}) => {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('title' , values.title);
            formData.append('description' , values.description);
            formData.append('category' , values.category);
            formData.append('image' , values.image);
            formData.append('file' , values.file);

            try {
                await createSubcategory(formData);
                toast.success('تم اضافه المحاضره بنجاح');
                navigate('/subcategory');
            } catch (error) {
                if (error.response) {
                    toast.error(error.response.data.message);
                  } else {
                    toast.error('حدث خطا غير متوقع اثناء اضافه المحاضره');
                  }
            } finally{
                setIsLoading(false);
                setSubmitting(false);
            }
        }
    })


    return (
        <Container maxWidth="sm" sx={{mt:10}}>
            <Card sx={{ml: { xs: 5 }}}>
                <CardContent>
                    <Typography variant="h5" component="h2" sx={{ mb: 2 , fontFamily:'Almarai' , textAlign:'center' }}>
                        إضافة محاضرة جديدة
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            {/* ===== title field ===== */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="title"
                                    name="title"
                                    label="عنوان المحاضرة"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    error={formik.touched.title && Boolean(formik.errors.title)}
                                    helperText={formik.touched.title && formik.errors.title}
                                />
                            </Grid>
                            {/* ===== description field ===== */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="description"
                                    name="description"
                                    label="وصف المحاضرة"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
                                />
                            </Grid>
                            {/* ===== category field ===== */}
                            <Grid item xs={12}>
                                <FormControl fullWidth error={formik.touched.category && Boolean(formik.errors.category)}>
                                    <InputLabel id="category-label">الفئة</InputLabel>
                                    <Select
                                        labelId="category-label"
                                        id="category"
                                        name="category"
                                        value={formik.values.category}
                                        onChange={formik.handleChange}
                                    >
                                        {categoryData.map((category) => (
                                            <MenuItem key={category._id} value={category._id}>
                                                {category.title}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {formik.touched.category && formik.errors.category && (
                                        <Typography color="error">{formik.errors.category}</Typography>
                                    )}
                                </FormControl>
                            </Grid>
                            {/* ===== image upload btn ===== */}
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', alignItems: 'center' , justifyContent:'center' }}>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        startIcon={<AddPhotoAlternateIcon />}
                                        sx={{ mr: 2  , fontFamily:'Almarai'}}
                                    >
                                        اضافه صوره
                                        <input
                                            type="file"
                                            hidden
                                            onChange={(event) => formik.setFieldValue('image', event.currentTarget.files[0])}
                                        />
                                    </Button>
                                    {formik.values.image && (
                                        <Avatar
                                            src={URL.createObjectURL(formik.values.image)}
                                            alt="صورة المحاضرة"
                                            sx={{ width: 56, height: 56 }}
                                        />
                                    )}
                                </Box>
                                {formik.touched.image && formik.errors.image && (
                                    <Typography color="error">{formik.errors.image}</Typography>
                                )}
                            </Grid>
                            {/* ===== file upload btn ===== */}
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', alignItems: 'center' , justifyContent:'center' }}>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        startIcon={<CloudUploadIcon />}
                                        sx={{ mr: 2 , fontFamily:'Almarai' }}
                                    >
                                       اضافه ملف
                                        <input
                                            type="file"
                                            hidden
                                            onChange={(event) => formik.setFieldValue('file', event.currentTarget.files[0])}
                                        />
                                    </Button>
                                    {formik.values.file && (
                                        <Paper sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
                                            <Typography variant="body2" sx={{ mr: 1 }}>
                                                {formik.values.file.name}
                                            </Typography>
                                        </Paper>
                                    )}
                                </Box>
                                {formik.touched.file && formik.errors.file && (
                                    <Typography color="error">{formik.errors.file}</Typography>
                                )}
                            </Grid>
                            {/* ===== submit btn ===== */}
                            <Grid item xs={12}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    fullWidth
                                    type="submit"
                                    sx={{fontFamily:'Almarai' , backgroundColor: '#1E88E5'}}
                                    disabled={isLoading}
                                    startIcon={isLoading ? <CircularProgress size="1rem" /> : <CheckIcon />}
                                >
                                    {isLoading ? 'جاري التحميل...' : 'إضافة المحاضرة'}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
}

export default CreateSubcategoryForm
