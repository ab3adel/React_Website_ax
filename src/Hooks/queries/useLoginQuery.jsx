import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { useCookies } from 'react-cookie'
import { useRecoilState } from 'recoil'

import { useApiRequests } from 'API/apiRequests'
import {
   abilitiesArr,
   selectedView,
   userIdAtom,
   userInfoAtom,
   vendorIdAtom
} from 'Recoil/Atoms'
import { useAxiosInstance } from 'API/axiosInstance'
import { useTranslation } from 'react-i18next'

export const useLoginQuery = () => {
   const toast = useToast()

   const { setAuthToken } = useAxiosInstance()

   const [, setCookie] = useCookies(['token'])

   const [, setAbilities] = useRecoilState(abilitiesArr)

   const navigate = useNavigate()

   const [, setView] = useRecoilState(selectedView)

   const [, setUserInfo] = useRecoilState(userInfoAtom)

   const [, setUserId] = useRecoilState(userIdAtom)

   const { t } = useTranslation('common')

   const { login } = useApiRequests()

   const [, setVendorId] = useRecoilState(vendorIdAtom)

   const { isLoading, mutate } = useMutation(login, {
      onError: (error) => {
         toast({
            title: t('error'),
            position: 'top',
            description: error.response.data.error.data.errors.detail,
            status: 'error',
            isClosable: true
         })
      },
      onSuccess: (data) => {
         if (data) {
            setUserId(data.data.accessToken.tokenable_id)
            setVendorId(data.data.accessToken.id_vendor)
            setCookie('token', data.data.plainTextToken)
            setUserInfo({
               first_name: data.data.first_name,
               last_name: data.data.last_name,
               email: data.data.email,
               photo: data.data.photo
            })
            localStorage.setItem('token', data.data.plainTextToken)
            setAuthToken(data.data.plainTextToken)
            if (data.data.accessToken.abilities.length === 0) {
               setAbilities(false)
               navigate('/consent')
            } else {
               setAbilities(true)
               toast({
                  title: t('success'),
                  position: 'top',
                  description: t('toasts.login_success'),
                  duration: 1000,
                  status: 'success',
                  isClosable: true
               })
               setView('explore')
               navigate('/')
            }
         } else {
            toast({
               title: t('error'),
               position: 'top',
               description: 'Utente non trovato',
               status: 'error',
               isClosable: true
            })
         }
      }
   })

   return { isLoading, mutate }
}
