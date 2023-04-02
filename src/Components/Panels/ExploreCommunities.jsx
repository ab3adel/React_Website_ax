import { Box } from '@chakra-ui/react'
import CollapsibleCummunityCard from 'Components/Cards/CollapsibleCummunityCard'
import CollapsibleMenu from 'Components/Menus/CollapsibleMenu'
import { useApiRequests } from 'API/apiRequests'
import { useQuery } from 'react-query'
import SuggestNewCommunity from 'Components/Buttons/SuggestNewCommunity'
import { SkeletonMenus } from 'Components/Skeletons/SkeletonMenus'

function Communities() {
   const { getCommunities } = useApiRequests()
   const query = useQuery(['communities'], getCommunities)

   return (
      <>
         <SuggestNewCommunity />

         <div className="pb-3 flex flex-col gap-1 mt-3">
            {query.isLoading && <SkeletonMenus />}

            {query.isFetched &&
               Object.keys(query.data.data).map((key) => (
                  <Box key={key}>
                     {query.data.data[key].length > 0 && (
                        <CollapsibleMenu
                           text={key}
                           children={
                              <CollapsibleCummunityCard
                                 item={query.data.data[key]}
                              />
                           }
                        />
                     )}
                  </Box>
               ))}
         </div>
      </>
   )
}

export default Communities
