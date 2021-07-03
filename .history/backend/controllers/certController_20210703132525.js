import asyncHandler from "express-async-handler"
import { product } from "../../frontend/src/components/__tests__/stubs/productStub.js"
import Cert from "../models/certModel.js"
import User from "../models/userModel.js"

// @desc        Fetch all certs
// @route       GET /api/certs
// @access      Private Admin
const getCerts = asyncHandler(async (req, res) => {
  const certs = await Cert.find().populate("user")

  res.json({ products })
})

// @desc        Fetch single cert
// @route       GET /api/certs/:id
// @access      Private
const getCertById = asyncHandler(async (req, res) => {
  const cert = await Cert.findById(req.params.id).populate("user")

  if (cert) {
    if (req.user._id == product.user._id) {
      res.json(cert)
    } else {
      res.status(403)
      throw new Error("Unauthorised attempt to view Certificate")
    }
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

// @desc        Delete a cert
// @route       DELETE /api/certs/:id
// @access      Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const cert = await Cert.findById(req.params.id)

  if (cert) {
    // if you want only the creator to delete, you should check
    // req.user._id == product.user._id
    await cert.remove()
    res.json({ message: "Product removed" })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

// @desc        Create a cert
// @route       POST /api/certs
// @access      Public
const createProduct = asyncHandler(async (req, res) => {
  const { name, status, issuer, date, image, user } = req.body

  const product = new Product({
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
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, category } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.category = category

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

// @desc        Create new Review
// @route       POST /api/products/:id/reviews
// @access      Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error("Product already reviewed")
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: "Review added" })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

// @desc        Get top rated products
// @route       POST /api/products/top
// @access      Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
}
