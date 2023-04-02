import { VStack, Button, Input, Textarea } from '@chakra-ui/react'
import { MdPersonAddAlt1, MdKeyboardArrowRight } from 'react-icons/md'
import { useQuery } from 'react-query'
import { Fragment, useState } from 'react'

import CollapsibleButton from 'Components/Buttons/CollapsibleButton'
import ContactCard from 'Components/Cards/ContactCard'
import { useApiRequests } from 'API/apiRequests'
import { groupingByFirstLetter } from 'Utils/helperFunctions'
import SkeletonsCards from 'Components/Skeletons/SkeletonsCards'
import { useTranslation } from 'react-i18next'

function ExploreContacts() {
   const [groupedList, setGroupedList] = useState([])

   const { getSpaceUsers } = useApiRequests()

   const { t } = useTranslation('common')

   const query = useQuery(['space-users'], getSpaceUsers, {
      onSuccess: (res) => {
         /* Grouping the data by the first letter of the name. */
         setGroupedList(groupingByFirstLetter(res.data))
      }
   })

   return (
      <>
         <CollapsibleButton
            icon={<MdPersonAddAlt1 className="text-3xl" />}
            text={t('explore.invite_user.invite_btn')}>
            <Input
               className="mb-4 self-center justify-center font-medium"
               type="text"
               variant="filled"
               placeholder={t('explore.invite_user.user_email')}
            />
            <Textarea
               className="mb-4 self-center justify-center font-medium"
               type="text"
               variant="filled"
               placeholder={t('explore.invite_user.type_message')}
            />
            <div>
               <Button
                  justifyContent="space-between"
                  rightIcon={<MdKeyboardArrowRight className="text-2xl" />}
                  variant="solid"
                  rounded="lg">
                  {t('explore.invite_user.send_invite')}
               </Button>
            </div>
         </CollapsibleButton>

         <VStack spacing={4} py="4" align="stretch">
            {query.isLoading && <SkeletonsCards />}

            {query.isFetched &&
               groupedList.map(({ group, children }) => (
                  <Fragment key={group}>
                     <div key={group} className="pt-2.5">
                        <h6 className=" text-gray-base text-sm font-semibold">
                           {group}
                        </h6>
                     </div>
                     {children.map((userData) => (
                        <ContactCard key={userData._id} user={userData} />
                     ))}
                  </Fragment>
               ))}
         </VStack>
      </>
   )
}

export default ExploreContacts
