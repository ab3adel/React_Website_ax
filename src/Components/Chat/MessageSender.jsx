import { useRecoilState } from 'recoil'
import { RiSendPlaneFill } from 'react-icons/ri'
import { messagesArrAtom, repliedMessageAtom } from 'Recoil/Atoms'
import { TiDelete } from 'react-icons/ti'
import { useMutation, useQueryClient } from 'react-query'
import { useApiRequests } from 'API/apiRequests'
import { useState } from 'react'
import { Spinner } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import UploadFile from './UploadFile'
import { EmojiPicker } from './EmojiPicker'

function MessageSender() {
   const { t } = useTranslation('common')

   const { sendMessage } = useApiRequests()

   const [repliedMessage, setrepliedMessage] =
      useRecoilState(repliedMessageAtom)

   const [messagesArr, setMessagesArr] = useRecoilState(messagesArrAtom)

   const [inputMessageValue, setInputMessageValue] = useState('')

   const queryClient = useQueryClient()

   const { mutate, isLoading } = useMutation(sendMessage, {
      /* Resetting the state of the component. */
      onSuccess: (res) => {
         queryClient.invalidateQueries('user-communities')
         setInputMessageValue('')
         const newMessage = res.data

         /* Scrolling to the bottom of the div. */
         const x = document.getElementById('scrollableDiv')
         x.scrollTop = x.scrollHeight

         setMessagesArr([newMessage, ...messagesArr])
         setrepliedMessage(null)
      }
   })

   /**
    * If the inputMessageValue is empty, then return, otherwise mutate the message.
    * @returns The mutate function is being returned.
    */
   const handleSend = (e) => {
      e.preventDefault()
      if (inputMessageValue.length === 0) return
      mutate({
         replay_to: repliedMessage?.id || null,
         message: inputMessageValue
      })
   }

   /**
    * When the user clicks on an emoji, the emoji will be added to the inputMessageValue state.
    */
   const handleSendEmoji = (emojiObject) => {
      setInputMessageValue((prev) => prev + emojiObject.native)
   }

   return (
      <div className="bg-white flex flex-col p-4 md:pb-0 sm:px-2 sm:py-1 w-full z-0">
         <div className="w-full mx-auto flex flex-col items-center">
            {repliedMessage && (
               <div className="text-gray-dark p-3 sm:p-2 md:text-xs border-x-2 w-full mb-2 flex justify-between items-center">
                  {repliedMessage.message !== null
                     ? repliedMessage.message
                     : 'Attachment'}
                  <TiDelete
                     onClick={() => setrepliedMessage(null)}
                     className="text-red-700 text-2xl cursor-pointer"
                  />
               </div>
            )}

            <div className="relative bg-gray-light flex-row items-center flex w-full h-16 md:h-12 rounded-full">
               <EmojiPicker handleSendEmoji={handleSendEmoji} />

               <UploadFile />

               <form className="w-full">
                  <input
                     className="h-full ml-4 w-11/12 bg-transparent outline-none text-lg sm:w-2/3 md:text-sm text-gray-base"
                     placeholder={t('chat.type_message')}
                     value={inputMessageValue}
                     onChange={(e) => setInputMessageValue(e.target.value)}
                     variant="unstyled"
                  />
                  <button
                     onClick={handleSend}
                     className="h-14 w-14 md:h-10 md:w-10 rounded-full bg-primary active:bg-rose-500 hover:bg-rose-700 transition-all
                        text-white flex justify-center items-center absolute right-2 top-1"
                     type="submit">
                     {isLoading ? (
                        <Spinner />
                     ) : (
                        <RiSendPlaneFill size="30px" className="mr-1 mt-1" />
                     )}
                  </button>
               </form>
            </div>
         </div>
      </div>
   )
}

export default MessageSender
