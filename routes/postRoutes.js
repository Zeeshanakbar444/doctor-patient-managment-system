import { Router } from "express";
import { fetchData } from "../controller/postController.js";
let router = Router();


router.get("/get",fetchData)
export default Router;
