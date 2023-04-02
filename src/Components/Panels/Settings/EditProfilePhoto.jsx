import { Avatar, Box, WrapItem } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { MdEdit } from 'react-icons/md'

export function EditProfilePhoto({
   setSelectedFile,
   selectedFile,
   userProfile
}) {
   const fileRef = useRef()

   const handleSelectFile = (e) => {
      const file = e.target.files[0]
      setSelectedFile(file)
   }
   return (
      <WrapItem
         position="relative"
         mx="auto"
         alignItems="center"
         flex
         w="fit-content"
         flexDirection="column"
         my={8}>
         {selectedFile ? (
            <>
               <Avatar
                  opacity={0.6}
                  size="2xl"
                  name={userProfile.first_name}
                  src={URL.createObjectURL(selectedFile)}
               />
               {selectedFile && (
                  <div className="w-8  absolute right-0 bottom-0">
                     <Box
                        rounded="full"
                        className="cursor-pointer flex justify-center items-center p-2 w-8 h-8"
                        bg="gray.300"
                        onClick={() => fileRef.current.click()}
                        component="span">
                        <AiFillDelete
                           onClick={() => setSelectedFile(null)}
                           className="text-xl text-blue-dark"
                        />
                     </Box>
                  </div>
               )}
            </>
         ) : (
            <>
               <Avatar
                  size="2xl"
                  name={userProfile.first_name}
                  src={process.env.REACT_APP_MEDIA_PREFIX + userProfile.photo}
               />
               <label
                  className="w-8  absolute right-0 bottom-0"
                  htmlFor="contained-button-file">
                  <input
                     onChange={handleSelectFile}
                     ref={fileRef}
                     type="file"
                     hidden
                  />
                  {!selectedFile && (
                     <Box
                        rounded="full"
                        className="cursor-pointer flex justify-center items-center p-2 w-8 h-8"
                        bg="gray.300"
                        onClick={() => fileRef.current.click()}
                        component="span">
                        <MdEdit className="text-xl text-blue-dark" />
                     </Box>
                  )}
               </label>
            </>
         )}
      </WrapItem>
   )
}
