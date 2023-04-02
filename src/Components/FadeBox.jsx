import React from 'react'
import { motion } from 'framer-motion'
import { Box } from '@chakra-ui/react'

export function FadeBox({ children }) {
   return (
      <Box
         as={motion.div}
         exit={{ opacity: 0 }}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}>
         {children}
      </Box>
   )
}
