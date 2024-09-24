import express from "express";
import isAuthonticated from "../middleware/isAuthonticated.js";
import { getSavedJob, saved } from "../controlers/savedControler.js";

const route = express.Router()

route.get('/savedjob/:id',isAuthonticated,saved)
route.get('/getsavedjob',isAuthonticated,getSavedJob)

export default route