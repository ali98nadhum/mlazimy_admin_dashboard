import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./categoryPage.css";
import { useStore } from "../../store";
import { useEffect } from "react";
import LoadingPage from "../LoadingPage/LoadingPage";
import NoDataPage from "../noDataPage/NoDataPage";

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

const CategoryPage = () => {
  const { categoryData, fetchCategory, isLoading } = useStore((state) => ({
    categoryData: state.categoryData,
    fetchCategory: state.fetchCategory,
    isLoading: state.isLoading,
  }));

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  return (
    <div className="table-box">
      <div className="table-row table-head">
        <div className="table-cell first-cell">
          <p>اسم الماده</p>
        </div>
        <div className="table-cell">
          <p>تاريخ اضافه الماده</p>
        </div>
        <div className="table-cell last-cell">
          <p>الاجرائات</p>
        </div>
      </div>
      {isLoading ? (
        <LoadingPage />
      ) : categoryData.length > 0 ? (
        categoryData.map((category) => (
          <div className="table-row" key={category._id}>
            <div className="table-cell first-cell">
              <p> {category.title} </p>
            </div>
            <div className="table-cell">
              <p> {formatDateString(category.createdAt)} </p>
            </div>
            <div className="table-cell last-cell">
              <Link
                to={`/update-category/${category._id}`}
                className="update-btn"
              >
                <EditIcon />
              </Link>
              <Link
                to={`/delete-category/${category._id}`}
                className="delete-btn"
              >
                <DeleteIcon />
              </Link>
            </div>
          </div>
        ))
      ) : (
        <NoDataPage />
      )}
    </div>
  );
};

export default CategoryPage;
