import {
   Box,
   Button,
   FormControl,
   Input,
   Stack,
   Text,
} from '@chakra-ui/react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { ErrorMessage, Form, Formik } from 'formik'
import {  useSearchParams } from 'react-router-dom'

import Navbar from 'Layout/Navbar/Navbar'
import Footer from 'Layout/Footer/Footer'
import { resetPasswordSchema } from 'Configs/formsSchemas'
import { useResetPasswordQuery } from 'Hooks/queries/useResetPasswordQuery'

function ResetPassword() {
   const [searchParams] = useSearchParams()

   const { isLoading, mutate } = useResetPasswordQuery()

   const onSubmit = (values) => {
      mutate({ ...values, code: searchParams.get('code') })
   }

   return (
      <Box className="flex flex-col justify-center overflow-x-hidden">
         <Navbar />
         <Box
            bgColor="gray-lightest"
            className="flex flex-col justify-center items-center py-20 pb-44">
            <Text className="font-extrabold pb-8 text-2xl">Reset Password</Text>
            <Stack className="w-1/4 md:w-3/4">
               <Formik
                  initialValues={{
                     password: '',
                     password_confirmation: ''
                  }}
                  validationSchema={resetPasswordSchema}
                  onSubmit={onSubmit}>
                  {({ handleChange, handleSubmit, values }) => (
                     <Form onSubmit={handleSubmit}>
                        <FormControl>
                           <Input
                              value={values.password}
                              onChange={handleChange}
                              type="password"
                              name="password"
                              className="font-medium py-4"
                              variant="filled"
                              placeholder="Password"
                              my={2}
                           />
                           <ErrorMessage
                              className="bg-blue-dark mt-2 rounded-lg py-2 px-5 text-white"
                              name="email"
                              component="div"
                           />
                           <Input
                              value={values.password_confirmation}
                              onChange={handleChange}
                              type="password"
                              name="password_confirmation"
                              className="font-medium py-4"
                              variant="filled"
                              my={2}
                              placeholder="Password confirmation"
                           />
                           <ErrorMessage
                              className="bg-blue-dark mt-2 rounded-lg py-2 px-5 text-white"
                              name="password_confirmation"
                              component="div"
                           />
                           <Box
                              className="flex justify-between pt-4"
                              spacing={3}>
                              <Button
                                 justifyContent="space-between"
                                 rightIcon={
                                    <MdKeyboardArrowRight className="text-2xl" />
                                 }
                                 variant="solid"
                                 rounded="lg"
                                 isLoading={isLoading}
                                 loadingText="Submitting"
                                 spinnerPlacement="end"
                                 type="submit">
                                 Reset Password
                              </Button>
                           </Box>
                        </FormControl>
                     </Form>
                  )}
               </Formik>
            </Stack>
         </Box>
         <Footer />
      </Box>
   )
}

export default ResetPassword
