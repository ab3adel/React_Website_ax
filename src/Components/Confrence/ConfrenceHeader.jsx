import React from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import { BsFillCameraVideoFill } from 'react-icons/bs'
import { Avatar, Button } from '@chakra-ui/react'
import { useRecoilState } from 'recoil'
import { selectedCommunityName } from 'Recoil/Atoms'
import { useZoomConfrenceApi } from 'Hooks/useZoomConfrenceApi'

export function ConfrenceHeader({ openDrawer }) {
   const [communityName] = useRecoilState(selectedCommunityName)
   const { getSignature, zoomWindowVisable } = useZoomConfrenceApi()

   return (
      <div className="h-[7vh]">
         <div
            className="flex items-center py-2 h-full md:pl-14 md:py-2 pr-3
                 border-b bg-white border-opacity-40 border-gray-300">
            <Avatar
               backgroundColor="gray.200"
               icon={
                  <BsFillCameraVideoFill className="text-3xl text-gray-base" />
               }
            />
            <div className=" flex-column w-full pl-7 sm:pl-3">
               <h5 className="text-base  md:text-lg sm:text-sm font-bold">
                  {communityName.name}
               </h5>
            </div>
            {zoomWindowVisable ? (
               <div className="rounded-full bg-green-500 mx-5 p-2" />
            ) : (
               <button
                  type="button"
                  id="join-btn"
                  mx="20px"
                  w="220px"
                  variant="solid"
                  height="40px"
                  className="sm:text-xs text-sm bg-primary rounded-lg active:bg-rose-400 transition-all text-white mx-4 w-56 sm:w-40 h-10"
                  onClick={getSignature}>
                  Join Zoom Meeting
               </button>
            )}

            <button type="submit" onClick={openDrawer}>
               <HiDotsHorizontal className="text-3xl md:text-2xl text-primary" />
            </button>
         </div>
      </div>
   )
}
