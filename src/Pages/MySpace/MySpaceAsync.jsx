import LoadingPage from 'Components/LoadingPage'
import React, { lazy, Suspense } from 'react'

const MySpace = lazy(() => import('./MySpace'))

function MySpaceAsync() {
   return (
      <Suspense fallback={<LoadingPage />}>
         <MySpace />
      </Suspense>
   )
}

export default MySpaceAsync
