import axios from "axios";
import { create } from "zustand";


export const useStore = create((set) => ({

  // ================================ Category functions ==============================

  // Get all category
  categoryData: [],
  fetchCategory: async () => {
    try {
      const response = await axios.get("https://mlazimy-api.vercel.app/category");
      set({ categoryData: response.data.data });
    } catch (error) {
      console.error("Error fetching data", error);
    }
  },


  // Get category by id
  selectedCategory: null,
  fetchCategoryById: async (id) => {
    try {
      const response = await axios.get(`https://mlazimy-api.vercel.app/category/${id}`);
      set({ selectedCategory: response.data });
    } catch (error) {
      console.error('Error fetching category by id', error);
    }
  },


  // Create Category
  createCategory: async (formData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://mlazimy-api.vercel.app/category', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log(response.data);
      set((state) => ({
        categoryData: [...state.categoryData, response.data],
      }));
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },



   // Update Category
   updateCategory: async (id, formData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`https://mlazimy-api.vercel.app/category/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      set((state) => ({
        categoryData: state.categoryData.map((category) =>
          category._id === id ? response.data : category
        ),
      }));
    } catch (error) {
      console.error('Error updating category:', error);
    }
  },


  // delete category
  deleteCategory: async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in localStorage.");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(
        `https://mlazimy-api.vercel.app/category/${id}`,
        config
      );
      console.log("Category deleted successfully:", response.data);
      set((state) => ({
        categoryData: state.categoryData.filter(
          (category) => category._id !== id
        ),
      }));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  },





  //   ======================================= Subcategory Functions ===============================

  // Get All Subcategory
  subcategoryData: [],
  fetchSubcategory: async () => {
    try {
      const response = await axios.get("https://mlazimy-api.vercel.app/subcategory");
      set({ subcategoryData: response.data.data });
    } catch (error) {
      console.error("Error fetching data", error);
    }
  },


  // Get category by id
  selectedSubcategory: null,
  fetchSubcategoryById: async (id) => {
    try {
      const response = await axios.get(`https://mlazimy-api.vercel.app/subcategory/${id}`);
      set({ selectedSubcategory: response.data });
    } catch (error) {
      console.error('Error fetching category by id', error);
    }
  },



  //   Create Subcategory
  createSubcategory: async (formData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://mlazimy-api.vercel.app/subcategory', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log(response.data);
      set((state) => ({
        categoryData: [...state.categoryData, response.data],
      }));
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },



  // Update Subcategory
  updateSubcategory: async (id, formData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`https://mlazimy-api.vercel.app/subcategory/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      set((state) => ({
        subcategoryData: state.subcategoryDataa.map((Subcategory) =>
          Subcategory._id === id ? response.data : Subcategory
        ),
      }));
    } catch (error) {
      console.error('Error updating category:', error);
    }
  },





//   Delete Subcategory
deleteSubcategory: async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in localStorage.");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(
        `https://mlazimy-api.vercel.app/subcategory/${id}`,
        config
      );
      console.log("Category deleted successfully:", response.data);
      set((state) => ({
        subcategoryData: state.subcategoryData.filter(
          (subcategory) => subcategory._id !== id
        ),
      }));
    } catch (error) {
      console.error("Error deleting Subcategory:", error);
    }
  },





  // ================================ Work Functions =================================

  // Get All Work
  workData: [],
  fetchWork: async () => {
    try {
      const response = await axios.get("https://mlazimy-api.vercel.app/work");
      set({ workData: response.data.data });
    } catch (error) {
      console.error("Error fetching data", error);
    }
  },


  // get work by id
  selectedWork: null,
  fetchWorkById: async (id) => {
    try {
      const response = await axios.get(`https://mlazimy-api.vercel.app/work/${id}`);
      set({ selectedWork: response.data });
    } catch (error) {
      console.error('Error fetching category by id', error);
    }
  },



  //   create work
createWork: async (formData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post('https://mlazimy-api.vercel.app/work', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log(response.data);
    set((state) => ({
      categoryData: [...state.categoryData, response.data],
    }));
  } catch (error) {
    console.error(error.message);
    throw error;
  }
},



  
   // Update work
   updateWork: async (id, formData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`https://mlazimy-api.vercel.app/work/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      set((state) => ({
        workData: state.workData.map((work) =>
          work._id === id ? response.data : work
        ),
      }));
    } catch (error) {
      console.error('Error updating work:', error);
    }
  },


//   Delete Work
  deleteWork: async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in localStorage.");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(
        `https://mlazimy-api.vercel.app/work/${id}`,
        config
      );
      console.log("work deleted successfully:", response.data);
      // Update state if necessary
      set((state) => ({
        workData: state.workData.filter(
          (work) => work._id !== id
        ),
      }));
    } catch (error) {
      console.error("Error deleting Subcategory:", error);
    }
  },






  // ======================================= Notice Functions =======================================
  // Get All Notice
  notUserData: [],
  fetchUsersNotice: async () => {
    try {
      const token = localStorage.getItem("token"); // افترض أن التوكن مخزن في localStorage
      const response = await axios.get("https://mlazimy-api.vercel.app/notice", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ notUserData: response.data.data });
    } catch (error) {
      console.error("Error fetching data", error);
    }
  },


  //   Delete user notice
  deleteUserNotice: async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in localStorage.");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(
        `https://mlazimy-api.vercel.app/notice/${id}`,
        config
      );
      console.log("work deleted successfully:", response.data);
      set((state) => ({
        notUserData: state.notUserData.filter(
          (user) => user_id !== id
        ),
      }));
    } catch (error) {
      console.error("Error deleting Subcategory:", error);
    }
  },


  // ============================== Auth Functions ============================================

  // handleLogin
  isLoggedIn: localStorage.getItem("token") !== null,
  errorMessage: null,
  login: async (email, password) => {
    try {
      const response = await axios.post(
        "https://mlazimy-api.vercel.app/auth/login",
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      set({ isLoggedIn: true, errorMessage: null });
    } catch (error) {
      console.error("Error logging in", error);
      set({
        errorMessage: error.response
          ? error.response.data.message
          : "Error logging in",
        isLoggedIn: false,
      });
    }
  },
  clearErrorMessage: () => set({ errorMessage: null }),

  //   handle logout
  logout: () => {
    localStorage.removeItem("token");
    set({ isLoggedIn: false });
  },
}));
