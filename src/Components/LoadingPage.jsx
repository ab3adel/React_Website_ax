import { Spinner } from '@chakra-ui/react'
import React from 'react'

function LoadingPage() {
   return (
      <div className="flex sm:h-screen justify-center items-center w-full md:h-full h-screen">
         <Spinner
            thickness="8px"
            speed="0.65s"
            emptyColor="#8EA2C0"
            color="#d5346c"
            size="xl"
         />
      </div>
   )
}

export default LoadingPage
