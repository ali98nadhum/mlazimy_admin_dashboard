import React, { useState } from 'react';
import { Link , useParams , useNavigate} from 'react-router-dom';
import {useStore} from "../../../store";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress, Alert , Snackbar } from '@mui/material';

const DeleteUserNotice = () => {

  const [isLoading, setIsLoading] = useState(false); 
  const [showConfirmation, setShowConfirmation] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const {id} = useParams();
  const navigate = useNavigate();
  const {deleteUserNotice} = useStore((state) => ({
    deleteUserNotice: state.deleteUserNotice
  })) 


  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteUserNotice(id);
      setShowSuccessMessage(true);
      setTimeout(() => {
        navigate('/notice');
      }, 2000);
    } catch (error) {
      console.error('Error during delete:', error);
    } finally {
      setIsLoading(false);
      setShowConfirmation(false);
    }
  };

  
  return (
    <div>
      <Dialog open={showConfirmation}>
        <DialogTitle sx={{fontFamily:'Almarai'}}>هل تريد حذف المشترك ؟</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{fontFamily:'Almarai'}}>
            هل أنت متأكد أنك تريد حذف هذه المشترك؟ لا يمكن التراجع عن هذا الإجراء.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/notice" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" color="primary" sx={{fontFamily:'Almarai'}}>تراجع</Button>
          </Link>
          <Button onClick={handleDelete} variant="contained" disabled={isLoading} sx={{backgroundColor:'red' , fontFamily:'Almarai'}}>
            {isLoading ? <CircularProgress size={24} /> : 'نعم'}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' , fontFamily:'Almarai', fontSize:18 }}>
          تم حذف المشترك  بنجاح.
        </Alert>
      </Snackbar>
    </div>
  )
}

export default DeleteUserNotice
