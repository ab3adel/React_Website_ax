/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Avatar, Stack, VStack } from '@chakra-ui/react'
import { BsFillCameraVideoFill } from 'react-icons/bs'
import { useRecoilState } from 'recoil'
import { showConfrenceWindowAtom, zoomMeetingIdAtom } from 'Recoil/Atoms'
import { useSelectCommunity } from 'Hooks/useSelectCommunity'

function ConfrenceCard({ date, name, past, zoom_meeting_id, id }) {
   const [, setShowConfrenceWindow] = useRecoilState(showConfrenceWindowAtom)
   const { handleSelectCommunity, urlParamId } = useSelectCommunity()
   const [, setMeetId] = useRecoilState(zoomMeetingIdAtom)
   return (
      <div
         onClick={() => {
            handleSelectCommunity(id, name, 0)
            setShowConfrenceWindow(true)
            setMeetId(zoom_meeting_id)
         }}
         className={`mb-3.5 ${
            past ? 'opacity-50' : 'cursor-pointer active:bg-rose-50'
         } ${
            urlParamId === id ? 'bg-red-50' : 'bg-white'
         } transition-all w-full flex justify-between bg-white rounded-lg h-fit p-5 `}>
         <Stack
            pl="20px"
            justifyContent="flex-start"
            alignItems="center"
            direction="row">
            <div className="relative mr-3">
               <Avatar
                  backgroundColor="gray.200"
                  icon={
                     <BsFillCameraVideoFill className="text-3xl text-gray-base" />
                  }
               />
            </div>
            <VStack alignItems="flex-start">
               <p className="font-bold text-base text-black">{name}</p>

               <p className="text-gray-dark text-base font-normal">{date}</p>
            </VStack>
         </Stack>
      </div>
   )
}

export default ConfrenceCard
