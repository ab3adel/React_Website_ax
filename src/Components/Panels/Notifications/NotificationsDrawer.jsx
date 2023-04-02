import React from 'react'
import LeftMenu from 'Components/Drawer/LeftMenu'
import { mockNotifcation } from '../../../Mock/mockNotifcation'
import NoifcationCard from './NotificationsCard'

function NotifcationsDrawer() {
   return (
      <LeftMenu>
         <div className="w-screen max-h-screen overflow-auto flex-col flex p-4 bg-gray-lightest md:h-auto">
            <h2 className="self-start font-semibold my-7 ml-2 text-2xl">
               Notification
            </h2>
            <div className="h-1/6">
               {mockNotifcation.map((el, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <NoifcationCard key={i} children={el} />
               ))}
            </div>
         </div>
      </LeftMenu>
   )
}

export default NotifcationsDrawer
