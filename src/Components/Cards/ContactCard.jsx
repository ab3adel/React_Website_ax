import { Avatar, VStack } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { GoPrimitiveDot } from 'react-icons/go'

function ContactCard({ user, online }) {
   const userFromDate = user.create_date.split('/')

   const { t } = useTranslation('common')

   return (
      <div className="py-4 px-5 active:bg-rose-50 transition-all mb-3.5 w-full flex items-center bg-white rounded-lg cursor-pointer">
         <div className="relative mr-8">
            {online && (
               <GoPrimitiveDot
                  className="absolute z-10 top-0 right-0"
                  color="green"
               />
            )}
            <Avatar
               name={user.first_name}
               src={process.env.REACT_APP_MEDIA_PREFIX + user.photo}
            />
         </div>
         <VStack alignItems="flex-start">
            <p className="font-bold text-base sm:text-sm text-black">
               {user.first_name} {user.last_name}
            </p>
            <p className="text-gray-dark sm:text-sm text-base font-normal">
               {t('user_since')} {userFromDate[1]}{' '}
               {userFromDate[2].split(' ')[0]} {userFromDate[0]}
            </p>
         </VStack>
      </div>
   )
}

export default ContactCard

ContactCard.propTypes = {
   user: PropTypes.object.isRequired,
   online: PropTypes.bool
}
