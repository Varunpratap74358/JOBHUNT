import { Application } from '../models/applicationModel.js'
import { Job } from '../models/jobModel.js'

export const applyJob = async (req, res) => {
  try {
    const jobId = req.params.id
    const userId = req.id
    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: 'Job id is required',
      })
    }
    //check user alredy applied or not
    const existingAppliaction = await Application.findOne({
      job: jobId,
      applicant: userId,
    })
    if (existingAppliaction) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied this job',
      })
    }

    //check job
    const job = await Job.findById(jobId)
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job Not Found',
      })
    }

    //create a new application
    const newAppliaction = await Application.create({
      job: jobId,
      applicant: userId,
    })

    job.applications.push(newAppliaction._id)
    await job.save()

    return res.status(201).json({
      success: true,
      message: 'Job Applied Successfully',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getAppliedJob = async (req, res) => {
  try {
    const userId = req.id
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: 'job',
        options: { sort: { createdAt: -1 } },
        populate: {
          path: 'company',
          options: { sort: { createdAt: -1 } },
        },
      })
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Jobs Not Found',
      })
    }

    res.status(200).json({
      success: true,
      application,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

//job post karne bala dekhega kitne user ne appliy ketya hai
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id
    const job = await Job.findById(jobId).populate({
      path: 'applications',
      options: { sort: { createdAt: -1 } },
      populate: {
        path: 'applicant',
      },
    })
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Jobs Not Found',
      })
    }
    res.status(200).json({
      success: true,
      job,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body
    const applicationId = req.params.id

    if (!status) {
      return res.status(401).json({
        success: false,
        message: 'Status is required',
      })
    }

    //find application by applicationid
    const application = await Application.findOne({ _id: applicationId })
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      })
    }

    //update status
    application.status = status.toLowerCase();
    await application.save()

    res.status(200).json({
        message:"Status Updated successfully",
        success:true
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
