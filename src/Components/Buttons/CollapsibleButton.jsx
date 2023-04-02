import React from 'react'
import {
   Accordion,
   AccordionButton,
   AccordionItem,
   AccordionPanel
} from '@chakra-ui/react'

function CollapsibleButton({ children, text, icon }) {
   return (
      <Accordion
         borderColor="transparent"
         w="full"
         defaultIndex={[]}
         allowMultiple>
         <AccordionItem>
            <AccordionButton _focus={{ boxShadow: 'none' }} rounded="lg" p={0}>
               <div className="h-14 w-full flex justify-between font-semibold items-center bg-white px-7 active:bg-red-100 transition-all hover:bg-red-50 rounded-lg">
                  <span className="sm:text-sm text-primary">{text}</span>
                  <span className="sm:text-sm text-primary"> {icon}</span>
               </div>
            </AccordionButton>
            <AccordionPanel
               marginTop="-9px"
               roundedBottom="lg"
               pt={5}
               bgColor="#ffffff">
               {children}
            </AccordionPanel>
         </AccordionItem>
      </Accordion>
   )
}

export default CollapsibleButton
