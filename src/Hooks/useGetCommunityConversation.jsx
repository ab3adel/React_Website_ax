import { useApiRequests } from 'API/apiRequests'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import {
   messagesArrAtom,
   pageIndexAtom,
   recievedMessagesAtom,
   selectedCommunityId
} from 'Recoil/Atoms'
import { useQueryClient } from 'react-query'

/**
 * It's a hook that fetches messages from the backend and updates the messagesArr state.
 * @returns An object with three properties.
 */
export const useGetCommunityConversation = () => {
   const [communityId] = useRecoilState(selectedCommunityId)

   const [pageIndex, setPageIndex] = useRecoilState(pageIndexAtom)

   const [messagesArr, setMessagesArr] = useRecoilState(messagesArrAtom)

   const { getCommunityMessages } = useApiRequests()

   const [isLoading, setIsLoading] = useState(false)

   const [hasMoreMessages, setHasMoreMessages] = useState(true)

   const [recievedMessage] = useRecoilState(recievedMessagesAtom)

   const queryClient = useQueryClient()

   useEffect(() => {
      /* Resetting the state of the messagesArr, pageIndex, and hasMoreMessages. */
      setPageIndex(1)
      setHasMoreMessages(true)
      setMessagesArr([])

      /* Scrolling to the bottom of the div. */
      const x = document.getElementById('scrollableDiv')
      x.scrollTop = x.scrollHeight
   }, [communityId])

   /**
    * If the messagesArr is empty, set the pageIndex to 1. Otherwise, increment the pageIndex by 1.
    */
   const fetchMoreData = () => {
      if (messagesArr.length === 0) {
         setPageIndex(1)
      } else {
         setPageIndex(pageIndex + 1)
      }
   }

   /* A callback function that is used to update the messagesArr state. */
   const handleRecivedMessages = useCallback((message) => {
      setMessagesArr((prevState) => [message, ...prevState])
   }, [])

   useEffect(() => {
      queryClient.invalidateQueries('user-communities')
      recievedMessage.forEach((message) => {
         if (communityId === message.community_id) {
            handleRecivedMessages(message)
         }
      })
   }, [recievedMessage])

   const fetchMessages = async (cId, pdx) => {
      setIsLoading(true)
      /* Making a request to the backend to get the messages. */
      const res = await getCommunityMessages(cId, 20, pdx)
      if (pageIndex === 1) {
         setHasMoreMessages(true)
         setMessagesArr(res.data.messages.data)
      } else if (res.data.messages.data.length === 0) {
         setHasMoreMessages(false)
      } else {
         setMessagesArr([...messagesArr, ...res.data.messages.data])
      }
      setIsLoading(false)
   }

   useEffect(() => {
      fetchMessages(communityId, pageIndex)
   }, [pageIndex, communityId])

   return { messagesArr, isLoading, fetchMoreData, hasMoreMessages }
}
