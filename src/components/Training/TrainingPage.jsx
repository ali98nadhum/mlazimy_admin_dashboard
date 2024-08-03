import React, { useEffect } from 'react'
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

const TrainingPage = () => {

  const {workData , fetchWork} = useStore((state) => ({
    workData: state.workData,
    fetchWork: state.fetchWork
  }))

  useEffect(() => {
    fetchWork();
  } , [fetchWork])


    return (
      <div className="table-box">
      <div className="table-row table-head">
        <div className="table-cell first-cell">
          <p>عنوان التدريب</p>
        </div>
        <div className="table-cell">
          <p>تاريخ اضافه التدريب</p>
        </div>
        <div className="table-cell last-cell">
          <p>الاجرائات</p>
        </div>
      </div>

      {workData.map((work) => (
        <div className="table-row" key={work._id}>
          <div className="table-cell first-cell">
            <p> {work.title} </p>
          </div>
          <div className="table-cell">
            <p> {formatDateString(work.createdAt)} </p>
          </div>
          <div className="table-cell last-cell">
            <Link to={`/update-training/${work._id}`} className="update-btn">
              <EditIcon />
            </Link>
            <Link
              to={`/delete-training/${work._id}`}
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

export default TrainingPage

