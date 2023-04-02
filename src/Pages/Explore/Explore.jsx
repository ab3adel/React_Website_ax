import React from 'react'
import { Tabs, Tab, TabList, TabPanel, TabPanels, Box } from '@chakra-ui/react'
import { RiWechatLine } from 'react-icons/ri'
import { IoPerson } from 'react-icons/io5'
import { useRecoilState } from 'recoil'
import { selectedView } from 'Recoil/Atoms'
import { AnimatePresence } from 'framer-motion'
import SearchInput from 'Components/Inputs/SearchInput'
import { useTranslation } from 'react-i18next'

// import VideoPlayer from 'Components/Player/Player'
import { FadeBox } from 'Components/FadeBox'
import Communities from '../../Components/Panels/ExploreCommunities'
import Contacts from '../../Components/Panels/ExploreContacts'
import ExploreDrawer from '../../Components/Drawer/ExploreDrawer'

function Explore() {
   const [view] = useRecoilState(selectedView)
   const { t } = useTranslation('common')

   return (
      <>
         {view === 'explore' && (
            <>
               <ExploreDrawer />
               <div className="min-w-[430px] lg:min-w-[350px] max-w-[430px] max-h-screen overflow-auto flex-col flex  bg-gray-lightest px-4 md:hidden">
                  <FadeBox>
                     <h2 className="self-start font-semibold my-6 text-[22px]">
                        {t('explore.title')}
                     </h2>
                     <SearchInput />
                     <Tabs
                        isLazy
                        className="justify-around w-full"
                        variant="solid-rounded"
                        colorScheme="whiteAlpha">
                        <TabList h={14} className="bg-slate-200 rounded-lg p-1">
                           <Tab
                              rounded="lg"
                              _selected={{ color: 'gray-base', bg: 'white' }}
                              className="w-1/2 p-0">
                              <RiWechatLine className="text-2xl text-gray-base" />
                           </Tab>
                           <Tab
                              rounded="lg"
                              _selected={{ color: 'gray-base', bg: 'white' }}
                              className="w-1/2 p-0">
                              <IoPerson className="text-2xl text-gray-base" />
                           </Tab>
                        </TabList>
                        <TabPanels mt={4}>
                           <TabPanel
                              as={AnimatePresence}
                              className="mt-4 h-screen"
                              p={0}
                              rounded="lg">
                              <FadeBox>
                                 <Communities />
                              </FadeBox>
                           </TabPanel>
                           <TabPanel
                              as={AnimatePresence}
                              className="mt-4 h-screen"
                              p={0}>
                              <FadeBox>
                                 <Contacts />
                              </FadeBox>
                           </TabPanel>
                        </TabPanels>
                     </Tabs>
                  </FadeBox>
               </div>
            </>
         )}

         <Box id="explore-video" className="w-full ">
            {/* <VideoPlayer /> */}
         </Box>
      </>
   )
}

export default Explore
