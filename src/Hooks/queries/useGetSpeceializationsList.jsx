import { useApiRequests } from 'API/apiRequests'
import { useMutation } from 'react-query'

export const useGetSpeceializationsList = () => {
   const { getSpecializations } = useApiRequests()
   const { mutate, data, isLoading } = useMutation(getSpecializations)
   return { mutate, data, isLoading }
}
