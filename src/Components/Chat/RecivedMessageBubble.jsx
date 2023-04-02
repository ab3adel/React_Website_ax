import {
   Avatar,
   Box,
   Menu,
   MenuButton,
   MenuItem,
   MenuList
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { useRecoilState } from 'recoil'
import { repliedMessageAtom } from 'Recoil/Atoms'
import { formatedDate } from 'Utils/helperFunctions'
import { AttachementPreview } from './AttachementPreview'

function RecivedMessageBubble({
   message,
   message_date,
   is_owner,
   prevMessage,
   user,
   attachment,
   id,
   nextMessageIndex,
   message_time,
   in_replay_to
}) {
   const [, setRepliedMessage] = useRecoilState(repliedMessageAtom)

   return (
      <Box
         as={motion.div}
         initial={{ opacity: 0 }}
         exit={{ opacity: 0 }}
         animate={{ opacity: 1 }}>
         {message_date !== prevMessage?.message_date && (
            <div className="w-full flex justify-center">
               <span className="bg-white border-2 border-gray-base px-2 py-1 text-xs my-5 rounded-full text-gray-base">
                  {formatedDate(message_date)}
               </span>
            </div>
         )}

         <div
            className={`flex w-full mb-1 md:mb-2 sm:mb-3  ${
               is_owner === 1 ? 'flex-row-reverse' : ''
            } `}>
            {is_owner === 0 && nextMessageIndex !== user._id && (
               <Avatar
                  width={10}
                  h={10}
                  name={user.first_name + user.last_name}
                  className="self-start"
               />
            )}

            {is_owner === 0 && nextMessageIndex === user._id && (
               <div className="w-[42px] h-[42px]" />
            )}

            <div
               className={`flex flex-col ${
                  is_owner === 1 ? 'items-end' : ''
               }  mx-2`}>
               <div
                  className={`flex ${
                     is_owner === 1 ? 'justify-start flex-row-reverse' : ''
                  }`}>
                  <div
                     className={`${
                        is_owner === 1
                           ? 'bg-primary text-white'
                           : 'bg-gray-lightest text-gray-600'
                     } rounded-lg w-fit max-w-[350px] min-w-[100px] md:max-w-[200px] shadow-sm md:mb-1 flex flex-col gap-0 pt-1 pb-0 px-[8px] `}>
                     {is_owner === 0 && nextMessageIndex !== user._id && (
                        <span
                           className={`${
                              is_owner === 1 ? 'text-white' : 'text-gray-500'
                           } text-sm font-semibold`}>
                           {user.first_name} {user.last_name}
                        </span>
                     )}

                     {in_replay_to && (
                        <div className="border-l-4 mb-1 rounded-md bg-[#00000024] flex flex-col opacity-90">
                           <span
                              className={`${
                                 is_owner === 1 ? 'text-white' : 'text-gray-500'
                              } pt-1 px-2 text-xs font-semibold`}>
                              {in_replay_to.user.first_name}
                              {in_replay_to.user.last_name}
                           </span>
                           <span className=" px-2 text-xs md:text-sm sm:text-xs pb-1">
                              {in_replay_to.message}
                           </span>
                        </div>
                     )}
                     
                     {attachment && attachment.file && (
                        <AttachementPreview attachment={attachment} />
                     )}

                     <span className="md:text-sm sm:text-xs">{message}</span>
                     <p className="text-2xs self-end sm:text-2xs md:mt-0 sm:mt-0 mt-1 text-gray-300">
                        {message_time}
                     </p>
                  </div>
                  <Menu offset={[0, -50]}>
                     <MenuButton>
                        <BiDotsVerticalRounded className="text-gray-base text-lg" />
                     </MenuButton>
                     <MenuList maxWidth="140px" minWidth="140px">
                        <MenuItem
                           onClick={() => setRepliedMessage({ message, id })}>
                           Reply
                        </MenuItem>
                     </MenuList>
                  </Menu>
               </div>
            </div>
         </div>
      </Box>
   )
}
export default RecivedMessageBubble
