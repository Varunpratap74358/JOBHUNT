import express from "express";
import isAuthonticated from "../middleware/isAuthonticated.js";
import { applyJob, getApplicants, getAppliedJob, updateStatus } from "../controlers/applicationControler.js";

const route = express.Router()

route.get('/apply/:id',isAuthonticated,applyJob)
route.get('/get',isAuthonticated,getAppliedJob)
route.get('/:id/applicants',isAuthonticated,getApplicants)
route.post('/status/:id/update',isAuthonticated,updateStatus)



export default route