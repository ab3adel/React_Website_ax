import { Box } from '@chakra-ui/react'
import { useApiRequests } from 'API/apiRequests'
import React from 'react'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import { selectedCommunityId } from 'Recoil/Atoms'
import MemberCard from './Cards/MemberCard'
import { InviteUser } from './Buttons/InviteUser'
import LoadingPage from './LoadingPage'

export function CommunityMembers() {
   const { getCommunityMembers } = useApiRequests()

   const [communityId] = useRecoilState(selectedCommunityId)

   const { data, isFetching } = useQuery(
      ['community-members', communityId],
      () => getCommunityMembers(communityId)
   )

   if (isFetching) return <LoadingPage />

   return (
      <div className="px-3 overflow-scroll h-[85vh]">
         <InviteUser />

         <Box className="pt-4">
            {data.data.map((member) => (
               <MemberCard key={member.id} user={member} />
            ))}
         </Box>
      </div>
   )
}
