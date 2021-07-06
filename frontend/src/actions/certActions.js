import axios from "axios"
import {
  CERT_LIST_REQUEST,
  CERT_LIST_SUCCESS,
  CERT_LIST_FAIL,
  CERT_DETAILS_REQUEST,
  CERT_DETAILS_SUCCESS,
  CERT_DETAILS_FAIL,
  CERT_DELETE_REQUEST,
  CERT_DELETE_SUCCESS,
  CERT_DELETE_FAIL,
  CERT_CREATE_REQUEST,
  CERT_CREATE_SUCCESS,
  CERT_CREATE_FAIL,
  CERT_UPDATE_REQUEST,
  CERT_UPDATE_SUCCESS,
  CERT_UPDATE_FAIL,
  CERT_LIST_USER_REQUEST,
  CERT_LIST_USER_SUCCESS,
  CERT_LIST_USER_FAIL,
} from "../constants/certConstants"

export const listCerts = () => async (dispatch) => {
  try {
    dispatch({ type: CERT_LIST_REQUEST })

    const { data } = await axios.get(`/api/certs`)

    dispatch({
      type: CERT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CERT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listCertDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CERT_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/certs/${id}`)

    dispatch({
      type: CERT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CERT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteCert = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CERT_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/certs/${id}`, config)

    dispatch({
      type: CERT_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: CERT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createCert = (cert) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CERT_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/certs`, cert, config)

    dispatch({
      type: CERT_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CERT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateCert = (cert) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CERT_UPDATE_REQUEST,
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

    const { data } = await axios.put(`/api/certs/${cert._id}`, cert, config)

    dispatch({
      type: CERT_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CERT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listUserCerts = (userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CERT_LIST_USER_REQUEST,
    })

    const { data } = await axios.get(`/api/users/${userId}/certs`)

    dispatch({
      type: CERT_LIST_USER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CERT_LIST_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
