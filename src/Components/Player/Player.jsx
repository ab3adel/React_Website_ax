import React from 'react'
import { Player, BigPlayButton, ControlBar } from 'video-react'
import 'video-react/dist/video-react.css'
import 'react-perfect-scrollbar/dist/css/styles.css'

function VideoPlayer() {
   return (
      <Player autoPlay muted>
         <BigPlayButton position="center" />
         <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
         <ControlBar disableDefaultControls />
      </Player>
   )
}

export default VideoPlayer
