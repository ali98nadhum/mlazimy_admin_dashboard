import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Grid,
  Container,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useStore } from "../../../store";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CheckIcon from "@mui/icons-material/Check";

const UpdateSubcategoryForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const { selectedSubcategory, fetchSubcategoryById, updateSubcategory , categoryData , fetchCategory } =
    useStore((state) => ({
      selectedSubcategory: state.selectedSubcategory,
      fetchSubcategoryById: state.fetchSubcategoryById,
      updateSubcategory: state.updateSubcategory,
      categoryData: state.categoryData,
      fetchCategory: state.fetchCategory
    }));

  useEffect(() => {
    if (id) {
      fetchSubcategoryById(id);
    }
    fetchCategory();
  }, [id, fetchSubcategoryById, fetchCategory]);


  const formik = useFormik({
    enableReinitialize: true,
    initialValues:{
        title: selectedSubcategory && selectedSubcategory.data ? selectedSubcategory.data.title : "",
        description: selectedSubcategory && selectedSubcategory.data ? selectedSubcategory.data.description : "",
        category: selectedSubcategory && selectedSubcategory.data ? selectedSubcategory.data.category : "",
        image: ""
    },

    validationSchema: Yup.object({
        title: Yup.string()
        .min(5 , 'يجب ان يتكون عنوان المحاضره من 5 احرف على الاقل')
        .max(200 , 'يجب ان لا يتجاوز عنوان المحاضره 200 حرف'),
        category: Yup.string(),
        description: Yup.string()
        .min(10 , 'يجب ان يكون وصف المحاضره 10 احرف على الاقل')
        .max(200 , 'يجب ان لا يتجاوز وصف المحاضره 200 حرف'),
        image: Yup.mixed()
    }),

    onSubmit: async (values, { setSubmitting }) => {
        setIsLoading(true);
        const formData = new FormData();
        if(values.title){
            formData.append("title" , values.title)
        }
        if(values.category){
            formData.append("category" , values.category)
        }
        if(values.description){
            formData.append("description" , values.description)
        }
        if(values.image !== ""){
            formData.append("image" , values.image)
        }

        try {
            await updateSubcategory(id , formData);
            toast.success("تم تحديث معلومات المحاضره بنجاح");
            navigate('/subcategory')
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
              } else {
                toast.error('حدث خطأ أثناء تحديث المحاضره');
              }
        }finally{
            setIsLoading(false);
            setSubmitting(false);
        }
    }
  })




  return (
    <Container maxWidth="sm">
      <Box mt={4} sx={{ ml: { md: 0, xs: 5 } }}>
        <Typography
          align="center"
          gutterBottom
          sx={{ fontSize: 30, fontFamily: "Almarai" }}
        >
          تعديل معلومات المحاضره
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            {/* ===== title field ===== */}
            <Grid item xs={12}>
              <TextField
                id="title"
                name="title"
                label="اسم المحاضره"
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
                label="وصف المحاضره"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
                margin="normal"
                multiline
                rows={8}
              />
            </Grid>
            {/* ===== category field ===== */}
            <Grid item xs={12}>
              <FormControl
                fullWidth
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
              >
                <InputLabel id="category-label"> اختيار الماده </InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                >
                  {categoryData.length > 0 ? (
                    categoryData.map((category) => (
                      <MenuItem key={category._id} value={category._id}>
                        {category.title}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value=""> لا توجد مواد متوفره </MenuItem>
                  )}
                </Select>
                {formik.touched.category && formik.errors.category && (
                  <Typography color="error">
                    {formik.errors.category}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            {/* ===== show old image sec ===== */}
            {selectedSubcategory &&
              selectedSubcategory.data &&
              selectedSubcategory.data.image && (
                <Grid item xs={12}>
                  <Box
                    mt={2}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 22,
                        fontFamily: "Almarai",
                        textAlign: "center",
                      }}
                    >
                      : الصوره القديمه
                    </Typography>
                    <img
                      src={selectedSubcategory.data.image.url}
                      alt="Old Category Image"
                      style={{ width: 150, height: 150, marginTop: 10 }}
                    />
                  </Box>
                </Grid>
              )}
            {/* ===== new image field ===== */}
            <Grid item xs={12}>
              <Box mt={2}>
                <Typography
                  sx={{
                    fontSize: 22,
                    fontFamily: "Almarai",
                    textAlign: "center",
                    mb: 2,
                  }}
                >
                  : اضافه صوره جديده
                </Typography>
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<AddPhotoAlternateIcon />}
                  fullWidth
                  sx={{ fontFamily: "Almarai" }}
                >
                  اختيار صوره جديده
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(event) => {
                      formik.setFieldValue(
                        "image",
                        event.currentTarget.files[0]
                      );
                    }}
                  />
                </Button>
                {formik.values.image && (
                  <Avatar
                    src={URL.createObjectURL(formik.values.image)}
                    alt="صورة المحاضرة"
                    sx={{ width: 66, height: 66, margin: "auto", mt: 3 }}
                  />
                )}
              </Box>
            </Grid>
            {/* ===== btn submit ===== */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={
                  isLoading ? <CircularProgress size="1rem" /> : <CheckIcon />
                }
                disabled={isLoading}
                fullWidth
                style={{ marginTop: 20 }}
                sx={{ fontFamily: "Almarai" }}
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

export default UpdateSubcategoryForm;
