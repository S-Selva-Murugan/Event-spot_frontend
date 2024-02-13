import axios from "../../components/Api_Resources/axios";

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
      const response = await axios.post("/api/category", category, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      dispatch(addCategory(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const startGetCategory = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/categoryall', { headers: {
        Authorization: localStorage.getItem("token"),
      },});
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
      const response = await axios.delete(`/api/category/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
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
      const response = await axios.put(`/api/category${id}`, formData, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      dispatch(editCategory(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};
