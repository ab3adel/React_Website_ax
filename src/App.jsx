import React, { useEffect } from 'react'
import { Box } from '@chakra-ui/react'

import { useGetEniromentsSettingsQuery } from 'Hooks/queries/useGetEniromentsSettingsQuery'
import { usePusherChannels } from 'Hooks/usePusherChannels'
import { AppRoutes } from 'Routes/AppRoutes'
import LoadingPage from 'Components/LoadingPage'

function App() {
   const { isLoading } = useGetEniromentsSettingsQuery()

   usePusherChannels()

   if (isLoading) return <LoadingPage />

   return (
      <Box className="flex md:flex-col-reverse justify-between md:h-screen">
         <AppRoutes />
         <div id="meetingSDKElement" className="absolute right-[25%] top-10 z-50" />
      </Box>
   )
}

export default App
