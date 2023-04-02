/* eslint-disable no-param-reassign */
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

const axiosClient = axios.create()

export const useAxiosInstance = () => {
   const toast = useToast()

   const { t } = useTranslation('common')

   const { REACT_APP_API_BASE_URL } = process.env

   axiosClient.defaults.baseURL = REACT_APP_API_BASE_URL

   axiosClient.defaults.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
   }

   axiosClient.interceptors.response.use(
      (response) => response,
      (error) => {
         /* Checking if the response status is 401 and if there is a token in local storage. */
         if (error.response.status === 401 && localStorage.getItem('token')) {
            localStorage.removeItem('token')
            if (!toast.isActive('er')) {
               toast({
                  id: 'er',
                  title: t('error'),
                  position: 'top',
                  description: t('toasts.session'),
                  status: 'error',
                  duration: 1000,
                  isClosable: true
               })
               setTimeout(() => {
                  window.location = '/login'
               }, 1000)
            }
         }
         /* Returning the error to the component that called the API. */
         Promise.reject(error)
      }
   )

   /* Adding the token to the header of the request. */
   axiosClient.interceptors.request.use((config) => {
      const token = localStorage.getItem('token')
      config.headers.Authorization = token ? `Bearer ${token}` : ''
      return config
   })

   /**
    * If the tokenP parameter is not null, then set the Authorization header to the tokenP parameter,
    * otherwise set the Authorization header to an empty string.
    * @param tokenP - The token to be set in the header
    */
   function setAuthToken(tokenP) {
      axiosClient.interceptors.request.use((config) => {
         config.headers.Authorization = tokenP ? `Bearer ${tokenP}` : ''
         return config
      })
   }

   return { setAuthToken, axiosClient }
}
