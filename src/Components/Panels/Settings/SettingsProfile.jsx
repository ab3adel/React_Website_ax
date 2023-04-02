import { Stack, Input, Text, Button, Select } from '@chakra-ui/react'
import { useGetProffessionsList } from 'Hooks/queries/useGetProffessionsList'
import { useGetSpeceializationsList } from 'Hooks/queries/useGetSpeceializationsList'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'

import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { useApiRequests } from 'API/apiRequests'
import LoadingPage from 'Components/LoadingPage'
import { useUpdateProfileQuery } from 'Hooks/queries/useUpdateProfileQuery'
import { EditProfilePhoto } from './EditProfilePhoto'

export function ProfileTitle({ main, secound }) {
   return (
      <Stack alignItems="flex-start">
         <Text className="text-gray-base text-md font-semibold">{main}</Text>
         <Text className="text-gray-base text-md font-light">{secound}</Text>
      </Stack>
   )
}

function SettingsProfile() {
   const professionList = useGetProffessionsList()

   const { t } = useTranslation('common')

   const [userProfile, setUserProfile] = useState({
      first_name: '',
      last_name: '',
      profession: '',
      specialization: '',
      board_number: '',
      province_enployment: ''
   })

   const [selectedFile, setSelectedFile] = useState(null)

   const { getProfile } = useApiRequests()

   const specializationsList = useGetSpeceializationsList()

   const { isLoading, mutate } = useUpdateProfileQuery()

   useQuery(['user-profile'], getProfile, {
      refetchOnWindowFocus: false,
      onSuccess: (res) => {
         setUserProfile(res.data.data)
         setSelectedFile(null)
      }
   })

   const handleChange = (e) => {
      setUserProfile({ ...userProfile, [e.target.name]: e.target.value })
   }

   const onSubmit = (e) => {
      e.preventDefault()
      const data = new FormData()
      if (selectedFile) {
         data.append('photo', selectedFile)
      }
      data.append('first_name', userProfile.first_name)
      data.append('last_name', userProfile.last_name)
      data.append('profession', userProfile.profession)
      data.append('specialization', userProfile.specialization)
      data.append('board_number', userProfile.board_number)
      data.append('province_enployment', userProfile.province_enployment)
      mutate(data)
   }

   if (!userProfile) return <LoadingPage />

   return (
      <div>
         <EditProfilePhoto
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            userProfile={userProfile}
         />

         <form onSubmit={onSubmit} className="w-full flex flex-col gap-4 mt-4">
            <div>
               <Text className="text-gray-base text-sm ml-4">
                  {t('register.first_name')}
               </Text>
               <Input
                  name="first_name"
                  onChange={handleChange}
                  required
                  variant="light"
                  value={userProfile.first_name}
               />
            </div>

            <div>
               <Text className="text-gray-base text-sm ml-4">
                  {t('register.last_name')}
               </Text>
               <Input
                  name="last_name"
                  onChange={handleChange}
                  required
                  variant="light"
                  value={userProfile.last_name}
               />
            </div>

            <div>
               <Text className="text-gray-base text-sm ml-4">
                  {t('register.profession')}
               </Text>
               <Select
                  name="profession"
                  className="font-bold"
                  marginTop="0"
                  required
                  color="gray-base"
                  bgColor="white"
                  variant="light"
                  onChange={(e) => {
                     specializationsList.mutate({
                        profession: e.target.value
                     })
                     setUserProfile({ ...userProfile, specialization: '' })
                     handleChange(e)
                  }}
                  placeholder={t('register.profession')}
                  value={userProfile.profession}>
                  {professionList.data?.data.professions.map(({ name, id }) => (
                     <option key={id} value={name}>
                        {name}
                     </option>
                  ))}
               </Select>
            </div>

            <div>
               <Text className="text-gray-base text-sm ml-4">
                  {t('register.specialization')}
               </Text>
               <Select
                  onChange={handleChange}
                  className="font-bold"
                  marginTop="0"
                  required
                  color="gray-base"
                  bgColor="white"
                  variant="light"
                  value={userProfile.specialization}
                  name="specialization"
                  placeholder="seleziona la specializzazione">
                  {specializationsList.data ? (
                     specializationsList.data?.data.map(({ text, id }) => (
                        <option key={id} value={text}>
                           {text}
                        </option>
                     ))
                  ) : (
                     <option value={userProfile.specialization}>
                        {userProfile.specialization}
                     </option>
                  )}
               </Select>
            </div>

            <div>
               <Text className="text-gray-base text-sm ml-4">
                  {t('register.registration_number')}
               </Text>
               <Input
                  onChange={handleChange}
                  required
                  variant="light"
                  name="board_number"
                  value={userProfile.board_number}
                  placeholder={t('register.registration_number')}
               />
            </div>

            <div>
               <Text className="text-gray-base text-sm ml-4">
                  {t('register.province')}
               </Text>
               <Select
                  onChange={handleChange}
                  className="font-bold"
                  marginTop="0"
                  color="gray-base"
                  required
                  bgColor="white"
                  variant="light"
                  value={userProfile.province_enployment}
                  name="province_enployment"
                  placeholder={t('register.province')}>
                  {professionList.data &&
                     Object.values(professionList.data.data.provinces).map(
                        (name) => (
                           <option key={name} value={name}>
                              {name}
                           </option>
                        )
                     )}
               </Select>
            </div>

            <Button
               rightIcon={<MdKeyboardArrowRight className="text-3xl" />}
               variant="solid"
               width="100%"
               justifyContent="space-between"
               type="submit"
               isLoading={isLoading}
               loadingText={t('register.sending')}
               spinnerPlacement="end">
               {t('register.save')}{' '}
            </Button>
         </form>
      </div>
   )
}

export default SettingsProfile

ProfileTitle.propTypes = {
   main: PropTypes.string.isRequired,
   secound: PropTypes.string
}
