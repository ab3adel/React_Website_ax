import { Button } from '@chakra-ui/react'
import React from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import notFound from '../Assets/community-404.svg'

export function NotFoundPage() {
   const navigate = useNavigate()
   return (
      <div className="w-full h-[90vh] flex flex-col gap-10 justify-center items-center">
         <div className="w-2/5">
            <img alt="Not Found" src={notFound} />
         </div>
         <div className="flex flex-col gap-2 items-center">
            <h1 className="text-gray-base text-4xl">404</h1>
            <h5 className="text-gray-base">Oops! Page Not Found</h5>
            <Button
               onClick={() => navigate('/')}
               rightIcon={<MdKeyboardArrowRight className="text-2xl" />}
               variant="solid">
               Back to homepage
            </Button>
         </div>
      </div>
   )
}
