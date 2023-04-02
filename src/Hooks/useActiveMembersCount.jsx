import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { activeUsersAtom, selectedCommunityId } from 'Recoil/Atoms'

export const useActiveMembersCount = () => {
   const [activeUsers] = useRecoilState(activeUsersAtom)
   const [communityId] = useRecoilState(selectedCommunityId)
   const [onlineMembers, setOnlineMembers] = useState(0)

   useEffect(() => {
      /* Counting the number of users that are online in the community. */
      let count = 0
      
      activeUsers?.map((user) => {
         /* Checking if the user is in the community. */
         user.communities.map(({ id }) => {
            if (id === communityId) {
               count++
            }
         })
      })
      setOnlineMembers(count)
   })

   return { onlineMembers }
}
