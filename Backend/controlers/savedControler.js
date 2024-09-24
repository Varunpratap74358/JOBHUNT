import { Saved } from '../models/savedModel.js'

export const saved = async (req, res) => {
  try {
    const userId = req.id
    const jobId = req.params.id

    const savedJob = await Saved.find({ userId, jobId })
    // console.log(savedJob)

    if (savedJob.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Job Already saved',
      })
    }

    const savedData = await Saved.create({
      userId,
      jobId,
    })

    res.status(200).json({
      success: true,
      message: 'Job saved successfully',
      savedData,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getSavedJob = async (req, res) => {
  try {
    const userId = req.id

    const savedJob = await Saved.find({ userId })
      .populate({path:'jobId', populate:'company'})
      .populate({path:'userId',select:'-password'})

    res.status(200).json({
      success: true,
      savedJob,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
