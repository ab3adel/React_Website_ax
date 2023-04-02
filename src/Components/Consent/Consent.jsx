import React from 'react'
import { Box, Button, Text, useToast } from '@chakra-ui/react'
import Api from 'API/apiRequests'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Consent() {
   const toast = useToast()

   const navigate = useNavigate()
   
   const { t } = useTranslation('common')

   const { isLoading, mutate } = useMutation(Api.consent, {
      onError: (error) => {
         toast({
            title: t('error'),
            position: 'top',
            description: error.response.data.error.data.errors.detail,
            status: 'error',
            isClosable: true
         })
      },
      onSuccess: () => {
         navigate('/explore')
      }
   })

   const handleAccept = () => {
      mutate({ device_name: 'web' })
   }

   return (
      <Box className="w-2/4 md:w-full flex min-h-fit w-full h-[32rem] md:h-full md:flex-col md:items-center ">
         <Box className="bg-primary text-white md:w-4/5 p-6 rounded-l-lg h-full w-2/5 flex flex-col justify-between">
            <Text className="text-lg">Community</Text>
            <Box>
               <Text className="text-3xl py-4">
                  Aggiornammento privacy policy
               </Text>
               <Text className="font-extralight text-md">
                  Per poter accedere a Community App devi confermare la nuova
                  policy per li trattamento dei dati.
               </Text>
            </Box>
            <Text className="text-sm font-extralight">
               Se hai problemi ad accedere, prova a pulire la memoria del sito
               cliccando su questo testo.
            </Text>
         </Box>
         <Box className="bg-white p-6 w-6/12 md:w-4/5 flex flex-col rounded-r-lg justify-between">
            <Text className="text-lg text-black font-semibold">
               Privacy Policy Community
            </Text>
            <Text className="text-sm font-xs text-black">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
               elementum tortor purus, at viverra nulla aliquet tempus. Nunc
               volutpat, dolor quis ultrices porta, tortor libero consequat
               libero, quis elementum lorem magna ac neque. Pellentesque vel
               aliquam risus, ac dapibus nisl. Proin vel dolor sit amet mauris
               pellentesque egestas. Suspendisse et commodo sapien. Aenean vitae
               nulla a purus accumsan congue et eu velit. Quisque quis maximus
               magna. Morbi ante leo, condimentum ac lectus ac, rhoncus commodo
               arcu. Donec id luctus velit, vel rutrum libero. Proin efficitur
               orci eget venenatis elementum. Cras lorem neque, faucibus vel
               metus ac, faucibus imperdiet augue. Aenean mollis consequat arcu
               sit amet cursus. Suspendisse potenti. Aenean imperdiet ornare
               sem, vitae tempor est consectetur ut. Etiam quis hendrerit metus.
               Aenean egestas finibus porta.
            </Text>
            <Box className="w-5/12 self-center">
               <Button
                  justifyContent="space-between"
                  rightIcon={<MdKeyboardArrowRight className="text-2xl" />}
                  variant="solid"
                  isLoading={isLoading}
                  onClick={handleAccept}
                  loadingText="Loading"
                  spinnerPlacement="end"
                  type="submit">
                  Accetto
               </Button>
            </Box>
         </Box>
      </Box>
   )
}

export default Consent
