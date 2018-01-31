const GET_ITEMS_LOADING = "GET_ITEMS_LOADING";
const GET_ITEMS = "GET_ITEMS";
const GET_ITEMS_ERROR = "GET_ITEMS_ERROR";
const ITEMS_URL = "http://localhost:4000/items";
const USERS_URL = "http://localhost:4000/users";
const FILTER_ITEMS = "FILTER_ITEMS";
// port config
export const getItemsLoading = () => ({
  type: GET_ITEMS_LOADING
});

export const getItems = users => ({
  type: GET_ITEMS,
  payload: users
});

export const getItemsError = error => ({
  type: GET_ITEMS_ERROR,
  payload: error
});

// CODE BLOCK FROM COLIN
export const filterItems = (tags, items) => ({
  type: FILTER_ITEMS,
  payload: { tags, items }
});

export const filteredItems = (tags, items) => {
  if (tags.length === 0 || tags === []) {
    return items;
  } else {
    let result = [];
    items.forEach(item => {
    
      tags.forEach(tag => {
        if (item.tags.map(tag => tag.title).indexOf(tag) > -1) {
          result.push(item);

        }
      });
    });
    return result;
  }
};

export const fetchItemsAndUsers = () => dispatch => {
  dispatch(getItemsLoading());

  return Promise.all(
    [ITEMS_URL, USERS_URL].map(url =>
      fetch(url).then(response => response.json())
    )
  )
    .then(response => {
      const [itemsList, usersList] = response;

      const combined = itemsList.map(item => {
        item.itemowner = usersList.find(user => user.id === item.itemowner);

        if (item.borrower) {
          item.borrower = usersList.find(user => user.id === item.borrower);
        }
        return item;
      });

      dispatch(getItems(combined));
    })
    .catch(error => dispatch(getItemsError(error)));
};

export default (
  state = {
    isLoading: false,
    items: [],
    itemsFilter: [],
    tags: [],
    error: ""
  },
  action
) => {
  switch (action.type) {
    case GET_ITEMS_LOADING: {
      return {
        ...state,
        isLoading: true,
        error: ""
      };
    }
    case GET_ITEMS: {
      return {
        ...state,
        isLoading: false,
        itemsFilter: action.payload,
        items: action.payload,
        error: ""
      };
    }
    case GET_ITEMS_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }

    case FILTER_ITEMS: {
      const filtered = filteredItems(action.payload.tags, action.payload.items);
      return {
        ...state,
        isLoading: false,
        tags: action.payload.tags,
        items: action.payload.items,
        itemsFilter: filtered
      };
    }
    default:
      return state;
  }
};
