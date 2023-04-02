import { useToast } from '@chakra-ui/react'
import { useMutation } from 'react-query'
import { useApiRequests } from 'API/apiRequests'

import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const useResetPasswordQuery = () => {
   const toast = useToast()

   const navigate = useNavigate()

   const { resetPassword } = useApiRequests()

   const { t } = useTranslation('common')

   const { isLoading, mutate } = useMutation(resetPassword, {
      onError: (error) => {
         toast({
            title: t('error'),
            position: 'top',
            description: error.response.data.error.data,
            status: 'error',
            isClosable: true
         })
      },
      onSuccess: () => {
         toast({
            title: t('success'),
            position: 'top',
            description: t('toasts.password_reset'),
            status: 'success',
            isClosable: true
         })
         navigate('/login')
      }
   })

   return { isLoading, mutate }
}
