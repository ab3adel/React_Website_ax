import React from 'react'
import {
   Accordion,
   AccordionButton,
   AccordionIcon,
   AccordionItem,
   AccordionPanel
} from '@chakra-ui/react'
import PropTypes from 'prop-types'

function CollapsibleSettingsButton({ children, text }) {
   return (
      <Accordion
         borderColor="transparent"
         className="px-3 pb-4"
         w="full"
         defaultIndex={[]}
         allowMultiple>
         <AccordionItem>
            <AccordionButton _focus={{ boxShadow: 'none' }} rounded="lg" p={0}>
               <div className=" bg-white w-full h-16 sm:h-auto justify-between flex items-center rounded-lg px-4">
                  {text}
                  <AccordionIcon />
               </div>
            </AccordionButton>
            <AccordionPanel mt="-10px" roundedBottom="lg" bgColor="#ffffff">
               {children}
            </AccordionPanel>
         </AccordionItem>
      </Accordion>
   )
}

export default CollapsibleSettingsButton

CollapsibleSettingsButton.propTypes = {
   children: PropTypes.element.isRequired,
   text: PropTypes.element.isRequired
}
