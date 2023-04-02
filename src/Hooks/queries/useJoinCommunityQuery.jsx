import { useApiRequests } from 'API/apiRequests'
import { useToast } from '@chakra-ui/react'
import { useMutation, useQueryClient } from 'react-query'
import { useTranslation } from 'react-i18next'

export const useJoinCommunityQuery = () => {
   const toast = useToast()

   const queryClient = useQueryClient()

   const { joinCommunity } = useApiRequests()

   const { t } = useTranslation('common')

   const { isLoading, mutate } = useMutation(joinCommunity, {
      onSuccess: (res) => {
         queryClient.invalidateQueries('communities')
         toast({
            status: 'success',
            title: t('success'),
            position: 'top',
            description: res.data.data
         })
      }
   })

   return { isLoading, mutate }
}
