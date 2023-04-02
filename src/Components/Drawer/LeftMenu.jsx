import {
   Drawer,
   DrawerCloseButton,
   DrawerContent,
   DrawerOverlay
} from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'
import { MdOutlineArrowBackIos } from 'react-icons/md'
import { useRecoilState } from 'recoil'
import { drawerIsOpenAtom } from 'Recoil/Atoms'

function LeftMenu({ children }) {
   const [isOpen, setIsOpen] = useRecoilState(drawerIsOpenAtom)

   return (
      <>
         <MdOutlineArrowBackIos
            className="bg-white border-2 p-1 z-10 absolute top-4 left-3 text-3xl text-gray-base hidden md:block"
            onClick={() => setIsOpen(true)}
         />

         <Drawer
            autoFocus
            className="p-0"
            size="full"
            isOpen={isOpen}
            placement="left"
            onClose={() => setIsOpen(false)}>
            <DrawerOverlay />
            <DrawerContent>
               <DrawerCloseButton className="absolute z-50 bg-primary text-white" />
               {children}
            </DrawerContent>
         </Drawer>
      </>
   )
}

LeftMenu.propTypes = {
   children: PropTypes.element.isRequired
}

export default LeftMenu
