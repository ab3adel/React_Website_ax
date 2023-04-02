import { Box, Button, FormControl, Input, Stack, Text } from '@chakra-ui/react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { useState } from 'react'

import Navbar from 'Layout/Navbar/Navbar'
import Footer from 'Layout/Footer/Footer'
import { useForgetPasswordQuery } from 'Hooks/queries/useForgetPasswordQuery'
import { useTranslation } from 'react-i18next'

function Login() {
   const { t } = useTranslation('common')

   const [email, setEmail] = useState('')

   const { isLoading, mutate } = useForgetPasswordQuery()

   const onSubmit = () => {
      mutate({ email })
   }

   return (
      <Box className="flex flex-col justify-center overflow-x-hidden">
         <Navbar />
         <Box
            bgColor="gray-lightest"
            className="flex h-[65vh] flex-col justify-center items-center py-20 pb-44">
            <Text className="font-extrabold pb-8 text-2xl">
               {t('forget_password.title')}
            </Text>
            <Stack className="w-1/4 md:w-3/4">
               <FormControl>
                  <Input
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     type="email"
                     name="email"
                     className="font-medium py-4"
                     variant="filled"
                     placeholder={t('register.email')}
                  />
                  <Box className="flex justify-between pt-4" spacing={3}>
                     <Button
                        justifyContent="space-between"
                        rightIcon={
                           <MdKeyboardArrowRight className="text-2xl" />
                        }
                        variant="solid"
                        rounded="lg"
                        onClick={onSubmit}
                        isLoading={isLoading}
                        loadingText={t('register.sending')}
                        spinnerPlacement="end"
                        type="submit">
                        {t('forget_password.btn')}
                     </Button>
                  </Box>
               </FormControl>
            </Stack>
         </Box>
         <Footer />
      </Box>
   )
}

export default Login
