import { Company } from '../models/companyModel.js'
import cloudinary from '../utils/cludinary.js'
import getDataUri from '../utils/dataUri.js'

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body
    const userId = req.id
    if (!companyName) {
      return res.status(400).json({
        success: false,
        message: 'Company name is required',
      })
    }
    let company = await Company.findOne({ name: companyName })
    if (company) {
      return res.status(400).json({
        success: false,
        message: 'Company is already exist',
      })
    }
    company = await Company.create({
      name: companyName,
      userId,
    })

    res.status(201).json({
      success: true,
      message: 'Company Registered Successfully',
      company,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: true,
      message: error.message,
    })
  }
}

export const getCompany = async (req, res) => {
  try {
    const userId = req.id
    const companys = await Company.find({ userId })
    if (!companys) {
      return res.status(404).json({
        success: false,
        message: 'Companyes not found',
      })
    }
    res.status(200).json({
      success: true,
      companys,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: true,
      message: error.message,
    })
  }
}

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id
    const company = await Company.findById(companyId)
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Compay not found',
      })
    }
    res.status(200).json({
      success: true,
      company,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: true,
      message: error.message,
    })
  }
}

export const updateCompany = async (req, res) => {
  try {
    const { name, discription, website, location } = req.body
    const file = req.file
    const companyId = req.params.id
    //cloudinary setup
    const fileUri = getDataUri(file)
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
    const logo = cloudResponse.secure_url;



    const updateData = { name, discription, website, location,logo }
    const company = await Company.findByIdAndUpdate(companyId, updateData, {
      new: true,
    })
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Compay not found',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Company Information updated',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: true,
      message: error.message,
    })
  }
}
