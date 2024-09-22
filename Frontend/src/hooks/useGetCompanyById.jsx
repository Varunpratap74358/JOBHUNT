import { COMPANY_API_POINT } from '@/components/utils/constant'
import { setSingleCompany } from '@/redux/companySlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch()
 useEffect(()=>{
    const fetchSingleCompany = async()=>{
        try {
            const {data} = await axios.get(`${COMPANY_API_POINT}/get/${companyId}`,{withCredentials:true})
            dispatch(setSingleCompany(data.company))
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
        }
    }
    fetchSingleCompany()
 },[companyId, dispatch])
}

export default useGetCompanyById
