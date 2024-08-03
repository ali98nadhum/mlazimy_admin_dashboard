import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Box, CircularProgress, Grid, Container, Avatar } from '@mui/material';
import { useStore } from '../../../store';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CheckIcon from '@mui/icons-material/Check';

const UpdateCategoryForm = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const { selectedCategory, fetchCategoryById, updateCategory } = useStore((state) => ({
    selectedCategory: state.selectedCategory,
    fetchCategoryById: state.fetchCategoryById,
    updateCategory: state.updateCategory,
  }));

  useEffect(() => {
    if (id) {
      fetchCategoryById(id);
    }
  }, [id, fetchCategoryById]);


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: selectedCategory && selectedCategory.data ? selectedCategory.data.title : "",
      image: ''
    },

    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, "العنوان يجب أن يتكون من 3 أحرف على الأقل")
        .max(50, "العنوان لا يمكن أن يزيد عن 50 حرف"),
      image: Yup.mixed(),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      setIsLoading(true);
      const formData = new FormData();
      if (values.title) {
        formData.append("title", values.title)
      }
      if (values.image !== '') {
        formData.append("image", values.image)
      }

      try {
        await updateCategory(id, formData);
        toast.success('تم تحديث المادة بنجاح');
        navigate('/category');
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error('حدث خطأ أثناء تحديث المادة');
        }
      } finally {
        setIsLoading(false);
        setSubmitting(false);
      }
    }
  });

  return (
    <Container maxWidth="sm">
      <Box mt={4}  sx={{ml: {md:0, xs: 5 }}}>
        <Typography align="center" gutterBottom sx={{fontSize: 30 , fontFamily:'Almarai'}}>
          تعديل المادة
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            {/* ===== title field ===== */}
            <Grid item xs={12}>
              <TextField
                id="title"
                name="title"
                label="اسم الماده"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                fullWidth
                variant="outlined"
              />
            </Grid>
            {/* ===== show old image sec ===== */}
            {selectedCategory && selectedCategory.data && selectedCategory.data.image && (
              <Grid item xs={12}>
                <Box mt={2} sx={{display:"flex" , flexDirection:"column" , alignItems:'center'}} >
                  <Typography sx={{fontSize:22 , fontFamily:'Almarai' , textAlign:"center"}}>: الصوره القديمه</Typography>
                  <img src={selectedCategory.data.image.url} alt="Old Category Image" style={{width:150, height:150, marginTop: 10 }} />
                </Box>
              </Grid>
            )}
            {/* ===== new image field ===== */}
            <Grid item xs={12}>
              <Box mt={2}>
                <Typography sx={{fontSize:22 , fontFamily:'Almarai' , textAlign:"center" , mb:2}}>: اضافه صوره جديده</Typography>
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<AddPhotoAlternateIcon  />}
                  fullWidth
                  sx={{fontFamily:'Almarai'}}
                >
                 اختيار صوره جديده
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(event) => {
                      formik.setFieldValue("image", event.currentTarget.files[0]);
                    }}
                  />
                </Button>
                {formik.values.image && (
                    <Avatar
                      src={URL.createObjectURL(formik.values.image)}
                      alt="صورة المحاضرة"
                      sx={{ width: 66, height: 66 , margin:"auto" , mt:3 }}/>
                )}
              </Box>
            </Grid>
            {/* ===== btn submit ===== */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={isLoading ? <CircularProgress size="1rem" /> : <CheckIcon />}
                disabled={isLoading}
                fullWidth
                style={{ marginTop: 20 }}
                sx={{fontFamily:'Almarai'}}
              >
                {isLoading ? "جاري التحديث" : "تحديث"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default UpdateCategoryForm;
