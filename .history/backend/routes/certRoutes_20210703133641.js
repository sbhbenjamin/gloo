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

router.route("/").get(getCerts).post(protect, createCert)

router
  .route("/:id")
  .get(getCertById)
  .put(protect, updateCert)
  .delete(protect, deleteCert)

export default router
