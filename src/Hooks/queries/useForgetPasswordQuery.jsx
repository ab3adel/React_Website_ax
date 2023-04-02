import { useToast } from '@chakra-ui/react'
import { useMutation } from 'react-query'
import { useApiRequests } from 'API/apiRequests'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const useForgetPasswordQuery = () => {
   const toast = useToast()

   const navigate = useNavigate()

   const { requestPassword } = useApiRequests()

   const { t } = useTranslation('common')

   const { isLoading, mutate } = useMutation(requestPassword, {
      onError: (error) => {
         toast({
            title: t('error'),
            position: 'top',
            description: error.response.data.error.data.errors.detail,
            status: 'error',
            isClosable: true
         })
      },
      onSuccess: () => {
         toast({
            title: t('success'),
            position: 'top',
            description: t('toasts.check_email'),
            status: 'success',
            isClosable: true
         })
         navigate('/login')
      }
   })
   return { isLoading, mutate }
}
