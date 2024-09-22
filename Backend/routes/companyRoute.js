import express from "express";
import isAuthonticated from "../middleware/isAuthonticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controlers/companyControler.js";
import { singleUpload } from "../middleware/multer.js";

const route = express.Router()

route.post('/register',isAuthonticated,registerCompany)
route.get("/get",isAuthonticated,getCompany)
route.get("/get/:id",isAuthonticated,getCompanyById)
route.put("/update/:id",isAuthonticated,singleUpload,updateCompany)

export default route