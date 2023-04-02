import { Skeleton } from '@chakra-ui/react'

export function SkeletonMenus() {
   return (
      <div className="pb-3 flex flex-col gap-5 mt-3">
         <Skeleton endColor="gray.200" rounded="lg" height="60px" />
         <Skeleton endColor="gray.200" rounded="lg" height="60px" />
         <Skeleton endColor="gray.200" rounded="lg" height="60px" />
         <Skeleton endColor="gray.200" rounded="lg" height="60px" />
         <Skeleton endColor="gray.200" rounded="lg" height="60px" />
         <Skeleton endColor="gray.200" rounded="lg" height="60px" />
         <Skeleton endColor="gray.200" rounded="lg" height="60px" />
         <Skeleton endColor="gray.200" rounded="lg" height="60px" />
         <Skeleton endColor="gray.200" rounded="lg" height="60px" />
         <Skeleton endColor="gray.200" rounded="lg" height="60px" />
      </div>
   )
}
