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
                      href
                      className='no-underline hover:underline'
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

          <div class='min-w-screen min-h-screen bg-green-200 flex items-center p-5 lg:p-10 overflow-hidden relative'>
            <div class='w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left'>
              <div class='md:flex items-center -mx-10'>
                <div class='w-full md:w-1/2 px-10 mb-10 md:mb-0'>
                  <div class='relative'>
                    <img
                      src='https://pngimg.com/uploads/raincoat/raincoat_PNG53.png'
                      class='w-full relative z-10'
                      alt=''
                    />
                    <div class='border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0'></div>
                  </div>
                </div>
                <div class='w-full md:w-1/2 px-10'>
                  <div class='mb-10'>
                    <h1 class='font-bold uppercase text-2xl mb-5'>
                      Mens's Ragged Waterproof Jacket
                    </h1>
                    <p class='text-sm'>
                      Lorem ipsum dolor sit, amet consectetur adipisicing, elit.
                      Eos, voluptatum dolorum! Laborum blanditiis consequatur,
                      voluptates, sint enim fugiat saepe, dolor fugit, magnam
                      explicabo eaque quas id quo porro dolorum facilis...{" "}
                      <a
                        href='#'
                        class='opacity-50 text-gray-900 hover:opacity-100 inline-block text-xs leading-none border-b border-gray-900'
                      >
                        MORE <i class='mdi mdi-arrow-right'></i>
                      </a>
                    </p>
                  </div>
                  <div>
                    <div class='inline-block align-bottom mr-5'>
                      <span class='text-2xl leading-none align-baseline'>
                        $
                      </span>
                      <span class='font-bold text-5xl leading-none align-baseline'>
                        59
                      </span>
                      <span class='text-2xl leading-none align-baseline'>
                        .99
                      </span>
                    </div>
                    <div class='inline-block align-bottom'>
                      <button class='bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold'>
                        <i class='mdi mdi-cart -ml-2 mr-2'></i> BUY NOW
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
