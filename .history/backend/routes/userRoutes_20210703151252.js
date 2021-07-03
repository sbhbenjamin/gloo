import express from "express"
const router = express.Router()
import {
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
} from "../controllers/userController.js"
import { protect, admin } from "../middleware/authMiddleware.js"

// user register routes
router.route("/").post(registerUser).get(protect, admin, getUsers)

// user login route
router.post("/login", authUser)

// user listings
router.route("/:id/profile").get(getUserProfile)

router.route("/:id/listings").get(getUserProducts)

//user certs
router.route("/:id/certs").get(getUserCerts)

// user favourite products
router
  .route("/:id/favourites")
  .get(getUserFavouriteProducts)
  .post(addToFavouriteProducts)

router
  .route("/:id/favourites/:id")
  .get(getUserFavouriteProductsById)
  .delete(deleteFromFavouriteProducts)

// user profile routes
router
  .route("/profile")
  .get(protect, getUserProfileAdmin)
  .put(protect, updateUserProfile)

// user admin routes
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

export default router
