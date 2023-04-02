import LoadingPage from 'Components/LoadingPage'
import { useActivationQuery } from 'Hooks/queries/useActivationQuery'
import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

function Activation() {
   const [searchParams] = useSearchParams()

   const { mutate } = useActivationQuery()

   useEffect(() => {
      mutate({ code: searchParams.get('code') })
   }, [])

   return <LoadingPage />
}

export default Activation
