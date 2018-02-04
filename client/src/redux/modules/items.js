const GET_ITEMS_ERROR = "GET_ITEMS_ERROR";
const FILTER_ITEMS = "FILTER_ITEMS";

const getItemsError = error => ({
  type: GET_ITEMS_ERROR,
  payload: error
});

export const filterItems = values => ({
  type: FILTER_ITEMS,
  payload: values
});

//REDUCER
export default (
  state = {
    // isLoading: false,
    items: [],
    itemsFilter: [
      { title: "Electronics", id: 1 },
      { title: "Household Items", id: 2 },
      { title: "Musical Instruments", id: 3 },
      { title: "Physical Media", id: 4 },
      { title: "Recreational Equipment", id: 5 },
      { title: "Sporting Goods", id: 6 },
      { title: "Tools", id: 7 }
    ],
    selectedTags: [],
    error: ""
  },
  action
) => {
  switch (action.type) {
    case GET_ITEMS_ERROR: {
      return {
        ...state,

        error: action.payload
      };
    }

    case FILTER_ITEMS: {
      //call filter

      return {
        ...state,
        selectedTags: action.payload
      };
    }
    default:
      return state;
  }
};