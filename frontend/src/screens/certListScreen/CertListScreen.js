import React, { useEffect } from 'react'
import { Table, Button, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/message/Message'
import Loader from '../../components/loader/Loader'
import { deleteCert, listCerts } from '../../actions/certActions'

const CertListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const certList = useSelector((state) => state.certList)
  const { loading, error, certs } = certList

  const certDelete = useSelector((state) => state.certDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = certDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }
    dispatch(listCerts())
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteCert(id))
    }
  }

  const nameClickHandler = (certid) => {
    history.push(`/certificates/${certid}`)
  }

  return userInfo ? (
    userInfo.isAdmin ? (
      <>
        <Row className='align-items-center'>
          <h1>Certificates</h1>
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
                  <th>USER</th>
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
                        href='true'
                        className='success-link no-underline hover:underline'
                        onClick={(e) => {
                          e.preventDefault()
                          nameClickHandler(cert._id)
                        }}
                      >
                        {cert.name}
                      </a>
                    </td>
                    <td>{cert.issuer}</td>
                    <td>{cert.date}</td>
                    <td>{cert.user.name}</td>
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
        Unauthorised Access of Admin Certificate List Page
      </Message>
    )
  ) : (
    <Message variant='danger'>
      You need to be logged in to view this page
    </Message>
  )
}

export default CertListScreen
