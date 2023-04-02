import { Text } from '@chakra-ui/react'
import React from 'react'

function Footer() {
   return (
      <div className="flex flex-col justify-center items-center pt-4">
         <div className="justify-center py-8">
            <Text className="md:text-center" color="gray-md">
               Progetto realizzato con il contributo non condizionante di
            </Text>
         </div>
         <div>
            <img
               className="w-32"
               alt="logo"
               src="https://axenso.com/assets/img/logo-axenso.png"
            />
         </div>
      </div>
   )
}

export default Footer
