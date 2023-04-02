import {
   Button,
   Box,
   ModalBody,
   Modal,
   ModalOverlay,
   ModalContent,
   Text,
   ModalFooter,
   useToast
} from '@chakra-ui/react'
import { AiOutlineUpload, AiFillDelete } from 'react-icons/ai'
import { GrAttachment } from 'react-icons/gr'
import { MdOutlineArrowBackIos, MdKeyboardArrowRight } from 'react-icons/md'
// import TagsInput from 'Components/Inputs/TagsInput'
import { useRef, useState } from 'react'
import { useApiRequests } from 'API/apiRequests'
import { useMutation } from 'react-query'
import { useRecoilState } from 'recoil'
import { messagesArrAtom } from 'Recoil/Atoms'
import { useTranslation } from 'react-i18next'

export default function UploadFile() {
   const [isOpen, setIsopen] = useState(false)
   const fileRef = useRef()
   const [selectedFile, setSelectedFile] = useState(null)
   const [inputMessageValue, setInputMessageValue] = useState('')
   const [messagesArr, setMessagesArr] = useRecoilState(messagesArrAtom)
   const { sendMessage } = useApiRequests()
   const toast = useToast()
   const { t } = useTranslation('common')

   const { isLoading, mutate } = useMutation(sendMessage, {
      onError: (error) => {
         if (error.response.status === 422) {
            toast({
               id: 'er',
               title: t('error'),
               position: 'top',
               description: t('toasts.file_type'),
               status: 'error',
               isClosable: true
            })
         }
      },
      onSuccess: (res) => {
         setIsopen(false)
         setInputMessageValue('')
         setMessagesArr([res.data, ...messagesArr])
         setSelectedFile(null)
      }
   })

   const handleSelectFile = (e) => {
      const file = e.target.files[0]
      setSelectedFile(file)
   }

   const handleUpload = async () => {
      if (inputMessageValue.length === 0 || !selectedFile) {
         toast({
            title: t('error'),
            position: 'top',
            description: t('toasts.message_file'),
            status: 'error',
            isClosable: true
         })
         return
      }

      const data = new FormData()
      data.append('attachment', selectedFile)
      data.append('message', inputMessageValue)
      mutate(data)
   }

   return (
      <>
         <button
            onClick={() => setIsopen(true)}
            className="h-full ml-7 text-gray-base"
            type="button">
            <GrAttachment className="text-gray-base text-lg" />
         </button>

         <Modal isOpen={isOpen} onClose={() => setIsopen(false)}>
            <ModalOverlay />
            <MdOutlineArrowBackIos
               onClick={() => setIsopen(false)}
               fontWeight="800"
               className="text-4xl text-gray-base pt-4 pl-4"
            />
            <ModalContent rounded="lg" bgColor="white" marginTop="24">
               <ModalBody className="">
                  <div className="flex flex-col gap-3 pt-5 items-center">
                     <Box
                        alignItems="flex-start"
                        className="w-full h-full flex justify-evenly whitespace-normal">
                        <label
                           className="w-full h-14"
                           htmlFor="contained-button-file">
                           <input
                              onChange={handleSelectFile}
                              ref={fileRef}
                              type="file"
                              hidden
                           />
                           {!selectedFile && (
                              <Button
                                 rightIcon={
                                    <AiOutlineUpload className="text-2xl" />
                                 }
                                 h={14}
                                 onClick={() => fileRef.current.click()}
                                 component="span">
                                 {t('chat.upload.btn')}
                              </Button>
                           )}
                           {selectedFile && (
                              <div className="flex items-center justify-between">
                                 <Text className="font-light text-sm text-gray-base">
                                    {selectedFile.name}
                                 </Text>
                                 <AiFillDelete
                                    onClick={() => setSelectedFile(null)}
                                    className="text-2xl text-red-600 cursor-pointer"
                                 />
                              </div>
                           )}
                        </label>
                     </Box>
                     {/* <TagsInput /> */}
                     <div className="relative bg-gray-light flex-row items-center flex w-full h-14 md:h-12 rounded-lg">
                        <input
                           onChange={(e) =>
                              setInputMessageValue(e.target.value)
                           }
                           value={inputMessageValue}
                           className="h-full ml-4 w-3/4 bg-transparent rounded-lg outline-none sm:w-2/3 md:text-sm text-gray-base"
                           placeholder={t('chat.type_message')}
                           variant="unstyled"
                        />
                     </div>
                  </div>
               </ModalBody>
               <ModalFooter alignItems="flex-start" className="flex gap-4">
                  <Button
                     justifyContent="space-between"
                     rightIcon={<MdKeyboardArrowRight className="text-2xl" />}
                     onClick={handleUpload}
                     variant="solid"
                     disabled={isLoading}
                     isLoading={isLoading}
                     loadingText={t('chat.upload.uploading')}
                     spinnerPlacement="end">
                     {t('chat.upload.upload')}
                  </Button>
                  <Button
                     justifyContent="space-between"
                     rightIcon={<MdKeyboardArrowRight className="text-2xl" />}
                     height="14"
                     onClick={() => setIsopen(false)}
                     w="full"
                     variant="fade"
                     rounded="lg">
                     {t('chat.upload.cancel')}
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   )
}
