import { Job } from '../models/jobModel.js'

export const postJob = async (req, res) => {
  try {
    const {
      title,
      discription,
      requirements,
      salary,
      location,
      jobType,
      position,
      experience,
      companyId,
    } = req.body
    const userId = req.id
    if (
      !title ||
      !discription ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !position ||
      !experience ||
      !companyId
    ) {
      return res.status(400).json({
        success: false,
        message: 'Somthing is missing',
      })
    }

    const job = await Job.create({
      title,
      discription,
      requirements: requirements.split(','),
      salary: Number(salary),
      location,
      jobType,
      position,
      experienceLabel: experience,
      company: companyId,
      created_by: userId,
    })

    res.status(201).json({
      success: true,
      message: 'New Job Created Successfully..',
      job,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: true,
      message: error.message,
    })
  }
}

export const getAllJob = async (req, res) => {
  try {
    const keyword = req.query.keyword || ''
    // console.log(keyword)
    const query = {
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { discription: { $regex: keyword, $options: 'i' } },
      ],
    }

    const jobs = await Job.find(query)
      .populate('company')
      .populate('created_by')
    if (!jobs) {
      return res.status(404).json({
        success: false,
        message: 'Job Not Found',
      })
    }
    return res.status(200).json({
      success: false,
      jobs,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: true,
      message: error.message,
    })
  }
}

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id
    const job = await Job.findById(jobId)
      .populate('company')
      .populate('created_by')
      .populate({
        path:"applications"
      })
    if (!job) {
      return res.status(404).json({
        success: true,
        message: 'Job Not Found',
      })
    }
    res.status(200).json({
      success: true,
      job,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: true,
      message: error.message,
    })
  }
}

export const getJobAdminJobs = async (req, res) => {
  try {
    const adminId = req.id
    const jobs = await Job.find({ created_by: adminId })
      .populate({path:'created_by'})
      .populate({path:'company',createdAt:-1})
    if (!jobs) {
      return res.status(404).json({
        success: true,
        message: 'Jobs Not Found',
      })
    }
    res.status(200).json({
      success: true,
      jobs,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: true,
      message: error.message,
    })
  }
}
