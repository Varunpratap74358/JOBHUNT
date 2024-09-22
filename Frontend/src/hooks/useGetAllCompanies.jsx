import { COMPANY_API_POINT } from '@/components/utils/constant'
import { setCompinies } from '@/redux/companySlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const useGetAllCompanies = () => {
    const dispatch = useDispatch()
 useEffect(()=>{
    const fetchAllCompany = async()=>{
        try {
            const {data} = await axios.get(`${COMPANY_API_POINT}/get`,{withCredentials:true})
            dispatch(setCompinies(data.companys))
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
        }
    }
    fetchAllCompany()
 },[])
}

export default useGetAllCompanies
