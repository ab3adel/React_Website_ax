import React from 'react'
import { Button, Avatar, Text, VStack, Stack } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

function NotificationsCard({ children }) {
   const { t } = useTranslation('common')

   return (
      <Button
         variant="ghost"
         size="lg"
         width="100%"
         justifyContent="space-between"
         fontWeight="600"
         whiteSpace="normal"
         className="mb-3.5 mb-8"
         height="fit-content">
         <VStack
            justifyContent="center"
            className="w-full py-4"
            direction="column">
            <Stack
               spacing={7}
               className="w-full"
               justifyContent="flex-start"
               alignItems="center"
               alignSelf="flex-start"
               direction="row">
               <Stack
                  className="w-full"
                  direction="row"
                  alignItems="flex-start">
                  <div className="relative mr-3 whitespace-normal">
                     {children.type === 'user' ? (
                        <Avatar backgroundColor="gray.200" />
                     ) : (
                        <Avatar
                           backgroundColor="gray.200"
                           name={children.user}
                        />
                     )}
                  </div>
                  <VStack alignItems="flex-start">
                     <p className="font-bold text-base text-black">
                        {children.user}
                     </p>
                     <Text className="font-normal text-left text-base text-gray-base">
                        {children.status}
                     </Text>
                  </VStack>
               </Stack>
               <Text className="w-1/5 font-normal text-gray-base" fontSize="xs">
                  {children.date}
               </Text>
            </Stack>
            {children.done && (
               <Stack
                  className="w-6/12"
                  justifyContent="center"
                  direction="row">
                  <Button
                     justifyContent="flex-start"
                     minW="90%"
                     variant="fade"
                     height="10"
                     rounded="lg">
                     {t('notifications.hide')}
                  </Button>
                  <Button
                     justifyContent="flex-start"
                     minW="90%"
                     height="10"
                     variant="solid"
                     rounded="lg">
                     {t('notifications.confirm')}
                  </Button>
               </Stack>
            )}
         </VStack>
      </Button>
   )
}

NotificationsCard.propTypes = {
   children: PropTypes.object.isRequired
}

export default NotificationsCard
