import { useApiRequests } from 'API/apiRequests'
import { useToast } from '@chakra-ui/react'
import { useMutation, useQueryClient } from 'react-query'
import { useTranslation } from 'react-i18next'

export const useCancelJoinRequestQuery = () => {
   const toast = useToast()

   const { cancelJoinRequestCommunity } = useApiRequests()

   const queryClient = useQueryClient()

   const { t } = useTranslation('common')

   const { isLoading, mutate } = useMutation(cancelJoinRequestCommunity, {
      onSuccess: () => {
         queryClient.invalidateQueries('communities')
         toast({
            status: 'success',
            title: t('success'),
            position: 'top',
            description: t('toasts.cancel_request')
         })
      }
   })

   return { isLoading, mutate }
}
