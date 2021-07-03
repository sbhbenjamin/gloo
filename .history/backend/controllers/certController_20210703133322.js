import asyncHandler from "express-async-handler"
import Cert from "../models/certModel.js"
import User from "../models/userModel.js"

// @desc        Fetch all certs
// @route       GET /api/certs
// @access      Private Admin
const getCerts = asyncHandler(async (req, res) => {
  const certs = await Cert.find().populate("user")

  res.json({ certs })
})

// @desc        Fetch single cert
// @route       GET /api/certs/:id
// @access      Private
const getCertById = asyncHandler(async (req, res) => {
  const cert = await Cert.findById(req.params.id).populate("user")

  if (cert) {
    if (req.user._id == cert.user._id) {
      res.json(cert)
    } else {
      res.status(403)
      throw new Error("Unauthorised attempt to view Certificate")
    }
  } else {
    res.status(404)
    throw new Error("Cert not found")
  }
})

// @desc        Delete a cert
// @route       DELETE /api/certs/:id
// @access      Private/Admin
const deleteCert = asyncHandler(async (req, res) => {
  const cert = await Cert.findById(req.params.id)

  if (cert) {
    // if you want only the creator to delete, you should check
    // req.user._id == product.user._id
    await cert.remove()
    res.json({ message: "Cert removed" })
  } else {
    res.status(404)
    throw new Error("Cert not found")
  }
})

// @desc        Create a cert
// @route       POST /api/certs
// @access      Public
const createCert = asyncHandler(async (req, res) => {
  const { name, status, issuer, date, image } = req.body

  const product = new Cert({
    name,
    status: "Pending",
    issuer,
    date,
    image,
    user: req.user._id,
  })

  const createdCert = await cert.save()
  res.status(201).json(createdCert)
})

// @desc        Update a cert
// @route       PUT /api/certs/:id
// @access      Private/Admin
const updateCert = asyncHandler(async (req, res) => {
  const { name, status, issuer, date, image } = req.body

  const cert = await Cert.findById(req.params.id)

  if (cert) {
    cert.name = name
    cert.status = status
    cert.issuer = issuer
    cert.date = date
    cert.image = image

    const updatedCert = await cert.save()
    res.json(updatedCert)
  } else {
    res.status(404)
    throw new Error("Cert not found")
  }
})

export { getCerts, getCertById, deleteCert, createCert, updateCert }
