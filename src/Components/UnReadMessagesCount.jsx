/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { recievedMessagesCountAtom, selectedCommunityId } from 'Recoil/Atoms'

export function UnReadMessagesCount({ communityId }) {
   const [recievedMessagesCount, setRecievedMessagesCount] = useRecoilState(
      recievedMessagesCountAtom
   )
   const [messagesCount, setMessagesCount] = useState()
   
   const [globalCommunityId] = useRecoilState(selectedCommunityId)

   useEffect(() => {
      /* Counting the number of messages for a particular community. */
      let count = 0
      recievedMessagesCount.forEach(({ id }) => {
         if (id === communityId) {
            count += 1
         }
      })
      setMessagesCount(count)
   }, [recievedMessagesCount.length])

   useEffect(() => {
      /* Removing the communityId from the recievedMessagesCount array. */
      if (communityId === globalCommunityId) {
         const updatedArr = recievedMessagesCount.filter(
            ({ id }) => id !== communityId
         )
         setRecievedMessagesCount(updatedArr)
         setMessagesCount(0)
      }
   }, [globalCommunityId])

   return (
      <>
         {messagesCount > 0 && globalCommunityId !== communityId && (
            <div className="rounded-2xl bg-primary w-7 h-5 px-1 py-1 flex justify-center items-center text-white">
               {messagesCount}
            </div>
         )}
      </>
   )
}
