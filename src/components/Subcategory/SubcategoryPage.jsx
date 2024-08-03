import React, { useEffect } from 'react'
import "./subcategory.css";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {useStore} from "../../store";


  const formatDateString = (dateString) => {
    const date = new Date(dateString);
  
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
  
    // @ts-ignore
    const formattedDate = date.toLocaleDateString("ar-EG", options);
  
    return formattedDate;
  };
  

const SubcategoryPage = () => {

const {subcategoryData , fetchSubcategory} = useStore((state) => ({
  subcategoryData: state.subcategoryData,
  fetchSubcategory: state.fetchSubcategory
}))


useEffect(() => {
  fetchSubcategory();
} , [fetchSubcategory])


    return (
      <div className="table-box">
      <div className="table-row table-head">
        <div className="table-cell first-cell">
         <p>اسم المحاضره</p>
        </div>
        <div className="table-cell">
         <p> تاريخ اضافه المحاضره</p>
        </div>
        <div className="table-cell last-cell">
          <p>الاجرائات</p>
        </div>
      </div>

      {subcategoryData.map((subcategory) => (
        <div className="table-row" key={subcategory._id}>
          <div className="table-cell first-cell">
            <p> {subcategory.title} </p>
          </div>
          <div className="table-cell">
            <p> {formatDateString(subcategory.createdAt)} </p>
          </div>
          <div className="table-cell last-cell">
            <Link to={`/update-subcategory/${subcategory._id}`} className="update-btn">
              <EditIcon />
            </Link>
            <Link
              to={`/delete-subcategory/${subcategory._id}`}
              className="delete-btn"
            >
              <DeleteIcon />
            </Link>
          </div>
        </div>
      ))}
    </div>
      );
}

export default SubcategoryPage

