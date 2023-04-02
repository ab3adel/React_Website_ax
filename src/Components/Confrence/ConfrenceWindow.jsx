import React, { useState } from 'react'
import { CommunityDetailsDrawer } from 'Components/Drawer/CommunityDetailsDrawer'
import Messages from '../Chat/Messages'
import MessageSender from '../Chat/MessageSender'
import { ConfrenceHeader } from './ConfrenceHeader'

export function ConfrenceWindow() {
   const [isDrawerOpen, setIsDrawerOpen] = useState(false)

   return (
      <div className="w-[97%]  md:w-full mx-auto">
         <ConfrenceHeader openDrawer={() => setIsDrawerOpen(true)} />

         <div className="flex justify-center w-full ">
            <div className="w-[92%] md:w-full flex flex-col sm:px-0 px-2 h-[93vh] md:h-[86vh]">
               <Messages />
               <MessageSender />
            </div>

            <CommunityDetailsDrawer
               isDrawerOpen={isDrawerOpen}
               closeDrawer={() => setIsDrawerOpen(false)}
            />
         </div>
      </div>
   )
}
