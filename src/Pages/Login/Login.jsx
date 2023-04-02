import { Box, Button, Input, Stack, Text } from '@chakra-ui/react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Formik, Form, ErrorMessage } from 'formik'

import Navbar from 'Layout/Navbar/Navbar'
import Footer from 'Layout/Footer/Footer'
import { loginSchema } from 'Configs/formsSchemas'
import { useLoginQuery } from 'Hooks/queries/useLoginQuery'

function Login() {
   const { t } = useTranslation('common')

   const { isLoading, mutate } = useLoginQuery()

   const onSubmit = (values) => {
      mutate({ ...values, device_name: 'web' })
   }

   return (
      <Box className="flex flex-col justify-center overflow-x-hidden">
         <Navbar />
         <Box
            bgColor="gray-lightest"
            className="flex h-[65vh] flex-col justify-center items-center py-20 pb-44">
            <Text className="font-extrabold pb-8 text-2xl">
               {t('login.title')}
            </Text>
            <Stack className="w-1/4 md:w-3/4">
               <Formik
                  initialValues={{
                     email: '',
                     password: ''
                  }}
                  validationSchema={loginSchema}
                  onSubmit={onSubmit}>
                  {({ handleChange, handleSubmit, values }) => (
                     <Form onSubmit={handleSubmit}>
                        <Input
                           type="email"
                           name="email"
                           className="font-medium py-4"
                           variant="filled"
                           placeholder={t('register.email')}
                           onChange={handleChange}
                           value={values.email}
                        />
                        <ErrorMessage
                           className="bg-blue-dark mt-2 rounded-lg py-2 px-5 text-white"
                           name="email"
                           component="div"
                        />

                        <Input
                           className="font-medium mt-4"
                           variant="filled"
                           placeholder={t('register.password')}
                           type="password"
                           name="password"
                           onChange={handleChange}
                           value={values.password}
                        />
                        <ErrorMessage
                           className="bg-blue-dark mt-2 rounded-lg py-2 px-5 text-white"
                           name="password"
                           component="div"
                        />

                        <Box className="flex justify-between pt-4" spacing={3}>
                           <Button
                              justifyContent="space-between"
                              rightIcon={
                                 <MdKeyboardArrowRight className="text-2xl" />
                              }
                              variant="solid"
                              isLoading={isLoading}
                              loadingText={t('register.sending')}
                              spinnerPlacement="end"
                              type="submit">
                              {t('login.enjoy')}
                           </Button>
                        </Box>
                     </Form>
                  )}
               </Formik>
               <Box className="flex justify-between pt-4" spacing={3}>
                  <Link to="../forgot-password">
                     <Text
                        textColor="gray-base font-normal"
                        color="gray-base"
                        fontSize="md">
                        {t('login.forget_password')}
                     </Text>
                  </Link>
                  <Link to="../register">
                     <Text
                        textColor="gray-base font-normal"
                        color="gray-base"
                        fontSize="md">
                        {t('login.signup')}
                     </Text>
                  </Link>
               </Box>
            </Stack>
         </Box>

         <Footer />
      </Box>
   )
}

export default Login
