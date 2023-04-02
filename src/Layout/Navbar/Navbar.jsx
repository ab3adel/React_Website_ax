import React from 'react'
import { Divider, Link } from '@chakra-ui/react'
import logo from '../../Assets/logo TIP.svg'

function Navbar() {
   return (
      <div className="flex w-screen justify-between p-6 pb-16 md:p-2 md:pb-2">
         <div className="flex justify-center pl-6">
            <Link href="./explore">
               <img
                  className="w-14"
                  alt="logo"
                  src={localStorage.getItem('logo')}
               />
            </Link>
         </div>
         <div className="flex pr-6 items-center">
            <Link className="p-4 font-medium" href="./register">
               SIGN UP
            </Link>
            <Divider borderColor="black" height="15px" orientation="vertical" />
            <Link className="p-4 font-medium" href="./login">
               LOGIN
            </Link>
         </div>
      </div>
   )
}

export default Navbar
