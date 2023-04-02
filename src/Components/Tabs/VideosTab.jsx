import { useApiRequests } from 'API/apiRequests'
import DetailsCard from 'Components/Cards/DetailsCard'
import { MessagesLoader } from 'Components/Chat/MessagesLoader'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useRecoilState } from 'recoil'
import { selectedCommunityId } from 'Recoil/Atoms'
import noData from 'Assets/NoData.svg'
import { useTranslation } from 'react-i18next'

function VideosTab() {
   const { t } = useTranslation('common')

   const [communityId] = useRecoilState(selectedCommunityId)

   const { getCommunitiesArticles } = useApiRequests()

   const [isLoading, setIsLoading] = useState(false)

   const [pageIndex, setPageIndex] = useState(1)

   const [allArticles, setAllArticles] = useState([])

   const [hasMoreArticles, setHasMoreArticles] = useState(true)

   useEffect(() => {
      setPageIndex(1)
      setHasMoreArticles(true)
      setAllArticles([])
   }, [communityId])

   const fetchMoreData = () => {
      if (!isLoading) {
         if (allArticles.length === 0) {
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
      const res = await getCommunitiesArticles(cId, 7, pdx)
      const videos = res.data.data.filter((article) => article.video !== null)
      if (res.data.data.length === 0 || videos.length === 0) {
         setHasMoreArticles(false)
         setIsLoading(false)
      }
      if (pageIndex === 1) {
         setAllArticles(videos)
      } else {
         setAllArticles([...allArticles, ...videos])
      }
      setIsLoading(false)
   }

   useEffect(() => {
      fetchData(communityId, pageIndex)
   }, [pageIndex, communityId])

   return (
      <div className="h-[77vh] pr-2 pl-3 overflow-auto" id="scrollableDiv">
         {allArticles.length === 0 && !isLoading && (
            <div className="w-full flex flex-col gap-8 justify-center items-center h-1/2">
               <img className="w-2/4" alt="NoCommunities" src={noData} />

               <h1 className="text-gray-base font-normal text-xl">
                  No {t('chat.drawer.article.videos')}!
               </h1>
            </div>
         )}
         <InfiniteScroll
            pageStart={0}
            loadMore={fetchMoreData}
            hasMore={hasMoreArticles}
            useWindow={false}
            loader={
               <MessagesLoader
                  isLoading={isLoading}
                  messagesArrLength={allArticles.length}
               />
            }>
            {allArticles.map((article) => {
               if (article.video) {
                  return <DetailsCard key={article.id} article={article} />
               }
            })}
         </InfiniteScroll>
      </div>
   )
}

export default VideosTab
