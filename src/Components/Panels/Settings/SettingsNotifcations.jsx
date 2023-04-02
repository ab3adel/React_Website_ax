import { Box, Flex, Text, Tooltip } from '@chakra-ui/react'
import { useApiRequests } from 'API/apiRequests'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import Switch from 'react-switch'
import { ProfileTitle } from './SettingsProfile'

export function SettingsNotifcations() {
   const { t } = useTranslation('common')

   const [browserNotifications, setBrowserNotifications] = useState(false)

   const queryClient = useQueryClient()

   const { getProfileSettings, updateProfileSettings } = useApiRequests()

   const settingsQuery = useQuery(['profile-settings'], getProfileSettings)

   const { mutate, isLoading } = useMutation(updateProfileSettings, {
      onSuccess: () => {
         queryClient.invalidateQueries('profile-settings')
      }
   })

   useEffect(() => {
      if (Notification.permission === 'granted') {
         setBrowserNotifications(true)
      } else if (Notification.permission !== 'denied') {
         setBrowserNotifications(false)
         Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
               setBrowserNotifications(true)
            }
         })
      }
   }, [])

   const handleBrowserNotifications = (nextChecked) => {
      if (nextChecked) {
         Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
               setBrowserNotifications(true)
            }
         })
      }
   }

   const handleEmailNotification = (nextChecked) => {
      mutate({ notification_message: nextChecked === true ? '1' : '0' })
   }

   return (
      <Box className="mt-8 pb-4" rounded="lg" bgColor="gray-light">
         <Text className="text-gray-base font-normal p-4">
            {t('settings.notifications')}
         </Text>
         <Flex
            rounded="lg"
            bgColor="white"
            alignItems="center"
            justifyContent="space-between"
            direction="row"
            className="p-4 m-4">
            <ProfileTitle
               main={t('settings.text_messages')}
               secound={t('settings.show_text')}
            />
            <Switch
               disabled={isLoading}
               checked={settingsQuery.data?.data?.notification_message !== 0}
               onChange={handleEmailNotification}
            />
         </Flex>
         <Flex
            rounded="lg"
            bgColor="white"
            alignItems="center"
            justifyContent="space-between"
            direction="row"
            className="p-4 m-4">
            <ProfileTitle
               main={t('settings.browser_notifications')}
               secound={t('settings.enable_browser_notifications')}
            />
            <Tooltip
               hasArrow
               label={
                  browserNotifications
                     ? t('settings.enable_tooltip')
                     : t('settings.disable_tooltip')
               }
               shouldWrapChildren>
               <div>
                  <Switch
                     onChange={handleBrowserNotifications}
                     checked={browserNotifications}
                  />
               </div>
            </Tooltip>
         </Flex>
      </Box>
   )
}
