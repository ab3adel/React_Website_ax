/* eslint-disable camelcase */
import {
   Box,
   Button,
   Text,
   Accordion,
   AccordionItem,
   AccordionButton,
   AccordionPanel
} from '@chakra-ui/react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import PropTypes from 'prop-types'
import { useJoinCommunityQuery } from 'Hooks/queries/useJoinCommunityQuery'
import { useCancelJoinRequestQuery } from 'Hooks/queries/useCancelJoinRequestQuery'
import { useTranslation } from 'react-i18next'
import CommunityCard from './CommunityCard'

function CollapsibleCummunityCard({ item }) {
   const joinQuery = useJoinCommunityQuery()

   const { t } = useTranslation('common')

   const cancelRequestQuery = useCancelJoinRequestQuery()

   const handleJoinCommunity = (_id) => joinQuery.mutate({ community: _id })

   const handleCancelRequest = (_id) => cancelRequestQuery.mutate(_id)

   return (
      <>
         {item.map(({ name, description, type, _id, requested_to_join }) => (
            <Box
               key={_id}
               className="flex justify-center items-center pb-4"
               backgroundColor="gray-light"
               width="100%"
               fontSize="16px"
               fontWeight="600">
               <Accordion
                  borderColor="transparent"
                  w="full"
                  defaultIndex={[]}
                  allowMultiple>
                  <AccordionItem>
                     <AccordionButton
                        _focus={{ outline: 'none' }}
                        rounded="lg"
                        p={0}>
                        <CommunityCard title={name} locked={type === 2} />
                     </AccordionButton>
                     <AccordionPanel
                        marginTop="-9px"
                        roundedBottom="lg"
                        bgColor="#ffffff">
                        <div>
                           <Text
                              textColor="gray-base"
                              className="text-md sm:text-sm font-normal w-10/12 p-2">
                              {description}
                           </Text>

                           <h6 className="text-primary sm:text-sm text-md p-2 w-10/12">
                              {type === 2 ? (
                                 <>
                                    {t(
                                       'explore.communty_card.private_community'
                                    )}
                                 </>
                              ) : (
                                 <>
                                    {t(
                                       'explore.communty_card.public_community'
                                    )}
                                 </>
                              )}
                           </h6>
                           {requested_to_join === 0 ? (
                              <Button
                                 justifyContent="space-between"
                                 rightIcon={
                                    <MdKeyboardArrowRight className="text-2xl" />
                                 }
                                 onClick={() => handleJoinCommunity(_id)}
                                 height="14"
                                 w="full"
                                 isLoading={joinQuery.isLoading}
                                 loadingText={t(
                                    'explore.communty_card.sending'
                                 )}
                                 spinnerPlacement="end"
                                 variant="solid"
                                 rounded="lg">
                                 {type === 2 ? (
                                    <span className="sm:text-sm">
                                       {t('explore.communty_card.send_request')}
                                    </span>
                                 ) : (
                                    <span className="sm:text-sm">
                                       {t('explore.communty_card.enter')}
                                    </span>
                                 )}
                              </Button>
                           ) : (
                              <Button
                                 justifyContent="space-between"
                                 rightIcon={
                                    <MdKeyboardArrowRight className="text-2xl" />
                                 }
                                 onClick={() => handleCancelRequest(_id)}
                                 height="14"
                                 w="full"
                                 border="1px"
                                 isLoading={cancelRequestQuery.isLoading}
                                 loadingText={t(
                                    'explore.communty_card.canceling'
                                 )}
                                 spinnerPlacement="end"
                                 variant="ghost"
                                 rounded="lg">
                                 {t('explore.communty_card.cancel_request')}
                              </Button>
                           )}
                        </div>
                     </AccordionPanel>
                  </AccordionItem>
               </Accordion>
            </Box>
         ))}
      </>
   )
}

CollapsibleCummunityCard.propTypes = {
   item: PropTypes.array.isRequired
}

export default CollapsibleCummunityCard
