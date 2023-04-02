import React from 'react'
import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalFooter,
   ModalBody,
   Box
} from '@chakra-ui/react'
import { MdOutlineArrowBackIos } from 'react-icons/md'
import PropTypes from 'prop-types'

function Popup({ media, body, onClose, isOpen }) {
   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <ModalOverlay />
         <ModalContent overflowX="hidden" boxSize="-webkit-fit-content" maxWidth="-moz-fit-content" minWidth="50%" marginTop="8" className='w-[80%] md:w-[70%]'>
            <MdOutlineArrowBackIos
               onClick={onClose}
               fontWeight="800"
               className="text-4xl text-gray-base pt-4 pl-4"
            />
            <ModalBody className="whitespace-nowrap">
               <Box
                  alignItems="flex-start"
                  className="w-auto h-auto flex justify-center items-center mt-4 p-1 whitespace-nowrap"
                  bgColor="gray-light">
                  {media}
               </Box>
            </ModalBody>

            <ModalFooter alignItems="flex-start" className="flex-col gap-y-4">
               {body}
            </ModalFooter>
         </ModalContent>
      </Modal>
   )
}

Popup.propTypes = {
   media: PropTypes.element,
   body: PropTypes.element,
   onClose: PropTypes.func.isRequired,
   isOpen: PropTypes.bool.isRequired
}

export default Popup
