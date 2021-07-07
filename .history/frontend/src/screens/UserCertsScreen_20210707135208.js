import React, { useEffect } from "react"
import { Table, Button, Row } from "react-bootstrap"
import { LinkContainer, Link } from "react-router-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { deleteCert, listUserCerts } from "../actions/certActions"

const UserCertsScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const certListUser = useSelector((state) => state.certListUser)
  const { loading, error, certs } = certListUser

  const certDelete = useSelector((state) => state.certDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = certDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    }
    dispatch(listUserCerts(userInfo._id))
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteCert(id))
    }
  }
  const nameClickHandler = (certid) => {
    history.push(`/certificates/${certid}`)
  }

  return userInfo ? (
    <>
      <Row className='align-items-center'>
        <h1>Certs</h1>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>CERT ID</th>
                <th>NAME</th>
                <th>ISSUER</th>
                <th>DATE OF ATTAINMENT</th>
                <th>STATUS</th>
                <th>REMOVE</th>
              </tr>
            </thead>
            <tbody>
              {certs.map((cert) => (
                <tr key={cert._id}>
                  <td>{cert._id}</td>
                  <td>
                    <a
                      className='hyperlink'
                      onClick={() => nameClickHandler(cert._id)}
                      href='javascript:void(0)'
                    >
                      {cert.name}
                    </a>
                    {cert.name}
                  </td>
                  <td>{cert.issuer}</td>
                  <td>{cert.date}</td>
                  <td>{cert.status}</td>
                  <td>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(cert._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  ) : (
    <Message variant='danger'>
      {" "}
      You need to be logged in to view this page
    </Message>
  )
}

export default UserCertsScreen
