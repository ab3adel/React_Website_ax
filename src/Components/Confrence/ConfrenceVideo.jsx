/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */
import React, { useEffect } from 'react'
import ZoomMtgEmbedded from '@zoomus/websdk/embedded'
import { Button } from '@chakra-ui/react'
import { useApiRequests } from 'API/apiRequests'
import { userInfoAtom, zoomWindowAtom } from 'Recoil/Atoms'
import { useRecoilState } from 'recoil'

export function ConfrenceVideo() {
   const client = ZoomMtgEmbedded.createClient()
   const [userInfo] = useRecoilState(userInfoAtom)
   const [zoomWindowVisable, setIsZoomWindowVisable] =
      useRecoilState(zoomWindowAtom)
   const { getZomeSign } = useApiRequests()
   const sdkKey = 'tUM8zLbtivrn7h7PnyydOSN5unwW84CEi5Q7'
   const meetingNumber = '83990432766'
   // const role = 0
   const userName = userInfo.first_name + userInfo.last_name
   const userEmail = userInfo.email
   const passWord = ''
   const registrantToken = ''

   const leaveMeeting = () => {
      setIsZoomWindowVisable(false)
      client.leaveMeeting()
      window.location.reload()
   }

   useEffect(() => {
      if (zoomWindowVisable) {
         setInterval(() => {
            const leaveBtn = document.querySelector('[title="Leave"]')
            if (leaveBtn) {
               leaveBtn.addEventListener('click', leaveMeeting)
            }
            const zoomWindow =
               document.getElementsByClassName('react-draggable')
            if (zoomWindow.length === 0) {
               window.location.reload()
            }
         }, 1000)
      }
   })
   function startMeeting(signature) {
      const meetingSDKElement = document.getElementById('meetingSDKElement')

      client.init({
         debug: true,
         zoomAppRoot: meetingSDKElement,
         language: 'en-US',
         customize: {
            meetingInfo: [
               'topic',
               'host',
               'mn',
               'pwd',
               'telPwd',
               'invite',
               'participant',
               'dc',
               'enctype'
            ],
            video: {
               viewSizes: {
                  ribbon: {
                     width: 500,
                     height: 200
                  },
                  default: {
                     width: 500,
                     height: 200
                  }
               }
            }
         }
      })
      client.join({
         sdkKey,
         signature,
         meetingNumber,
         password: passWord,
         userName,
         userEmail,
         tk: registrantToken
      })
   }

   async function getSignature() {
      const res = await getZomeSign()
      setIsZoomWindowVisable(true)
      startMeeting(res.data.signature)
   }

   return (
      <div className="App">
         <main>
            {!zoomWindowVisable ? (
               <Button
                  id="join-btn"
                  mx="auto"
                  variant="solid"
                  w="3xs"
                  onClick={getSignature}>
                  Join Zoom Meeting
               </Button>
            ) : (
               <div className="flex justify-center items-center">
                  <h3 className="text-green-400">Zoom Confrence is On</h3>
                  {/* <Button
                     className="absolute"
                     onClick={() => {
                        setMeetStarted(false)
                        client.leaveMeeting()
                        window.location.reload()
                     }}>
                     leave
                  </Button> */}
               </div>
            )}
         </main>
      </div>
   )
}
