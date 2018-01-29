const GET_PROFILE_LOADING = "GET_PROFILE_LOADING";
const GET_PROFILE = "GET_PROFILE";
const GET_PROFILE_ERROR = "GET_PROFILE_ERROR";
const ITEMS_URL = "http://localhost:4000/items";
const USERS_URL = "http://localhost:4000/users";
// port config
const getProfileLoading = () => ({
  type: GET_PROFILE_LOADING
});

const getProfile = users => ({
  type: GET_PROFILE,
  payload: users
});

const getProfileError = error => ({
  type: GET_PROFILE_ERROR,
  payload: error
});

console.log("filter.js running")
export const fetchItemsAndUsers = userid => dispatch => {
  dispatch(getProfileLoading());

  return Promise.all(
    [`http://localhost:4000/items/?itemowner=${userid}`, USERS_URL].map(url =>
      fetch(url).then(response => response.json())
    )
  )
    .then(response => {
      const [itemsList, usersList] = response;

      const combined = itemsList.map(item => {
        item.itemowner = usersList.find(user => user.id === item.itemowner);

        // const tagged = combined.filter(item => item.tag.title === "Household Items");
        if (item.borrower) {
          item.borrower = usersList.find(user => user.id === item.borrower);
        }
        return item;
      });

      dispatch(getProfile(combined));
    })
    .catch(error => dispatch(getProfileError(error)));
};

export default (
  state = {
    isLoading: false,
    items: [],
    error: ""
  },
  action
) => {
  switch (action.type) {
    case GET_PROFILE_LOADING: {
      return { ...state, isLoading: true, error: "" };
    }
    case GET_PROFILE: {
      return { ...state, isLoading: false, items: action.payload, error: "" };
    }
    case GET_PROFILE_ERROR: {
      return { ...state, isLoading: false, error: action.payload };
    }
    default:
      return state;
  }
};
