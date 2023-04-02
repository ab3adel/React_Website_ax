/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Avatar, Text, VStack, Tag } from '@chakra-ui/react'
import { FaUnlock, FaLock } from 'react-icons/fa'
import { GoPrimitiveDot } from 'react-icons/go'
import PropTypes from 'prop-types'
import { UnReadMessagesCount } from 'Components/UnReadMessagesCount'
import { useTranslation } from 'react-i18next'

function CommunityCard({ locked, title, subTitle, id, online, selected }) {
   const { t } = useTranslation('common')

   return (
      <div
         className={`overflow-hidden  active:bg-rose-50 transition-all flex justify-between w-full ${
            selected ? 'bg-red-50' : 'bg-white'
         } gap-5 items-center py-4 px-5 rounded-lg cursor-pointer`}>
         <div className="relative">
            {online && (
               <GoPrimitiveDot
                  className="absolute z-10 top-0 right-0"
                  color="green"
               />
            )}

            <Avatar name={title} />
         </div>

         <VStack alignItems="flex-start" className="w-full">
            <p className="text-black font-semibold text-base sm:text-sm lg:text-base text-left">
               {title}
            </p>
            <Text textColor="gray-base" fontWeight="400" fontSize="sm">
               <span>{subTitle}</span>
            </Text>
            <div className="flex gap-2">
               <Tag size="sm" color="rose">
                  {locked ? (
                     <>{t('explore.suggest_community.private')}</>
                  ) : (
                     <>{t('explore.suggest_community.public')}</>
                  )}
               </Tag>
               <UnReadMessagesCount communityId={id} />
            </div>
         </VStack>

         {locked ? (
            <FaLock className="text-2xl md:text-xl text-primary" />
         ) : (
            <FaUnlock color="#8CA0BF" className="text-2xl md:text-xl" />
         )}
      </div>
   )
}

CommunityCard.propTypes = {
   locked: PropTypes.bool,
   selected: PropTypes.bool,
   title: PropTypes.string,
   id: PropTypes.string,
   subTitle: PropTypes.string,
   online: PropTypes.bool
}

export default CommunityCard
