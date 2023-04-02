/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/media-has-caption */
import { Box, Flex, Tag, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'
import { BiNews } from 'react-icons/bi'

import Popup from 'Components/Modal/Popup'
import ReactPlayer from 'react-player'

function PopupNotifcation({ title, description, tags }) {
   return (
      <>
         <p className="font-bold text-base text-gray-dark">{title}</p>
         <Text className="text-gray-dark text-base font-normal">
            {description}
         </Text>
         <Flex className="gap-4">
            {tags.map(({ name }, i) => (
               <Tag
                  key={i}
                  justifyContent="center"
                  minWidth="50%"
                  size="md"
                  color="rose">
                  {name}
               </Tag>
            ))}
         </Flex>
      </>
   )
}

PopupNotifcation.propTypes = {
   title: PropTypes.string.isRequired,
   description: PropTypes.string.isRequired,
   tags: PropTypes.array.isRequired
}

function DetailsCard({ article }) {
   const { isOpen, onOpen, onClose } = useDisclosure()

   return (
      <>
         <Popup
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            media={
               <>
                  {article.video && (
                     <ReactPlayer
                        width="800px"
                        height="400px"
                        url={article.video}
                     />
                  )}
                  {!article.video && (
                     <BiNews className=" text-gray-base" fontSize="200px" />
                  )}
               </>
            }
            body={
               <PopupNotifcation
                  title={article.title}
                  description={article.description}
                  tags={article.tags}
               />
            }
         />
         <Box
            bgColor="white"
            rounded="lg"
            width="100%"
            shadow="sm"
            justifyContent="space-between"
            fontWeight="600"
            className="mb-3.5 p-4 hover:bg-gray-100 transition-all cursor-pointer">
            <VStack onClick={onOpen} alignItems="flex-start" direction="row">
               {article.video && (
                  <ReactPlayer
                     height="200px"
                     width="280px"
                     url={article.video}
                  />
               )}
               <p className="font-bold text-base text-gray-dark">
                  {article.title}
               </p>
               <Text className="text-gray-dark text-base font-normal">
                  {article.description}
               </Text>
               <Flex className="gap-2">
                  {article.tags.map(({ name, id }) => (
                     <Tag key={id} size="sm" color="rose">
                        {name}
                     </Tag>
                  ))}
               </Flex>
            </VStack>
         </Box>
      </>
   )
}

export default DetailsCard
DetailsCard.propTypes = {
   article: PropTypes.object.isRequired
}
