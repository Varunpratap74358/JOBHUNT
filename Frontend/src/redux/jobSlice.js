import { createSlice } from '@reduxjs/toolkit'

const jobSlice = createSlice({
  name: 'job',
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    singleJob: null,
    searchJobByText: '',
    allAppliedJob: [],
    searchedQuery: '',
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload
    },
    setAllAppliedJob: (state, action) => {
      state.allAppliedJob = action.payload
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload
    },
  },
})

export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
  setAllAppliedJob,
  setSearchedQuery
} = jobSlice.actions
export default jobSlice.reducer
