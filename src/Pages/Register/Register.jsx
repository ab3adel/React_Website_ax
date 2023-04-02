import React from 'react'
import { Box, Button, Input, Select, Stack, Text } from '@chakra-ui/react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { Formik, Form, ErrorMessage } from 'formik'
import { Link } from 'react-router-dom'

import Navbar from 'Layout/Navbar/Navbar'
import Footer from 'Layout/Footer/Footer'
import { registerSchema } from 'Configs/formsSchemas'
import { useRegisterQuery } from 'Hooks/queries/useRegisterQuery'
import { useRecoilState } from 'recoil'
import { isUserRegistered } from 'Recoil/Atoms'
import { useTranslation } from 'react-i18next'
import { useGetProffessionsList } from '../../Hooks/queries/useGetProffessionsList'
import { useGetSpeceializationsList } from '../../Hooks/queries/useGetSpeceializationsList'

function Register() {
   const { t } = useTranslation('common')

   const [isRegistered] = useRecoilState(isUserRegistered)

   const { isLoading, mutate } = useRegisterQuery()

   const professionList = useGetProffessionsList()

   const specializationsList = useGetSpeceializationsList()

   const onSubmit = (values) => {
      mutate(values)
   }

   return (
      <Box className="flex flex-col justify-center overflow-x-hidden">
         <Navbar />
         <Box
            bgColor="gray-lightest"
            className="flex flex-col h-[65vh] w-full justify-center items-center py-20 pb-36">
            {isRegistered ? (
               <Text className="font-extrabold pb-8 text-2xl">
                  {t('register.activation_recived')}
               </Text>
            ) : (
               <>
                  <Text className="font-extrabold pb-8 text-2xl">
                     {t('register.title')}
                  </Text>
                  <Formik
                     initialValues={{
                        email: '',
                        email_confirmation: '',
                        password: '',
                        password_confirmation: '',
                        first_name: '',
                        last_name: '',
                        registration_number: '',
                        province: '',
                        profession: '',
                        specialization: ''
                     }}
                     validationSchema={registerSchema}
                     onSubmit={onSubmit}>
                     {({ handleChange, handleSubmit, values }) => (
                        <Form
                           onSubmit={handleSubmit}
                           className="w-3/6 md:w-3/4">
                           <Stack spacing={3}>
                              <Box className="flex gap-4 md:flex-col">
                                 <Input
                                    name="first_name"
                                    onChange={handleChange}
                                    className="font-medium"
                                    variant="filled"
                                    placeholder={t('register.first_name')}
                                    value={values.first_name}
                                 />
                                 <Input
                                    name="last_name"
                                    onChange={handleChange}
                                    className="font-medium"
                                    variant="filled"
                                    placeholder={t('register.last_name')}
                                    value={values.last_name}
                                 />
                              </Box>
                              <div className="flex md:flex-col gap-4">
                                 <div className="w-full">
                                    <Input
                                       name="email"
                                       onChange={handleChange}
                                       className="font-medium"
                                       variant="filled"
                                       placeholder={t('register.email')}
                                       value={values.email}
                                    />
                                    <ErrorMessage
                                       className="bg-blue-dark mt-2 rounded-lg py-2 px-5 text-white"
                                       name="email"
                                       component="div"
                                    />
                                 </div>
                                 <div className="w-full">
                                    <Input
                                       name="email_confirmation"
                                       onChange={handleChange}
                                       className="font-medium"
                                       variant="filled"
                                       placeholder={t(
                                          'register.email_confirmation'
                                       )}
                                       value={values.email_confirmation}
                                    />
                                    <ErrorMessage
                                       className="bg-blue-dark mt-2 rounded-lg py-2 px-5 text-white"
                                       name="email_confirmation"
                                       component="div"
                                    />
                                 </div>
                              </div>

                              <Box className="flex gap-4 md:flex-col">
                                 <div className="w-full">
                                    <Input
                                       name="password"
                                       onChange={handleChange}
                                       className="font-medium"
                                       variant="filled"
                                       type="password"
                                       placeholder={t('register.password')}
                                       value={values.password}
                                    />
                                    <ErrorMessage
                                       className="bg-blue-dark mt-2 rounded-lg py-2 px-5 text-white"
                                       name="password"
                                       component="div"
                                    />
                                 </div>

                                 <div className="w-full">
                                    <Input
                                       name="password_confirmation"
                                       onChange={handleChange}
                                       className="font-medium"
                                       variant="filled"
                                       type="password"
                                       placeholder={t(
                                          'register.password_confirmation'
                                       )}
                                       value={values.confirmPassword}
                                    />
                                    <ErrorMessage
                                       className="bg-blue-dark mt-2 rounded-lg py-2 px-5 text-white"
                                       name="password_confirmation"
                                       component="div"
                                    />
                                 </div>
                              </Box>
                              <Box className="flex gap-4 md:flex-col">
                                 <Box className="w-full">
                                    <Select
                                       name="profession"
                                       onChange={(e) => {
                                          specializationsList.mutate({
                                             profession: e.target.value
                                          })
                                          handleChange(e)
                                       }}
                                       className="font-medium"
                                       variant="filled"
                                       placeholder={t('register.profession')}
                                       value={values.profession}>
                                       {professionList.data?.data.professions.map(
                                          ({ name, id }) => (
                                             <option key={id} value={name}>
                                                {name}
                                             </option>
                                          )
                                       )}
                                    </Select>
                                 </Box>

                                 <Box className="w-full">
                                    <Select
                                       disabled={!specializationsList.data}
                                       name="specialization"
                                       onChange={handleChange}
                                       className="font-medium"
                                       variant="filled"
                                       placeholder={t(
                                          'register.specialization'
                                       )}
                                       value={values.specialization}>
                                       {specializationsList.data?.data.map(
                                          ({ text, id }) => (
                                             <option key={id} value={text}>
                                                {text}
                                             </option>
                                          )
                                       )}
                                    </Select>
                                    <ErrorMessage
                                       className="bg-blue-dark mt-2 rounded-lg py-2 px-5 text-white"
                                       name="specialization"
                                       component="div"
                                    />
                                 </Box>
                              </Box>
                              <Box className="flex gap-4 md:flex-col">
                                 <Box className="w-full">
                                    <Input
                                       onChange={handleChange}
                                       className="font-medium"
                                       name="registration_number"
                                       value={values.registration_number}
                                       variant="filled"
                                       placeholder={t(
                                          'register.registration_number'
                                       )}
                                    />
                                    <ErrorMessage
                                       className="bg-blue-dark mt-2 rounded-lg py-2 px-5 text-white"
                                       name="registration_number"
                                       component="div"
                                    />
                                 </Box>
                                 <Box className="w-full">
                                    <Select
                                       onChange={handleChange}
                                       className="font-medium"
                                       variant="filled"
                                       value={values.province}
                                       name="province"
                                       defaultValue="MI"
                                       placeholder={t('register.province')}>
                                       {professionList.data &&
                                          Object.values(
                                             professionList.data.data.provinces
                                          ).map((name) => (
                                             <option key={name} value={name}>
                                                {name}
                                             </option>
                                          ))}
                                    </Select>
                                    <ErrorMessage
                                       className="bg-blue-dark mt-2 rounded-lg py-2 px-5 text-white"
                                       name="province"
                                       component="div"
                                    />
                                 </Box>
                              </Box>
                           </Stack>
                           <Stack className="pt-10 w-2/5 mx-auto md:w-full">
                              <Box>
                                 <Button
                                    justifyContent="space-between"
                                    rightIcon={
                                       <MdKeyboardArrowRight className="text-2xl" />
                                    }
                                    variant="solid"
                                    type="submit"
                                    isLoading={isLoading}
                                    loadingText={t('register.sending')}
                                    spinnerPlacement="end"
                                    rounded="lg">
                                    {t('register.send')}
                                 </Button>
                              </Box>

                              <Box
                                 className="flex justify-between pt-1"
                                 spacing={3}>
                                 <Link to="../login">
                                    <Text
                                       textColor="gray-base font-normal"
                                       color="gray-base"
                                       fontSize="md">
                                       {t('register.alredy_registered')}
                                    </Text>
                                 </Link>
                              </Box>
                           </Stack>
                        </Form>
                     )}
                  </Formik>
               </>
            )}
         </Box>
         <Footer />
      </Box>
   )
}

export default Register
