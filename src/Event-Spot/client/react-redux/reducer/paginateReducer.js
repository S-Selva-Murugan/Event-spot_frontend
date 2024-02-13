// eventsReducer.js

const initialState = {
    loading: false,
    data: null,
    totalPages: null,
    currentPage: null,
    error: null,
    events:[]
  };
  
  const paginateReducer = (state = initialState, action) => {
    switch (action.type) {
      case "EVENT_PAGINATE":
        return {
          ...state,
          loading: true,
          data: null,
          totalPages: null,
          currentPage: null,
          error: null,
        };
      case "PAGINATION_SUCCESS":
        return {
          ...state,
          loading: false,
          data: action.payload.data,
          totalPages: action.payload.totalPages,
          currentPage: action.payload.currentPage,
          error: null,
        };
      case "PAGINATION_ERROR":
        return {
          ...state,
          loading: false,
          data: null,
          totalPages: null,
          currentPage: null,
          error: action.payload,
        };
      default:
        return state;
    }
  };

    
  
  export default paginateReducer;
  