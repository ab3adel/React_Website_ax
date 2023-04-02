import { useToast } from '@chakra-ui/react'
import { useApiRequests } from 'API/apiRequests'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

export const useActivationQuery = () => {
   const navigate = useNavigate()

   const toast = useToast()

   const { t } = useTranslation('common')

   const { activateUser } = useApiRequests()

   const { mutate } = useMutation(activateUser, {
      onSuccess: () => {
         navigate('/login')
         toast({
            title: t('error'),
            position: 'top',
            description: t('toasts.activation_success'),
            duration: 1000,
            status: 'success',
            isClosable: true
         })
      },
      onError: () => {
         toast({
            title: t('error'),
            position: 'top',
            description: t('toasts.activation_failure'),
            duration: 1000,
            status: 'error'
         })
      }
   })

   return { mutate }
}
