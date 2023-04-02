import { useToast } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { abilitiesArr } from 'Recoil/Atoms'

function ProtectedRoute({ children }) {
   const token = localStorage.getItem('token')
   const toast = useToast()
   const [abilities] = useRecoilState(abilitiesArr)
   const { t } = useTranslation('common')

   if (!token) {
      toast({
         title: t('error'),
         position: 'top',
         description: t('toasts.not_logged'),
         status: 'error',
         duration: 1000,
         isClosable: true
      })
      return <Navigate to="/login" replace />
   }

   if (!abilities) {
      toast({
         title: t('error'),
         position: 'top',
         description: t('toasts.accept_policy'),
         status: 'error',
         isClosable: true
      })
      return <Navigate to="/consent" replace />
   }

   return children
}

export default ProtectedRoute
