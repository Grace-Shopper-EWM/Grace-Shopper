import axios from "axios";

/*
  EXPORTS:
    fetchUser
    updateUser
*/

/**
 * ACTION TYPES
 */

const UPDATE_USER = "UPDATE_USER";
const SET_USER = "SET_USER";

/**
 * ACTION CREATORS
 */

const setUser = (user) => ({
  type: SET_USER,
  user,
});

const editUser = (user) => ({
  type: UPDATE_USER,
  user,
});

/**
 * THUNK CREATORS
 */

export const fetchUser = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${userId}`);
      return dispatch(setUser(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateUser = (user) => {
  return async (dipatch) => {
    try {
      const { data } = await axios.put(`/api/users/${user.id}`, user);
      return dispatch(editUser(data));
    } catch (error) {
      console.error(error);
    }
  };
};

/**
 * REDUCER
 */

export default function userReducer(user = {}, action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    case UPDATE_USER:
      return action.user;
    default:
      return user;
  }
}