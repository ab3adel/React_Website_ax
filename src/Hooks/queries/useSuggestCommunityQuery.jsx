import { useApiRequests } from 'API/apiRequests'
import { useToast } from '@chakra-ui/react'
import { useMutation, useQueryClient } from 'react-query'
import { useTranslation } from 'react-i18next'

export const useSuggestCommunityQuery = () => {
   const toast = useToast()

   const queryClient = useQueryClient()

   const { suggestCommunity } = useApiRequests()

   const { t } = useTranslation('common')

   const { isLoading, mutate } = useMutation(suggestCommunity, {
      onSuccess: () => {
         queryClient.invalidateQueries('communities')
         toast({
            status: 'success',
            title: t('success'),
            position: 'top',
            description: t('toasts.suggest')
         })
      },
      onError: (error) => {
         toast({
            status: 'error',
            title: t('error'),
            position: 'top',
            description: error.response.data.error
         })
      }
   })

   return { isLoading, mutate }
}
