import { Skeleton, SkeletonCircle } from '@chakra-ui/react'
import React from 'react'

function SkeletonsCards() {
   return (
      <div className="flex flex-col gap-4">
         <div className="py-4 px-5 justify-between w-full flex h-28 items-center bg-white rounded-lg cursor-pointer">
            <SkeletonCircle endColor="gray.200" className="" size="12" />
            <div className="w-[80%] flex flex-col gap-5 h-full justify-center">
               <Skeleton endColor="gray.200" height="5px" />
               <Skeleton endColor="gray.200" height="5px" />
               <Skeleton endColor="gray.200" height="5px" />
            </div>
         </div>
         <div className="py-4 px-5 justify-between w-full flex h-28 items-center bg-white rounded-lg cursor-pointer">
            <SkeletonCircle endColor="gray.200" className="" size="12" />
            <div className="w-[80%] flex flex-col gap-5 h-full justify-center">
               <Skeleton endColor="gray.200" height="5px" />
               <Skeleton endColor="gray.200" height="5px" />
               <Skeleton endColor="gray.200" height="5px" />
            </div>
         </div>
         <div className="py-4 px-5 justify-between w-full flex h-28 items-center bg-white rounded-lg cursor-pointer">
            <SkeletonCircle endColor="gray.200" className="" size="12" />
            <div className="w-[80%] flex flex-col gap-5 h-full justify-center">
               <Skeleton endColor="gray.200" height="5px" />
               <Skeleton endColor="gray.200" height="5px" />
               <Skeleton endColor="gray.200" height="5px" />
            </div>
         </div>
         <div className="py-4 px-5 justify-between w-full flex h-28 items-center bg-white rounded-lg cursor-pointer">
            <SkeletonCircle endColor="gray.200" className="" size="12" />
            <div className="w-[80%] flex flex-col gap-5 h-full justify-center">
               <Skeleton endColor="gray.200" height="5px" />
               <Skeleton endColor="gray.200" height="5px" />
               <Skeleton endColor="gray.200" height="5px" />
            </div>
         </div>
         <div className="py-4 px-5 justify-between w-full flex h-28 items-center bg-white rounded-lg cursor-pointer">
            <SkeletonCircle endColor="gray.200" className="" size="12" />
            <div className="w-[80%] flex flex-col gap-5 h-full justify-center">
               <Skeleton endColor="gray.200" height="5px" />
               <Skeleton endColor="gray.200" height="5px" />
               <Skeleton endColor="gray.200" height="5px" />
            </div>
         </div>
         <div className="py-4 px-5 justify-between w-full flex h-28 items-center bg-white rounded-lg cursor-pointer">
            <SkeletonCircle endColor="gray.200" className="" size="12" />
            <div className="w-[80%] flex flex-col gap-5 h-full justify-center">
               <Skeleton endColor="gray.200" height="5px" />
               <Skeleton endColor="gray.200" height="5px" />
               <Skeleton endColor="gray.200" height="5px" />
            </div>
         </div>
         <div className="py-4 px-5 justify-between w-full flex h-28 items-center bg-white rounded-lg cursor-pointer">
            <SkeletonCircle endColor="gray.200" className="" size="12" />
            <div className="w-[80%] flex flex-col gap-5 h-full justify-center">
               <Skeleton endColor="gray.200" height="5px" />
               <Skeleton endColor="gray.200" height="5px" />
               <Skeleton endColor="gray.200" height="5px" />
            </div>
         </div>
      </div>
   )
}

export default SkeletonsCards
