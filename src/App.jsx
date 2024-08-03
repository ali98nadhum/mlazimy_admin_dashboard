
import "./App.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {useStore} from "./store";
import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import components
import TopBar from "./utils/TopBar/Topbar";
import Sidebar from "./utils/Sidebar/Sidebar";
import Home from "./components/Home/Home";
import CategoryPage from "./components/Category/CategoryPage";
import SubcategoryPage from "./components/Subcategory/SubcategoryPage";
import TrainingPage from "./components/Training/TrainingPage";
import NoticePage from "./components/Notice/NoticePage";
import LoginPage from "./components/LoginPage/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import DeleteCategoryForm from "./components/CategoryForm/DeleteCategory/DeleteCategoryForm";
import DeleteSubcategoryForm from "./components/SubcategoryForm/DeleteForm/DeleteSubcategoryForm";
import DeleteTrainingForm from "./components/TrainingForm/DeleteForm/DeleteTrainingForm";
import DeleteUserNotice from "./components/NoticeForm/DeleteForm/DeleteUserNotice";
import CreateCategoryForm from "./components/CategoryForm/CreateCategoryForm/CreateCategoryForm";
import CreateNewTraining from "./components/TrainingForm/CreateForm/CreateNewTraining";
import CreateSubcategoryForm from "./components/SubcategoryForm/CreateForm/CreateSubcategoryForm";
import UpdateCategoryForm from "./components/CategoryForm/UpdateForm/UpdateCategoryForm";
import UpdateTrainingForm from "./components/TrainingForm/UpdateForm/UpdateTrainingForm";
import UpdateSubcategoryForm from "./components/SubcategoryForm/UpdateForm/UpdateSubcategoryForm";








const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

function App() {
  const [open, setOpen] = useState(false);

  // from useStore
  const { isLoggedIn} = useStore((state) => ({
    isLoggedIn: state.isLoggedIn,
  }))


  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box component="main" sx={{ flexGrow: 1, p: 3 , zIndex:999 }}>
        <DrawerHeader />
        <Router>
        {isLoggedIn && (
            <>
              <TopBar open={open} handleDrawerOpen={handleDrawerOpen} />
              <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
            </>
          )}
           
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
            <Route path="/subcategory" element={<ProtectedRoute> <SubcategoryPage /> </ProtectedRoute>} />
            <Route path="/training" element={<ProtectedRoute> <TrainingPage /> </ProtectedRoute>} />
            <Route path="/notice" element={<ProtectedRoute> <NoticePage /> </ProtectedRoute>} />
            <Route path="/category" element={<ProtectedRoute> <CategoryPage /> </ProtectedRoute>} />
            <Route path="/delete-category/:id" element={ <ProtectedRoute> <DeleteCategoryForm/> </ProtectedRoute> } />
            <Route path="/delete-subcategory/:id" element={ <ProtectedRoute> <DeleteSubcategoryForm/> </ProtectedRoute> }/>
            <Route path="/delete-training/:id" element={ <ProtectedRoute> <DeleteTrainingForm/> </ProtectedRoute> }/>
            <Route path="/delete-user-noyice/:id" element={ <ProtectedRoute> <DeleteUserNotice/> </ProtectedRoute> }/>
            <Route path="/create-new-category" element={ <ProtectedRoute> <CreateCategoryForm/> </ProtectedRoute> }/>
            <Route path="/create-new-training" element={ <ProtectedRoute> <CreateNewTraining/> </ProtectedRoute> }/>
            <Route path="/create-new-subcategory" element={ <ProtectedRoute> <CreateSubcategoryForm/> </ProtectedRoute> }/>
            <Route path="/update-category/:id" element={ <ProtectedRoute> <UpdateCategoryForm/> </ProtectedRoute> }/>
            <Route path="/update-training/:id" element={ <ProtectedRoute> <UpdateTrainingForm/> </ProtectedRoute> } />
            <Route path="/update-subcategory/:id" element={ <ProtectedRoute> <UpdateSubcategoryForm/> </ProtectedRoute> }/>
          </Routes>
        </Router>
        <ToastContainer />
      </Box>
    </Box>
  );
}

export default App;
