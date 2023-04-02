import React from 'react'
import {
   Accordion,
   AccordionButton,
   AccordionIcon,
   AccordionItem,
   AccordionPanel
} from '@chakra-ui/react'
import PropTypes from 'prop-types'

function CollapsibleMenu({ children, text }) {
   return (
      <Accordion
         borderColor="transparent"
         w="full"
         defaultIndex={[0]}
         allowMultiple>
         <AccordionItem color="gray-base">
            <AccordionButton
               backgroundColor="gray-light"
               className="mt-3 text-left "
               _focus={{ outline: 'none' }}
               height="16"
               width="100%"
               justifyContent="space-between"
               rounded="lg"
               textColor="gray-base">
               <span className="sm:text-sm p-4 sm:p-2">{text}</span>
               <AccordionIcon />
            </AccordionButton>
            <AccordionPanel
               pt={5}
               marginTop="-20px"
               roundedBottom="lg"
               backgroundColor="gray-light">
               {children}
            </AccordionPanel>
         </AccordionItem>
      </Accordion>
   )
}

export default CollapsibleMenu

CollapsibleMenu.propTypes = {
   children: PropTypes.element,
   text: PropTypes.string.isRequired
}
