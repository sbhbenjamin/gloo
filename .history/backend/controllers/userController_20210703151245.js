import asyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js"
import User from "../models/userModel.js"
import Product from "../models/productModel.js"
import Cert from "../models/certModel.js"

// @desc        Auth user & get token
// @route       POST /api/users/login
// @access      Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email }).populate("certs")

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      certs: user.certs,
    })
  } else {
    res.status(401) // unauthorised
    throw new Error("Invalid Email or Password")
  }
})

// @desc        Register a new user
// @route       POST /api/users
// @access      Private
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400) // bad request
    throw new Error("User already exists")
  }

  // create is sugar for save
  // salt middleware automatically works
  const user = await User.create({
    name,
    email,
    password,
    certs: [],
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      certs: user.certs,
    }) // something was created
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

// @desc    Get user public profile
// @route   GET /api/users/:id/profile
// @access  Public
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).populate("certs")

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      certs: user.certs,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc    Get logged in user details
// @route   GET /api/users/profile
// @access  Private
const getUserProfileAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("certs")

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      certs: user.certs,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).populate("certs")
  res.json(users)
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: "User removed" })
  } else {
    res.status(404) // unauthorized
    throw new Error("User not found")
  }
})

// @desc    Get user by id
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password")

  if (user) {
    res.json(user)
  } else {
    res.status(404) // unauthorized
    throw new Error("User not found")
  }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc        Fetch products belonging to user
// @route       GET /api/:id/listings
// @access      Public
const getUserProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.params.id })
  res.json(products)
})

// @desc        Fetch certs belonging to user
// @route       GET /api/:id/certs
// @access      Public
const getUserCerts = asyncHandler(async (req, res) => {
  const certs = await Cert.find({ user: req.params.id })
  res.json(certs)
})

// @desc        Fetch user favourite products
// @route       GET /api/:id/favourites
// @access      Private
const getUserFavouriteProducts = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).populate("favouriteProducts")

  if (user) {
    res.json(user.favouriteProducts)
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc        Fetch individual favourited product
// @route       GET /api/:id/favourites
// @access      Private
const getUserFavouriteProductsById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.url.split("/")[1]).populate(
    "favouriteProducts"
  )

  if (user) {
    res.json(
      user.favouriteProducts.find(
        (p) => p._id.toString() === req.params.id.toString()
      )
    )
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc        Add to user favourite products
// @route       POST /api/:id/favourites
// @access      Private
const addToFavouriteProducts = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  const alreadyFavourited = user.favouriteProducts.find(
    (p) => p._id.toString() === req.body._id
  )

  // const product = await Product.findById(req.body._id).populate()

  if (alreadyFavourited) {
    res.status(400)
    throw new Error("Product already Favourited")
  } else if (user) {
    await user.favouriteProducts.push(req.body._id)
    await user.save()
    res.json(user)
    // res.status(201).json({ message: 'Product added to favourites' })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc        Remove from user favourite products
// @route       DELETE /api/:id/favourites
// @access      Private
const deleteFromFavouriteProducts = asyncHandler(async (req, res) => {
  const user = await User.findById(req.url.split("/")[1])
  // .populate(
  //   'favouriteProducts'
  // )

  if (user) {
    user.favouriteProducts = user.favouriteProducts.filter(
      (p) => p.toString() !== req.url.split("/")[3]
    )
    await user.save()
    res.json(user.favouriteProducts)
    //   res.status(201).json({ message: 'Product removed from favourites' })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

export {
  authUser,
  registerUser,
  getUserProfile,
  getUserProfileAdmin,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  getUserProducts,
  getUserCerts,
  getUserFavouriteProducts,
  getUserFavouriteProductsById,
  addToFavouriteProducts,
  deleteFromFavouriteProducts,
}
