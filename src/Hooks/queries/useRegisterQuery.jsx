import { useToast } from '@chakra-ui/react'
import { useMutation } from 'react-query'
import { useApiRequests } from 'API/apiRequests'
import { useRecoilState } from 'recoil'
import { isUserRegistered } from 'Recoil/Atoms'
import { useTranslation } from 'react-i18next'

export const useRegisterQuery = () => {
   const toast = useToast()

   const [, setIsRegistered] = useRecoilState(isUserRegistered)

   const { register } = useApiRequests()

   const { t } = useTranslation('common')

   const { isLoading, mutate } = useMutation(register, {
      onError: (error) => {
         if (error.response.data.code === 422) {
            toast({
               title: t('error'),
               position: 'top',
               description: t('toasts.email_taken'),
               status: 'error',
               isClosable: true
            })
         }
      },
      onSuccess: () => {
         toast({
            title: t('success'),
            position: 'top',
            description: t('toasts.register_success'),
            duration: 1000,
            status: 'success',
            isClosable: true
         })
         setIsRegistered(true)
      }
   })

   return { isLoading, mutate }
}
