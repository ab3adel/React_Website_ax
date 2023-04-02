import { Avatar, useMediaQuery } from '@chakra-ui/react'
import { HiDotsHorizontal } from 'react-icons/hi'
import { useRecoilState } from 'recoil'
import { selectedCommunityName } from 'Recoil/Atoms'
import { ActiveMembersCount } from './ActiveMembersCount'

function ChatHeader({ openDrawer }) {
   const [smallScreen] = useMediaQuery('(max-width: 1023px)')
   const [communityName] = useRecoilState(selectedCommunityName)
   return (
      <div
         className="flex items-center py-4 md:pl-14 md:py-2 pr-3
               border-b bg-white border-opacity-40 border-gray-300">
         <Avatar name={communityName.name} />
         <div className=" flex-column w-full pl-7 sm:pl-3">
            <h5 className="text-base  md:text-lg font-bold">
               {!smallScreen
                  ? communityName.name
                  : `${communityName.name.slice(0, 20)}...`}
            </h5>
            <ActiveMembersCount members_count={communityName.members_count} />
         </div>
         <button type="submit" onClick={openDrawer}>
            <HiDotsHorizontal className="text-3xl md:text-2xl text-primary" />
         </button>
      </div>
   )
}

export default ChatHeader
