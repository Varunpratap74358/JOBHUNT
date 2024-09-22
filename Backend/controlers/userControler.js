import { User } from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cloudinary from '../utils/cludinary.js'
import getDataUri from '../utils/dataUri.js'

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Somthing is missing',
      })
    }

    const file = req.file;
    const fileUri = getDataUri(file)
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content)


    const user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'User already exist',
      })
    }
    const hashPassword = await bcrypt.hash(password, 10)

    const data = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashPassword,
      role,
      profile:{
        profilePhoto:cloudResponse.secure_url
      }
    })

    res.status(201).json({
      success: true,
      message: 'User Created Successfully',
      data,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: error.message,
    })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body
    if (!email || !role || !password) {
      return res.status(400).json({
        success: false,
        message: 'Somthing is missing',
      })
    }
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found with this email',
      })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      return res.status(404).json({
        success: false,
        message: 'Password is incorect',
      })
    }

    if (role !== user.role) {
      return res.status(400).json({
        success: false,
        message: "Account does't exist with this role",
      })
    }

    const token = await jwt.sign({ userId: user._id }, process.env.JWTSECRET, {
      expiresIn: '7d',
    })

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    }

    res
      .status(200)
      .cookie('token', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .json({
        success: true,
        message: 'Login Successfully',
        user,
      })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: error.message,
    })
  }
}

export const logout = async (req, res) => {
  try {
    res.status(200).cookie('token', '', { maxAge: 0 }).json({
      success: true,
      message: 'User logout successfully',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: error.message,
    })
  }
}

export const updateProfile = async(req,res)=>{
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    
    const file = req.file;

    // cloudinary ayega idhar
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    

    let skillsArray;
    if(skills){
        skillsArray = skills.split(",");
    }
    const userId = req.id; // middleware authentication
    let user = await User.findById(userId);

    if (!user) {
        return res.status(400).json({
            message: "User not found.",
            success: false
        })
    }
    // updating data
    if(fullname) user.fullname = fullname
    if(email) user.email = email
    if(phoneNumber)  user.phoneNumber = phoneNumber
    if(bio) user.profile.bio = bio
    if(skills) user.profile.skills = skillsArray
  
    // resume comes later here...
    if(cloudResponse){
        user.profile.resume = cloudResponse.secure_url // save the cloudinary url
        user.profile.resumeOrignalName = file.originalname // Save the original file name
    }


    await user.save();

    user = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile
    }

    return res.status(200).json({
        message:"Profile updated successfully.",
        user,
        success:true
    })
} catch (error) {
    console.log(error);
    res.status(500).json({
      message:error.message
    })
}
}