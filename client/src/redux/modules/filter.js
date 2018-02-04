const SET_FILTER_VALUE = "SET_FILTER_VALUE";

export const setFilterValue = filterValue => ({
  type: SET_FILTER_VALUE,
  payload: filterValue
});

export default (
  state = {
    filters: [
      { tagid: 1, title: "Tools" },
      { tagid: 2, title: "Household Items" },
      { tagid: 3, title: "Musical Instruments" },
      { tagid: 4, title: "Physical Media" },
      { tagid: 5, title: "Recreational Equipment" },
      { tagid: 6, title: "Sporting Goods" }
    ],
    selectedFilters: []
  },
  action
) => {

  switch (action.type) {
    case SET_FILTER_VALUE: {
      return { ...state, selectedFilters: [...action.payload] };
    }
    default:
      return state;
  }
};