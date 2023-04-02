import Pusher from 'pusher-js'
import { useCallback, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import {
   activeUsersAtom,
   recievedMessagesAtom,
   recievedMessagesCountAtom,
   userIdAtom,
   vendorIdAtom
} from 'Recoil/Atoms'

export const usePusherChannels = () => {
   const [vendorId] = useRecoilState(vendorIdAtom)

   const [userId] = useRecoilState(userIdAtom)

   const [, setRecievedMessages] = useRecoilState(recievedMessagesAtom)

   const [activeUsers, setActiveUsers] = useRecoilState(activeUsersAtom)

   const [, setRecievedMessagesCount] = useRecoilState(
      recievedMessagesCountAtom
   )

   console.log('channel', activeUsers)

   const { REACT_APP_PUSHER_APP_KEY, REACT_APP_PUSHER_APP_CLUSTER } =
      process.env

   const token = localStorage.getItem('token')

   /* Setting the initial state of the activeUsers and recievedMessagesCount to an empty array. */
   useEffect(() => {
      setActiveUsers([])
      setRecievedMessagesCount([])
   }, [])

   /* A callback function that is used to set the recievedMessages state. */
   const handleRecivedMessages = useCallback((data) => {
      setRecievedMessages([data])
   }, [])

   /* A callback function that is used to set the recievedMessagesCount state. */
   const handleRecivedCount = useCallback((data) => {
      setRecievedMessagesCount((prev) => [
         ...prev,
         {
            id: data.community_id
         }
      ])
   }, [])

   /* Creating a new pusher instance, subscribing to a channels and binding events. */
   useEffect(() => {
      if (token) {
         /* Creating a new pusher instance. */
         const pusher = new Pusher(REACT_APP_PUSHER_APP_KEY, {
            cluster: REACT_APP_PUSHER_APP_CLUSTER,
            forceTLS: true,
            authEndpoint: `${'https://api.axensocenter.com/api/v1/user/pusher-auth'}`,
            auth: {
               headers: {
                  Authorization: `Bearer ${token}`,
                  Accept: 'application/json'
               }
            }
         })

         /* Subscribing to a channel. */
         const chatChannel = pusher.subscribe(`private-user-${vendorId}`)

         /* Listening to the channel for a message. */
         chatChannel.bind('UserMessageSent', (data) => {
            console.log(data)
            const newMessage = data.message
            /* Checking if the user id of the message is not equal to the user id of the user. If it is not
               equal, it sets the is_owner property of the newMessage to 0 */
            if (data.message.user_id !== userId) {
               newMessage.is_owner = 0
               handleRecivedMessages(newMessage)
               handleRecivedCount(newMessage)
            }
         })

         /* Subscribing to a channel. */
         const presenceChannel = pusher.subscribe(
            `presence-vendor-channel-${vendorId}`
         )

         /* Getting the active users on load. */
         presenceChannel.bind(
            'pusher:subscription_succeeded',
            ({ members }) => {
               const activeUsersOnLoad = Object.values(members).map(
                  (member) => member
               )
               setActiveUsers(activeUsersOnLoad)
            }
         )

         /* Adding a new member to the activeUsers array. */
         presenceChannel.bind('pusher:member_added', (member) => {
            setActiveUsers((oldArr) => [...oldArr, member.info])
         })

         /* Removing a member from the activeUsers array. */
         presenceChannel.bind('pusher:member_removed', (member) => {
            const updatedActiveUsers = activeUsers.filter(
               (user) => user.user_id !== member.id
            )
            setActiveUsers(updatedActiveUsers)
         })

         /* Asking the user for permission to send notifications. */
         Notification.requestPermission()
      }
   }, [token])
}
