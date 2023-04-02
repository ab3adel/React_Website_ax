import { Button, Input, Textarea } from '@chakra-ui/react'
import { MdPersonAddAlt1, MdKeyboardArrowRight } from 'react-icons/md'
import CollapsibleButton from './CollapsibleButton'

export function InviteUser() {
   return (
      <CollapsibleButton
         icon={<MdPersonAddAlt1 className="text-2xl" />}
         text="Invite user">
         <div>
            <Input
               className="mb-4 self-center justify-center font-medium"
               type="text"
               variant="filled"
               placeholder="User email"
            />
            <Textarea
               className="mb-4 self-center justify-center font-medium"
               type="text"
               variant="filled"
               placeholder="Type massage"
            />

            <div>
               <Button
                  justifyContent="space-between"
                  rightIcon={<MdKeyboardArrowRight className="text-2xl" />}
                  variant="solid"
                  rounded="lg">
                  Send invite
               </Button>
            </div>
         </div>
      </CollapsibleButton>
   )
}
