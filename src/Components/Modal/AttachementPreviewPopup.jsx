import { Button, Flex, Image, Spinner, Tag, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AiFillFilePpt } from 'react-icons/ai'
import { useApiRequests } from 'API/apiRequests'
import { PdfViewer } from 'Components/PdfViewer'
import fileDownload from 'js-file-download'
import Popup from './Popup'

export function AttachementPreviewPopup({
   popupIsOpen,
   setPopupIsopen,
   type,
   name,
   tags,
   id
}) {
   const [previewUrl, setPreviewUrl] = useState()
   const [error, setError] = useState()
   const { previewFile, downloadFile } = useApiRequests()
   const [isLoading, setIsLoading] = useState(false)

   const handleDownloadFile = async (fileId, na) => {
      setIsLoading(true)
      const res = await downloadFile(fileId)
      fileDownload(res.data, na)
      setIsLoading(false)
   }

   const getPreviewUrl = async () => {
      try {
         const res = await previewFile(id)
         setPreviewUrl(res.data)
      } catch (err) {
         setError('No file to show')
      }
   }

   useEffect(() => {
      getPreviewUrl()
   }, [])

   return (
      <Popup
         isOpen={popupIsOpen}
         onOpen={() => setPopupIsopen(true)}
         onClose={() => setPopupIsopen(false)}
         media={
            <>
               {type === 'PDF' && <PdfViewer previewUrl={previewUrl} />}
               {type === 'Image' && (
                  <div className="max-w-[45vw] sm:max-w-[80vw]">
                     <Image
                        fallback={
                           <div className="text-xs flex items-center">
                              {error ? <p>{error}</p> : <Spinner />}
                           </div>
                        }
                        alt="file"
                        src={previewUrl}
                     />
                  </div>
               )}
               {type === 'PPT' && (
                  <AiFillFilePpt className=" text-gray-base" fontSize="200px" />
               )}
            </>
         }
         body={
            <>
               <Flex className="w-full justify-between text-gray-base text-sm sm:text-xs font-medium">
                  <Text>{name}</Text>
               </Flex>
               <Flex className="gap-4 w-full">
                  {tags?.map((tag) => (
                     <Tag
                        key={tag.id}
                        bgColor="gray-light"
                        size="lg"
                        color="rose">
                        {tag.name}
                     </Tag>
                  ))}
               </Flex>
               <Button
                  onClick={() => {
                     handleDownloadFile(id, name)
                  }}
                  isLoading={isLoading}
                  loadingText="Submitting"
                  spinnerPlacement="end"
                  variant="solid">
                  Download
               </Button>
            </>
         }
      />
   )
}
