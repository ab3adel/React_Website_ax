/* eslint-disable no-shadow */
import React, { useCallback, useState } from 'react'

import ChakraTagInput from '../ChakraTagInput/Index'

export default function TagsInput() {
   const [tags, setTags] = useState([])
   const handleTagsChange = useCallback((event, tags) => {
      setTags(tags)
   }, [])
   return (
      <ChakraTagInput
         wrapProps={{ direction: 'column' }}
         className="my-6"
         tags={tags}
         onTagsChange={handleTagsChange}
      />
   )
}
