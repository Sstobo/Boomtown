
const GET_FILTERS = "GET_FILTERS";

export const Filters = filters => ({ type: GET_FILTERS, payload: filters });

export default (
  state = {
    filter: []
  },
  action
) => {
  switch (action.type) {
    case GET_FILTERS: {
      return { ...state, filter: action.payload };
    }

    default:
      return state;
  }
};