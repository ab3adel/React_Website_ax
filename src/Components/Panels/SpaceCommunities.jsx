/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useApiRequests } from 'API/apiRequests'
import CommunityCard from 'Components/Cards/CommunityCard'
import SkeletonsCards from 'Components/Skeletons/SkeletonsCards'
import { useQuery } from 'react-query'
import { useTranslation } from 'react-i18next'
import { FadeBox } from 'Components/FadeBox'
import { useSelectCommunity } from 'Hooks/useSelectCommunity'

function SpaceCommunities() {
   const { t } = useTranslation('common')

   const { getUserCommunities } = useApiRequests()

   const { isLoading, data, isFetched } = useQuery(
      ['user-communities'],
      getUserCommunities
   )

   const { handleSelectCommunity, urlParamId } = useSelectCommunity()

   return (
      <>
         {isLoading && <SkeletonsCards />}

         <FadeBox>
            {isFetched &&
               data.data.map(
                  ({ name, members_count, type, last_updated, id }) => (
                     <div
                        className="mb-3"
                        onClick={() =>
                           handleSelectCommunity(id, name, members_count)
                        }
                        key={id}>
                        <CommunityCard
                           title={name}
                           selected={urlParamId === id}
                           id={id}
                           subTitle={
                              last_updated
                                 ? `${t('last_activity')} ${last_updated}`
                                 : ''
                           }
                           type={type}
                           locked={type === 2}
                        />
                     </div>
                  )
               )}
         </FadeBox>
      </>
   )
}

export default SpaceCommunities
