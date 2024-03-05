import axios from "../../components/Api_Resources/axios";

export const startGetNewEvents = (search, sortBy, order, page, limit, city) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/ssp`, {
        params: {
          search,
          sortBy,
          order,
          page,
          limit,
          city,
        },
      })
      
      console.log(response.data,"in action")

      dispatch(setGetNewEvents(response.data));
    } catch (error) {
      console.error("Error fetching new events:", error);
    } 
  };
};



const setGetNewEvents = (sspData) => {
  const { total, page, totalPages, data } = sspData;
  return {
    type: "ADD_NEW_DATA",
    payload: {
      data,
      total,
      page,
      totalPages,
    },
  };
};
