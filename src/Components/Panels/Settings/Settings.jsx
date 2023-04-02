import React from 'react'
import { Box, Button, Text } from '@chakra-ui/react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { HiOutlineLogout } from 'react-icons/hi'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import CollapsibleSettingsButton from '../../Buttons/CollapsibleSettingsButton'
import SettingsProfile, { ProfileTitle } from './SettingsProfile'
import SettingsPassword from './SettingsPassword'
import SettingsDrawer from './SettingsDrawer'
import { SettingsNotifcations } from './SettingsNotifcations'

function Settings() {
   const { t } = useTranslation('common')
   const navigate = useNavigate()
   return (
      <>
         <SettingsDrawer />
         <div className="min-w-[430px]  max-w-[430px] h-screen lg:min-w-[42%] overflow-auto flex-col flex bg-gray-lightest md:hidden">
            <Box
               as={motion.div}
               exit={{ opacity: 0 }}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}>
               <PerfectScrollbar className="overflow-auto  px-4">
                  <h2 className="self-start font-semibold my-6 text-[22px]">
                     {t('settings.title')}
                  </h2>
                  <Button
                     rightIcon={
                        <HiOutlineLogout className="text-3xl text-white" />
                     }
                     variant="solid"
                     size="lg"
                     height="14"
                     onClick={() => {
                        localStorage.removeItem('token')
                        setTimeout(() => navigate('/login'), 1000)
                     }}
                     width="100%"
                     justifyContent="space-between"
                     fontSize="md"
                     fontWeight="600">
                     {t('settings.logout')}
                  </Button>
                  <Box className="mt-8" rounded="lg" bgColor="gray-light">
                     <Text className="text-gray-base font-normal p-4">
                        {t('settings.account')}
                     </Text>
                     <CollapsibleSettingsButton
                        children={<SettingsProfile />}
                        text={
                           <ProfileTitle
                              main={t('settings.profile_settings')}
                              secound={t('settings.change_profile')}
                           />
                        }
                     />
                  </Box>
                  <Box className="mt-8" rounded="lg" bgColor="gray-light">
                     <Text className="text-gray-base font-normal p-4">
                        {t('settings.security')}
                     </Text>
                     <CollapsibleSettingsButton
                        children={<SettingsPassword />}
                        text={
                           <ProfileTitle
                              main={t('settings.password')}
                              secound={t('settings.change_password')}
                           />
                        }
                     />
                  </Box>
                  <SettingsNotifcations />
               </PerfectScrollbar>
            </Box>
         </div>
      </>
   )
}

export default Settings
