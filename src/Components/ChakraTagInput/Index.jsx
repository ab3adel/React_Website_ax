/* eslint-disable react/no-array-index-key */
import React, { forwardRef, useCallback } from 'react'
import { Input, Wrap, WrapItem } from '@chakra-ui/react'

import { maybeCall } from './maybe'
import ChakraTagInputTag from './Tag'

export default forwardRef(
   ({
      tags = [],
      onTagsChange,
      onTagAdd,
      onTagRemove,
      vertical = false,
      addKeys = ['Enter'],
      wrapProps,
      wrapItemProps,
      tagProps,
      tagLabelProps,
      tagCloseButtonProps,
      ...props
   }) => {
      const addTag = useCallback(
         (event, tag) => {
            onTagAdd?.(event, tag)
            if (event.isDefaultPrevented()) return

            onTagsChange?.(event, tags.concat([tag]))
         },
         [tags, onTagsChange, onTagAdd]
      )
      const removeTag = useCallback(
         (event, index) => {
            onTagRemove?.(event, index)
            if (event.isDefaultPrevented()) return

            onTagsChange?.(event, [
               ...tags.slice(0, index),
               ...tags.slice(index + 1)
            ])
         },
         [tags, onTagsChange, onTagRemove]
      )
      const handleRemoveTag = useCallback(
         (index) => (event) => {
            removeTag(event, index)
         },
         [removeTag]
      )
      const { onKeyDown } = props
      const handleKeyDown = useCallback(
         (event) => {
            onKeyDown?.(event)

            if (event.isDefaultPrevented()) return
            if (event.isPropagationStopped()) return

            const { currentTarget, key } = event
            const { selectionStart, selectionEnd } = currentTarget
            if (addKeys.indexOf(key) > -1 && currentTarget.value) {
               addTag(event, currentTarget.value)
               if (!event.isDefaultPrevented()) {
                  currentTarget.value = ''
               }
               event.preventDefault()
            } else if (
               key === 'Backspace' &&
               tags.length > 0 &&
               selectionStart === 0 &&
               selectionEnd === 0
            ) {
               removeTag(event, tags.length - 1)
            }
         },
         [addKeys, tags.length, addTag, removeTag, onKeyDown]
      )

      return (
         <Wrap w="100%" {...wrapProps}>
            <div className="flex w-full gap-1 flex-wrap">
               {tags.map((tag, index) => (
                  <WrapItem
                     className="flex "
                     {...maybeCall(wrapItemProps, false, index)}
                     key={index}>
                     <ChakraTagInputTag
                        onRemove={handleRemoveTag(index)}
                        tagLabelProps={maybeCall(tagLabelProps, tag, index)}
                        tagCloseButtonProps={maybeCall(
                           tagCloseButtonProps,
                           tag,
                           index
                        )}
                        colorScheme={props.colorScheme}
                        size={props.size}
                        {...maybeCall(tagProps, tag, index)}>
                        {tag}
                     </ChakraTagInputTag>
                  </WrapItem>
               ))}
            </div>
            <WrapItem
               w="100%"
               m={0}
               flexGrow={1}
               {...maybeCall(wrapItemProps, true, tags.length)}>
               <Input
                  my={0}
                  variant="filled"
                  w="98%"
                  placeholder="Select tag"
                  {...props}
                  onKeyDown={handleKeyDown}
               />
            </WrapItem>
         </Wrap>
      )
   }
)
