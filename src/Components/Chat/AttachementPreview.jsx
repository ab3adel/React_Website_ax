/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Image, Spinner } from '@chakra-ui/react'
import { BsDownload } from 'react-icons/bs'
import PDFfile from 'Assets/PDFfile.svg'
import { useApiRequests } from 'API/apiRequests'
import fileDownload from 'js-file-download'
import { useState } from 'react'
import { AiFillFilePpt } from 'react-icons/ai'
import { RiFileDamageLine } from 'react-icons/ri'

import { AttachementPreviewPopup } from 'Components/Modal/AttachementPreviewPopup'

export function AttachementPreview({ attachment }) {
   const { downloadFile } = useApiRequests()

   const [isLoading, setIsLoading] = useState(false)

   const [popupIsOpen, setPopupIsopen] = useState(false)

   /* It downloads a file from a server, and then saves it to the user's computer. */
   const handleDownloadFile = async (fileId, name) => {
      setIsLoading(true)
      const res = await downloadFile(fileId)
      fileDownload(res.data, name)
      setIsLoading(false)
   }

   return (
      <>
         <AttachementPreviewPopup
            id={attachment._id}
            type={attachment.file_type}
            name={attachment.name}
            popupIsOpen={popupIsOpen}
            setPopupIsopen={setPopupIsopen}
         />

         <div className=" mb-1 rounded-md cursor-pointer p-2 bg-[#00000024] flex items-center">
            {attachment.file_type === 'Image' && (
               <Image
                  onClick={() => setPopupIsopen(true)}
                  objectFit="contain"
                  fallback={
                     <div className="text-lg flex-1 flex items-center">
                        <RiFileDamageLine />
                     </div>
                  }
                  className="w-24 h-24"
                  alt="file"
                  src={attachment.url}
               />
            )}
            {attachment.file_type === 'PDF' && (
               <img
                  onKeyPress={() => setPopupIsopen(true)}
                  onClick={() => setPopupIsopen(true)}
                  className="w-10 h-10"
                  alt="file"
                  src={PDFfile}
               />
            )}
            {attachment.file_type === 'PPT' && (
               <AiFillFilePpt className=" text-white w-10 h-10" />
            )}
            <span className=" px-2 text-xs flex gap-10 items-center md:text-sm sm:text-xs pb-1">
               {isLoading ? (
                  <Spinner />
               ) : (
                  <BsDownload
                     className="text-xl"
                     onClick={() =>
                        handleDownloadFile(attachment._id, attachment.name)
                     }
                  />
               )}
            </span>
         </div>
      </>
   )
}
