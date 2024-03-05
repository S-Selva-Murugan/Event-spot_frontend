import axios from "../../components/Api_Resources/axios";
import { config, fileConfig } from "../../components/Api_Resources/config";

export const addCategory = (categoryData) => ({
  type: "ADD_CATEGORY",
  payload: categoryData,
});

export const getCategory = (list) => ({
  type: "GET_CATEGORY",
  payload: list,
});

export const removeCategory = (id) => ({
  type: 'REMOVE_CATEGORY',
  payload: id,
});

export const editCategory = (data) => ({
  type: 'EDIT_CATEGORY',
  payload: data,
});

export const addCategoryAsync = (category) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/api/category", category,fileConfig)
      dispatch(addCategory(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const startGetCategory = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/categoryall', config);
      dispatch(getCategory(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const startRemoveCategory = (id) => {
  return async (dispatch) => {
    if (!id) {
      console.error("Missing category ID for deletion");
      return;
    }

    try {
      const response = await axios.delete(`/api/category/${id}`, config);
    console.log(response.data)
      dispatch(removeCategory(id));
    } catch (e) {
      console.log(e);
    }
  };
};

export const startEditCategory = (id, formData) => {
  return async (dispatch) => {
    if (!id) {
      console.error('Missing category ID to edit');
      return;
    }
    try {
      const response = await axios.put(`/api/category/${id}`, formData,fileConfig)
      dispatch(editCategory(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const startCategoryCarousel = () => {
  return async (dispatch) => {

    try {
      const response = await axios.get(`/api/category`)
      dispatch(
        setcategoryCarousel(response.data)
      );
    } catch (e) {
      console.log(e);
    }
  } 
}

export const startCategoryCategryId = (categoryId) => {
  return async (dispatch) => {

    try {
      const response = await axios.get(`/api/category/${categoryId}`)
      dispatch(
        setcategoryCarousel(response.data)
      );
    } catch (e) {
      console.log(e);
    }
  } 
}



const setcategoryCarousel=(data)=>{
  return({
    type:"GET_CATEGORY_CAROUSEL",
    payload:data
  })
}

