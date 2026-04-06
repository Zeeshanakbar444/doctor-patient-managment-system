import { Router } from "express";
import { createUser, deleteUser, getAll, updateUser, userProfile } from "../controller/userController.js";
const router = Router()

router.post("/create" , createUser)
router.get("/get" , getAll)
router.put("/update/:id" , updateUser)
router.delete("/delete/:id" , deleteUser)
router.get("/profile/:id" , userProfile)
export default router