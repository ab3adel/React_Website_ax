import React from 'react'
import { BsEmojiSmile } from 'react-icons/bs'

import { Picker } from 'emoji-mart'

import 'emoji-mart/css/emoji-mart.css'
import useComponentVisible from 'Hooks/useClickOutsid'

export function EmojiPicker({ handleSendEmoji }) {
   const { ref, isComponentVisible, setIsComponentVisible } =
      useComponentVisible(false)

   return (
      <>
         <BsEmojiSmile
            className="text-dark cursor-pointer hover:text-primary transition-all text-2xl ml-6"
            onClick={() => setIsComponentVisible(!isComponentVisible)}
         />
         {isComponentVisible && (
            <div ref={ref}>
               <Picker
                  showPreview={false}
                  emojiSize={32}
                  style={{
                     position: 'absolute',
                     bottom: '65px',
                     width: '300px'
                  }}
                  onSelect={handleSendEmoji}
                  set="apple"
                  title={false}
               />
            </div>
         )}
      </>
   )
}
