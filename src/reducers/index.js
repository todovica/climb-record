import { UPDATE_USER } from "../constants/action-types";

const initialState = {
  user: {
    username: (localStorage.getItem('user')) ? localStorage.getItem('user').username : '',
    firstName: (localStorage.getItem('user')) ? localStorage.getItem('user').firstName : '',
    lastName: (localStorage.getItem('user')) ? localStorage.getItem('user').lastName : '',
    image: (localStorage.getItem('user')) ? localStorage.getItem('user').image : null
  }
};
  
function rootReducer(state = initialState, action) {

  if (action.type === UPDATE_USER) {
    return Object.assign({}, state, {
      user: {
        username: action.payload.username,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        image: action.payload.image 
      }
    });
  }
  
  return state;
};

export default rootReducer;