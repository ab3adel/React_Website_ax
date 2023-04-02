import {
   Button,
   Flex,
   Input,
   InputGroup,
   Text,
   useToast
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { useMutation } from 'react-query'
import { useApiRequests } from 'API/apiRequests'
import { useTranslation } from 'react-i18next'

function SettingsPassword() {
   const [inputValues, setInputValues] = useState({
      old_password: '',
      password: '',
      password_confirmation: ''
   })

   const { t } = useTranslation('common')
   const toast = useToast()

   const { changePassword } = useApiRequests()

   const { mutate, isLoading } = useMutation(changePassword, {
      onSuccess: () => {
         toast({
            title: t('success'),
            position: 'top',
            duration: 1000,
            status: 'success',
            isClosable: true
         })
      },
      onError: (error) => {
         toast({
            title: t('error'),
            position: 'top',
            description: error.response.data.data,
            status: 'error',
            isClosable: true
         })
      }
   })

   const handleSubmit = (e) => {
      e.preventDefault()
      if (inputValues.password === inputValues.password_confirmation) {
         mutate(inputValues)
      } else {
         toast({
            title: t('error'),
            position: 'top',
            description: 'The password confirmation does not match.',
            status: 'error',
            isClosable: true
         })
      }
   }

   return (
      <div>
         <form onSubmit={handleSubmit}>
            <Flex direction="column" className="py-3">
               <Text className="text-gray-base text-sm ml-4">
                  password corrente{' '}
               </Text>
               <InputGroup size="md">
                  <Input
                     height="10"
                     onChange={(e) => {
                        setInputValues({
                           ...inputValues,
                           old_password: e.target.value
                        })
                     }}
                     required
                     type="password"
                     className="font-bold"
                     marginTop="0"
                     color="gray-base"
                     bgColor="white"
                     variant="filled"
                     value={inputValues.old_password}
                  />
               </InputGroup>
            </Flex>

            <Flex direction="column" className="py-3">
               <Text className="text-gray-base text-sm ml-4">New Password</Text>
               <InputGroup size="md">
                  <Input
                     height="10"
                     onChange={(e) => {
                        setInputValues({
                           ...inputValues,
                           password: e.target.value
                        })
                     }}
                     required
                     type="password"
                     className="font-bold"
                     marginTop="0"
                     color="gray-base"
                     bgColor="white"
                     variant="filled"
                     value={inputValues.password}
                  />
               </InputGroup>
            </Flex>
            <Flex direction="column" className="py-3">
               <Text className="text-gray-base text-sm ml-4">
                  Conferma password{' '}
               </Text>
               <InputGroup size="md">
                  <Input
                     height="10"
                     onChange={(e) => {
                        setInputValues({
                           ...inputValues,
                           password_confirmation: e.target.value
                        })
                     }}
                     required
                     type="password"
                     className="font-bold"
                     marginTop="0"
                     color="gray-base"
                     bgColor="white"
                     variant="filled"
                     value={inputValues.password_confirmation}
                  />
               </InputGroup>
            </Flex>

            <Button
               rightIcon={<MdKeyboardArrowRight className="text-3xl" />}
               variant="solid"
               isLoading={isLoading}
               size="lg"
               type="submit"
               height="14"
               loadingText={t('register.sending')}
               spinnerPlacement="end"
               width="100%"
               justifyContent="space-between"
               fontSize="md"
               fontWeight="600">
               {t('register.save')}{' '}
            </Button>
         </form>
      </div>
   )
}

export default SettingsPassword
