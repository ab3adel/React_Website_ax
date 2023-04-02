import { useApiRequests } from 'API/apiRequests'
import FileCard from 'Components/Cards/FileCard'
import { MessagesLoader } from 'Components/Chat/MessagesLoader'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useRecoilState } from 'recoil'
import { selectedCommunityId } from 'Recoil/Atoms'
import noData from 'Assets/NoData.svg'

export function PptFilesTab() {
   const [communityId] = useRecoilState(selectedCommunityId)

   const { getCommunitiesFiles } = useApiRequests()

   const [isLoading, setIsLoading] = useState(false)

   const [pageIndex, setPageIndex] = useState(1)

   const [allPdfs, setAllPdfs] = useState([])

   const [hasMorePdfs, setHasMorePdfs] = useState(true)

   useEffect(() => {
      setPageIndex(1)
      setHasMorePdfs(true)
      setAllPdfs([])
   }, [communityId])

   const fetchMoreData = () => {
      if (!isLoading) {
         if (allPdfs.length === 0) {
            setIsLoading(true)
            setPageIndex(1)
         } else {
            setIsLoading(true)
            setPageIndex(pageIndex + 1)
         }
      }
   }

   const fetchData = async (cId, pdx) => {
      setIsLoading(true)
      const res = await getCommunitiesFiles(cId, 15, pdx)
      if (pageIndex === 1) {
         setAllPdfs(res.data.data)
      }
      if (res.data.data.length === 0) {
         setHasMorePdfs(false)
         setIsLoading(false)
      } else {
         setAllPdfs([...allPdfs, ...res.data.data])
      }
      setIsLoading(false)
   }

   useEffect(() => {
      fetchData(communityId, pageIndex)
   }, [pageIndex, communityId])

   return (
      <div className="h-[76vh] pr-2 pl-3 overflow-auto" id="scrollableDiv">
         {allPdfs.length === 0 && !isLoading && (
            <div className="w-full flex flex-col gap-8 justify-center items-center h-1/2">
               <img className="w-2/4" alt="NoCommunities" src={noData} />

               <h1 className="text-gray-base font-normal text-xl">
                  No Articles !
               </h1>
            </div>
         )}
         <InfiniteScroll
            pageStart={0}
            loadMore={fetchMoreData}
            hasMore={hasMorePdfs}
            useWindow={false}
            loader={
               <MessagesLoader
                  isLoading={isLoading}
                  messagesArrLength={allPdfs.length}
               />
            }>
            {allPdfs.map((file) => {
               if (file.type === 'PPT') {
                  return (
                     <FileCard
                        id={file.id}
                        key={file.id}
                        name={file.name}
                        type={file.type}
                     />
                  )
               }
            })}
         </InfiniteScroll>
      </div>
   )
}
