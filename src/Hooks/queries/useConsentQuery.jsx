import { useToast } from '@chakra-ui/react'
import { useApiRequests } from 'API/apiRequests'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { abilitiesArr, selectedView } from 'Recoil/Atoms'
import { useRecoilState } from 'recoil'
import { useTranslation } from 'react-i18next'
import { useAxiosInstance } from 'API/axiosInstance'

export const useConsentQuery = () => {
   const toast = useToast()

   const navigate = useNavigate()

   const { setAuthToken } = useAxiosInstance()

   const [, setAbilities] = useRecoilState(abilitiesArr)

   const [, setView] = useRecoilState(selectedView)

   const { consent } = useApiRequests()

   const { t } = useTranslation('common')

   const { isLoading, mutate } = useMutation(consent, {
      onError: (error) => {
         toast({
            title: t('error'),
            position: 'top',
            description: error.response.data.error.data.errors.detail,
            status: 'error',
            isClosable: true
         })
      },
      onSuccess: (res) => {
         localStorage.setItem('token', res.data.data.plainTextToken)
         setAuthToken(res.data.data.plainTextToken)
         setAbilities(true)
         setView('explore')
         navigate('/')
      }
   })
   return { isLoading, mutate }
}
