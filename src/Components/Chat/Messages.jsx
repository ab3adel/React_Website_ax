import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import noData from 'Assets/NoData.svg'
import { useGetCommunityConversation } from 'Hooks/useGetCommunityConversation'
import RecivedMessageBubble from './RecivedMessageBubble'
import { MessagesLoader } from './MessagesLoader'

function Messages() {
   const { messagesArr, isLoading, fetchMoreData, hasMoreMessages } =
      useGetCommunityConversation()

   return (
      <div
         id="scrollableDiv"
         className=" md:p-3 w-[103%] md:w-full pr-7 sm:px-1 md:pr-3 relative overflow-auto  flex flex-col-reverse  h-full">
         {messagesArr.length === 0 && !isLoading ? (
            <div className="w-full flex flex-col gap-8 justify-center items-center h-screen">
               <img className="w-2/4" alt="NoCommunities" src={noData} />
               <h1 className="text-gray-base font-normal text-xl">
                  No messages, send one to start the converstion
               </h1>
            </div>
         ) : (
            <InfiniteScroll
               dataLength={messagesArr.length}
               next={fetchMoreData}
               style={{
                  display: 'flex',
                  flexDirection: 'column-reverse'
               }}
               inverse
               endMessage={
                  <p style={{ textAlign: 'center', height: '20px' }} />
               }
               hasMore={hasMoreMessages}
               loader={
                  <MessagesLoader
                     isLoading={isLoading}
                     messagesArrLength={messagesArr.length}
                  />
               }
               scrollableTarget="scrollableDiv">
               {messagesArr.map(
                  (
                     {
                        message,
                        is_owner,
                        sent_at,
                        _id,
                        attachment,
                        user,
                        in_replay_to,
                        message_date,
                        message_time
                     },
                     i
                  ) => (
                     <RecivedMessageBubble
                        in_replay_to={in_replay_to}
                        message_date={message_date}
                        nextMessageIndex={messagesArr[i - 1]?.user?._id}
                        prevMessage={messagesArr[i + 1]}
                        key={_id}
                        id={_id}
                        attachment={attachment}
                        message_time={message_time}
                        user={user}
                        message={message}
                        is_owner={is_owner}
                        sent_at={sent_at}
                     />
                  )
               )}
            </InfiniteScroll>
         )}
      </div>
   )
}

export default Messages
