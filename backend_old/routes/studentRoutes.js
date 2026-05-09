import express from "express";
import auth from "../middleware/Auth.js"
import { dash, dashData, dashForm, login, register } from "../controllers/studentController.js";
const router=express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/dash",auth,dash);
router.post("/dash-form",auth,dashForm);
router.get("/dash-data",auth,dashData);
export default router;