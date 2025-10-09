import express from "express";
import { patientRegister,login,addNewAdmin,getAllDoctor,getUserDetails,logoutAdmin ,logoutPatient} from "../controller/userController.js";
const router = express.Router();
import {isAdminAuthenticated,isPatientAuthenticated} from "../middleware/auth.js"
router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/admin/addnew",isAdminAuthenticated , addNewAdmin);
router.get("/doctor", getAllDoctor);
router.get("/admin/me", isAdminAuthenticated,getUserDetails);
router.get("/patient/me", isPatientAuthenticated,getUserDetails);
router.get("/admin/logout", isAdminAuthenticated,logoutAdmin);
router.get("/patient/logout", isAdminAuthenticated,logoutPatient);

export default router;