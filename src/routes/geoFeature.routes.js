import express from "express";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });


import {
  uploadShapefile,
  getAllFeatures,
  getFeatureById,
  updateProperties,
  updateGeometry,
  deleteById,
  deleteAll,
} from "../controllers/geoFeature.controller.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadShapefile);
router.get("/features", getAllFeatures);
router.get("/features/:id", getFeatureById);
router.put("/features/:id", updateProperties);
router.put("/features/:id/geometry", updateGeometry);
router.delete("/features/:id", deleteById);
router.delete("/features", deleteAll);

export default router;
