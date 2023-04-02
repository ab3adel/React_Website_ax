import { useApiRequests } from 'API/apiRequests'
import { useQuery } from 'react-query'

export const useGetProffessionsList = () => {
   const { getProfession } = useApiRequests()
   const { data, isLoading } = useQuery(['profession'], getProfession)
   return { data, isLoading }
}
