import express from "express";
import { login, logout, register, updateProfile } from "../controlers/userControler.js";
import isAuthonticated from "../middleware/isAuthonticated.js";
import { singleUpload } from "../middleware/multer.js";

const route = express.Router()

route.post('/register',singleUpload ,register)
route.post('/login',login)
route.get('/logout', isAuthonticated ,logout)
route.post('/update',isAuthonticated,singleUpload,updateProfile)

export default route