import { Divider, Flex, Image, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { RiFileDamageLine } from 'react-icons/ri'
import { FaFilePdf } from 'react-icons/fa'
import { AiFillFilePpt } from 'react-icons/ai'
import { AttachementPreviewPopup } from 'Components/Modal/AttachementPreviewPopup'

function FileCard({ name, type, tags, id, url }) {
   const [popupIsOpen, setPopupIsopen] = useState(false)

   return (
      <>
         <AttachementPreviewPopup
            id={id}
            type={type}
            tags={tags}
            name={name}
            popupIsOpen={popupIsOpen}
            setPopupIsopen={setPopupIsopen}
         />
         <Flex
            onClick={() => setPopupIsopen(true)}
            className="hover:bg-gray-100 transition-all py-4"
            cursor="pointer"
            alignItems="center"
            direction="row"
            justifyContent="space-between">
            <Flex className="gap-4" alignItems="center">
               {type === 'PDF' && (
                  <FaFilePdf
                     className="text-4xl text-gray-base"
                     fontSize="1.5rem"
                  />
               )}

               {type === 'Image' && (
                  <Image
                     objectFit="contain"
                     fallback={
                        <div className="text-lg flex-1 flex items-center">
                           <RiFileDamageLine />
                        </div>
                     }
                     className="w-10 h-10"
                     alt="file"
                     src={url}
                  />
               )}

               {type === 'PPT' && (
                  <AiFillFilePpt className=" text-gray-base" fontSize="200px" />
               )}
               <VStack>
                  <Text className="text-sm">{name.slice(0, 20)}</Text>
               </VStack>
            </Flex>
         </Flex>
         <Divider />
      </>
   )
}

export default FileCard
