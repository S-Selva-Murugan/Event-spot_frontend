const categoryCarouselInitialState = {
    categoryCarousel: [],
    infiniteScroll: {
        data: [], // Initially empty array for data
        total: 0, // Initially total set to 0
        page: 1, // Initially page set to 1
        totalPages: 0 // Initially totalPages set to 0
    }
};

const categoryCarouselReducer = (state = categoryCarouselInitialState, action) => {
    switch (action.type) {
        case "GET_CATEGORY_CAROUSEL":
            return {
                ...state,
                categoryCarousel: action.payload
            };
        case "ADD_NEW_DATA":
            return {
                ...state,
                infiniteScroll: {
                    ...state.infiniteScroll,
                    data: [...state.infiniteScroll.data, ...action.payload.data], // Append new data to existing data
                    total: action.payload.total,
                    page: action.payload.page,
                    totalPages: action.payload.totalPages
                }
            };
        default:
            return state
    }
};

export default categoryCarouselReducer
