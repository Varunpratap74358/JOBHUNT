import { createSlice } from '@reduxjs/toolkit'
const companySlice = createSlice({
  name: 'company',
  initialState: {
    singleCompany: null,
    compinies: [],
    searchCompanyByText: '',
  },
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload
    },
    setCompinies: (state, action) => {
      state.compinies = action.payload
    },
    setSearchCompanyByText: (state, action) => {
      state.searchCompanyByText = action.payload
    },
  },
})
export const {
  setSingleCompany,
  setCompinies,
  setSearchCompanyByText,
} = companySlice.actions
export default companySlice.reducer
