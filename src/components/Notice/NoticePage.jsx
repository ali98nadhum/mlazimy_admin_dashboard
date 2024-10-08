import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useStore } from "../../store";
import LoadingPage from "../LoadingPage/LoadingPage";
import FilterNotice from "../FilterNotice/FilterNotice";


const theme = createTheme({
  direction: "rtl",
});

const NoticePage = () => {
  const { notUserData, fetchUsersNotice, isLoading , SelectedClass } = useStore((state) => ({
    notUserData: state.notUserData,
    fetchUsersNotice: state.fetchUsersNotice,
    isLoading: state.isLoading,
    SelectedClass:state.SelectedClass
  }));

  useEffect(() => {
    fetchUsersNotice();
  }, [fetchUsersNotice , SelectedClass]);

  return (
    <div className="table-box">
      <FilterNotice/>
      <div className="table-row table-head">
        <div className="table-cell first-cell">
          <p>اسم الطالب</p>
        </div>
        <div className="table-cell">
          <p>اميل الطالب</p>
        </div>
        <div className="table-cell last-cell">
          <p>الشعبه</p>
        </div>
        <div className="table-cell last-cell">
          <p>تفعيل الاميل</p>
        </div>
        <div className="table-cell last-cell">
          <p>حذف الحساب</p>
        </div>
      </div>
      {isLoading ? (
        <LoadingPage />
      ) : (
        notUserData.map((notice) => (
          <div className="table-row" key={notice._id}>
            <div className="table-cell first-cell">
              <p> {notice.name} </p>
            </div>
            <div className="table-cell first-cell">
              <p> {notice.email} </p>
            </div>
            <div className="table-cell first-cell">
              <p> {notice.class} </p>
            </div>
            <div className="table-cell first-cell">
              <p> {notice.passwordRestVerified ? "تم التفعيل" : "غير مفعل"} </p>
            </div>
            <div className="table-cell first-cell">
              <Link
                to={`/delete-user-noyice/${notice._id}`}
                className="delete-btn"
              >
                <DeleteIcon />
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NoticePage;
