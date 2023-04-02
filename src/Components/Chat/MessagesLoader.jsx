import { Box, Spinner } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React from 'react'

// eslint-disable-next-line react/prop-types
export function MessagesLoader({ isLoading, messagesArrLength }) {
   return (
      <div
         className={`w-full justify-center flex   ${
            isLoading && messagesArrLength === 0 ? 'h-[84vh]' : ''
         }`}>
         <Box
            as={motion.div}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}>
            <div className="bg-gray-100 w-14 h-14 rounded-full my-1 flex justify-center items-center">
               <Spinner />
            </div>
         </Box>
      </div>
   )
}
