/* eslint-disable react/no-array-index-key */
import React from 'react'
import { motion } from 'framer-motion'
import { Box } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { mockNotifcation } from '../../../Mock/mockNotifcation'
import NoifcationCard from './NotificationsCard'
import NotifcationsDrawer from './NotificationsDrawer'

function Notifications() {
   const { t } = useTranslation('common')

   return (
      <>
         <NotifcationsDrawer />
         <div className="min-w-[430px] lg:min-w-[350px] lg:max-w-[350px] max-w-[430px] h-screen overflow-auto flex-col flex bg-gray-lightest px-4 md:hidden">
            <Box
               as={motion.div}
               exit={{ opacity: 0 }}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}>
               <h2 className="self-start font-semibold my-6 text-[22px]">
                  {t('notifications.title')}
               </h2>
               <div className="h-1/6">
                  {mockNotifcation.map((el, i) => (
                     <NoifcationCard key={i} children={el} />
                  ))}
               </div>
            </Box>
         </div>
      </>
   )
}

export default Notifications
