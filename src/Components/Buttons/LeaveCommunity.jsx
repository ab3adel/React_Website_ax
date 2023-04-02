import {
   Button,
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton
} from '@chakra-ui/react'
import { useState } from 'react'
import { IoMdExit } from 'react-icons/io'
import { selectedCommunityId } from 'Recoil/Atoms'
import { useCancelJoinRequestQuery } from 'Hooks/queries/useCancelJoinRequestQuery'
import { useRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'

export function LeaveCommunity() {
   const [_id] = useRecoilState(selectedCommunityId)
   
   const [isOpen, setIsOpen] = useState(false)
   
   const { mutate } = useCancelJoinRequestQuery()

   const navigate = useNavigate()

   const handleLeave = () => {
      mutate(_id, { onSuccess: () => navigate('/') })
   }

   return (
      <>
         <Button
            onClick={() => setIsOpen(true)}
            px={2}
            variant="ghost"
            className="flex items-center">
            <span>Leave Community</span> <IoMdExit size="20px" />
         </Button>
         <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader textAlign="center">Want to Leave ?</ModalHeader>
               <ModalCloseButton />
               <ModalBody
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  pb={6}>
                  <p>Are you sure you want to leave this community</p>
               </ModalBody>

               <ModalFooter>
                  <Button onClick={handleLeave} height={9} mr={10}>
                     Leave
                  </Button>
                  <Button
                     bgColor="gray.600"
                     height={9}
                     onClick={() => setIsOpen(false)}>
                     Cancel
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   )
}
