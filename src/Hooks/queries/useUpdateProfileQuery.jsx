import { useApiRequests } from 'API/apiRequests'
import { useMutation, useQueryClient } from 'react-query'
import { useRecoilState } from 'recoil'
import { userInfoAtom } from 'Recoil/Atoms'

export const useUpdateProfileQuery = () => {
   const { updateProfile } = useApiRequests()
   const queryClient = useQueryClient()
   const [, setUserInfo] = useRecoilState(userInfoAtom)

   const { isLoading, mutate, isSuccess } = useMutation(updateProfile, {
      onSuccess: (res) => {
         const { profile } = res.data.data.data.user
         setUserInfo({
            first_name: profile.first_name,
            last_name: profile.last_name,
            photo: res.data.data.photo
         })
         queryClient.invalidateQueries('user-profile')
      }
   })
   return { isLoading, mutate, isSuccess }
}
