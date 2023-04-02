import { useQuery } from 'react-query'
import { useApiRequests } from 'API/apiRequests'

export const useGetEniromentsSettingsQuery = () => {
   const { getEviroment } = useApiRequests()

   const { isLoading } = useQuery(['env'], getEviroment, {
      onSuccess: (res) => {
         localStorage.setItem('video_url', res.data.data.video_url)
         localStorage.setItem(
            'logo',
            process.env.REACT_APP_MEDIA_PREFIX + res.data.data.logo
         )
         document.documentElement.style.setProperty(
            '--primary',
            res.data.data.primary_color
         )
         document.documentElement.style.setProperty(
            '--secondary',
            res.data.data.secondary_color
         )
      },
      staleTime: 'Infinity',
      cacheTime: 'Infinity',
      refetchOnWindowFocus: false
   })
   return { isLoading }
}
