import ChatHeader from 'Components/Chat/ChatHeader'
import Messages from 'Components/Chat/Messages'
import MessageSender from 'Components/Chat/MessageSender'
import { CommunityDetailsDrawer } from 'Components/Drawer/CommunityDetailsDrawer'
import { useState } from 'react'

function ChatWindow() {
   const [isDrawerOpen, setIsDrawerOpen] = useState(false)
   return (
      <div className="flex justify-center w-full ">
         <div className="w-[92%] md:w-full flex flex-col sm:px-0 px-2 h-screen md:h-[93vh]">
            <ChatHeader
               membersCount={30}
               membersOnlineCount={3}
               openDrawer={() => setIsDrawerOpen(true)}
            />
            <Messages />
            <MessageSender />
         </div>

         <CommunityDetailsDrawer
            isDrawerOpen={isDrawerOpen}
            closeDrawer={() => setIsDrawerOpen(false)}
         />
      </div>
   )
}

export default ChatWindow
