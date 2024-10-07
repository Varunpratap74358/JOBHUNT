import express from "express";
import isAuthonticated from "../middleware/isAuthonticated.js";
import { getAllJob, getJobAdminJobs, getJobById, postJob } from "../controlers/jobControler.js";

const route = express.Router()

route.post("/post",isAuthonticated,postJob)
route.get("/get",getAllJob)
route.get("/get/:id",isAuthonticated,getJobById)
route.get("/getadminjobs",isAuthonticated,getJobAdminJobs)

export default route