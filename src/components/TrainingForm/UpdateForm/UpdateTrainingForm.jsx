import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Box, CircularProgress, Grid, Container, Avatar } from '@mui/material';
import { useStore } from '../../../store';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CheckIcon from '@mui/icons-material/Check';

const UpdateTrainingForm = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const { selectedWork, fetchWorkById, updateWork} = useStore((state) => ({
    selectedWork: state.selectedWork,
    fetchWorkById: state.fetchWorkById,
    updateWork: state.updateWork,
  }));

  useEffect(() => {
    if(id){
        fetchWorkById(id);
    }
  } , [id , fetchWorkById])



  const formik = useFormik({
    enableReinitialize: true,
    initialValues:{
        title: selectedWork && selectedWork.data ? selectedWork.data.title : "",
        description: selectedWork && selectedWork.data ? selectedWork.data.description : "",
        link: selectedWork && selectedWork.data ? selectedWork.data.link : "",
        image: ""
    },

    validationSchema: Yup.object({
        title: Yup.string()
        .min(10 , 'يجب ان يكون عنوان التدريب 10 احرف على الاقل')
        .max(100 , "يجب ان لا يتجاوز عنوان التدريب 100 حرف"),
        description: Yup.string()
        .min(25 , 'يجب ان يكون وصف التدريب 25 حرف على الاقل')
        .max(750 , 'يجب ان لا يتجاوز وصف التدريب 750 حرف'),
        link: Yup.string()
        .url('الرجاء ادخال رابط صالح'),
        image: Yup.mixed()
    }),

    onSubmit: async (values, { setSubmitting }) => {
        setIsLoading(true);
        const formData = new FormData();
        if(values.title){
            formData.append("title" , values.title)
        }
        if(values.description){
            formData.append("description" , values.description)
        }
        if(values.link){
            formData.append("link" , values.link)
        }
        if(values.image !== ""){
            formData.append("image" , values.image)
        }

        try {
            await updateWork(id , formData);
            toast.success("تم تحديث معلومات التدريب بنجاح")
            navigate("/training")
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
              } else {
                toast.error('حدث خطأ أثناء تحديث المادة');
              }
        } finally{
            setIsLoading(false);
            setSubmitting(false);
        }
    }
  })

  return (
    <Container maxWidth="sm">
      <Box mt={4}  sx={{ml: {md:0, xs: 5 }}}>
        <Typography align="center" gutterBottom sx={{fontSize: 30 , fontFamily:'Almarai'}}>
          تعديل معلومات التدريب
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            {/* ===== title field ===== */}
            <Grid item xs={12}>
              <TextField
                id="title"
                name="title"
                label="عنوان التدريب"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                fullWidth
                variant="outlined"
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
            {/* ===== show old image sec ===== */}
            {selectedWork && selectedWork.data && selectedWork.data.image && (
              <Grid item xs={12}>
                <Box mt={2} sx={{display:"flex" , flexDirection:"column" , alignItems:'center'}} >
                  <Typography sx={{fontSize:22 , fontFamily:'Almarai' , textAlign:"center"}}>: الصوره القديمه</Typography>
                  <img src={selectedWork.data.image.url} alt="Old Category Image" style={{width:150, height:150, marginTop: 10 }} />
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
}

export default UpdateTrainingForm
