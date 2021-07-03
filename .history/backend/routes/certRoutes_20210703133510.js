import express from "express"
const router = express.Router()
import {
  getCerts,
  getCertById,
  deleteCert,
  createCert,
  updateCert,
} from "../controllers/certController.js"
import { protect, admin } from "../middleware/authMiddleware.js"

router
  .route("/")
  .get(getProducts)
  .post(protect, createProduct)
  .post(protect, admin, createProduct)
router.get("/top", getTopProducts)

router.route("/:id/reviews").post(protect, createProductReview)

router
  .route("/:id")
  .get(getProductById)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct)
  .delete(protect, admin, deleteProduct)

export default router
