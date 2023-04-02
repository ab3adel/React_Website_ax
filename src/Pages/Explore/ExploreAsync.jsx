import LoadingPage from 'Components/LoadingPage'
import React, { lazy, Suspense } from 'react'

const Explore = lazy(() => import('./Explore'))
function ExploreAsync() {
   return (
      <Suspense fallback={<LoadingPage />}>
         <Explore />
      </Suspense>
   )
}

export default ExploreAsync
