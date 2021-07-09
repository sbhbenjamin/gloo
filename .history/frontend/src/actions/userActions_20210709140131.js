import axios from "axios"
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_RESET,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_DETAILS_PUBLIC_REQUEST,
  USER_DETAILS_PUBLIC_SUCCESS,
  USER_DETAILS_PUBLIC_FAIL,
  USER_LIST_FAVOURITES_REQUEST,
  USER_LIST_FAVOURITES_SUCCESS,
  USER_LIST_FAVOURITES_FAIL,
  USER_ADD_FAVOURITE_REQUEST,
  USER_ADD_FAVOURITE_SUCCESS,
  USER_ADD_FAVOURITE_FAIL,
  USER_REMOVE_FAVOURITE_REQUEST,
  USER_REMOVE_FAVOURITE_SUCCESS,
  USER_REMOVE_FAVOURITE_FAIL,
  USER_GET_FAVOURITE_REQUEST,
  USER_GET_FAVOURITE_SUCCESS,
  USER_GET_FAVOURITE_FAIL,
} from "../constants/userConstants"
import { ORDER_LIST_MY_RESET } from "../constants/orderConstants"

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      config
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem("userInfo", JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// export const logout = () => (dispatch) => {
//   localStorage.removeItem("userInfo");
//   dispatch({ type: USER_LOGOUT });
//   dispatch({ type: USER_DETAILS_RESET });
//   dispatch({ type: ORDER_LIST_MY_RESET });
//   dispatch({ type: USER_LIST_RESET });
// };

export function logouthelper(dispatch) {
  localStorage.removeItem("userInfo")
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: USER_DETAILS_RESET })
  dispatch({ type: ORDER_LIST_MY_RESET })
  dispatch({ type: USER_LIST_RESET })
}

export function logout() {
  return logouthelper
}

// export const login = (email, password) => async (dispatch) => {
//   try {
//     dispatch({
//       type: USER_LOGIN_REQUEST,
//     });

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     const { data } = await axios.post(
//       "/api/users/login",
//       { email, password },
//       config
//     );

//     dispatch({
//       type: USER_LOGIN_SUCCESS,
//       payload: data,
//     });

//     localStorage.setItem("userInfo", JSON.stringify(data));
//   } catch (error) {
//     dispatch({
//       type: USER_LOGIN_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

export function login(email, password) {
  return async function loginhelper(dispatch) {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      })

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      )

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      })

      localStorage.setItem("userInfo", JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

// getState contains userInfo which contains the token
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users/${id}`, config)

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === "Not authorized, token failed") {
      dispatch(logout())
    }
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message,
    })
  }
}

export const getUserDetailsPublic = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_PUBLIC_REQUEST,
    })

    const { data } = await axios.get(`/api/users/${id}/profile`)

    dispatch({
      type: USER_DETAILS_PUBLIC_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === "Not authorized, token failed") {
      dispatch(logout())
    }
    dispatch({
      type: USER_DETAILS_PUBLIC_FAIL,
      payload: message,
    })
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/users/profile`, user, config)

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem("userInfo", JSON.stringify(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === "Not authorized, token failed") {
      dispatch(logout())
    }
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: message,
    })
  }
}

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users`, config)

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/users/${id}`, config)

    dispatch({ type: USER_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/users/${user._id}`, user, config)

    dispatch({ type: USER_UPDATE_SUCCESS })

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data }) // payload is the updated user
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getFavourites = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_FAVOURITES_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const { data } = await axios.get(`/api/users/${userInfo._id}/favourites`)

    dispatch({
      type: USER_LIST_FAVOURITES_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_LIST_FAVOURITES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getFav = (userId, productId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_GET_FAVOURITE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      `/api/users/${userId}/favourites/${productId}`,
      config
    )

    dispatch({ type: USER_GET_FAVOURITE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_GET_FAVOURITE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addFavourite = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ADD_FAVOURITE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(
      `/api/users/${userInfo._id}/favourites`,
      product,
      config
    )

    dispatch({ type: USER_ADD_FAVOURITE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_ADD_FAVOURITE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const removeFavourite = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_REMOVE_FAVOURITE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(
      `/api/users/${userInfo._id}/favourites/${product._id}`,
      config
    )

    dispatch({ type: USER_REMOVE_FAVOURITE_SUCCESS })
  } catch (error) {
    dispatch({
      type: USER_REMOVE_FAVOURITE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
