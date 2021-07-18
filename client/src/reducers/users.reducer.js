import { GET_USERS } from "../actions/users.actions";

// On initie un state de départ à objet vide pour notre reducer
const initialState = {};

// On attribut à notre reducer l'initialState qui est vide et l'action
export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.payload;

    default:
      return state;
  }
}
