/* eslint-disable react/jsx-no-useless-fragment */
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { RiWechatLine } from 'react-icons/ri'
import { BsFillCameraVideoFill } from 'react-icons/bs'
import SearchInput from 'Components/Inputs/SearchInput'
import { useRecoilState } from 'recoil'
import {
   confrencesIdAtom,
   selectedView,
   showConfrenceWindowAtom
} from 'Recoil/Atoms'
import { useParams } from 'react-router-dom'
import { NoCommunities } from 'Components/NoCommunities'
import { useTranslation } from 'react-i18next'
import { FadeBox } from 'Components/FadeBox'
import { ConfrenceWindow } from 'Components/Confrence/ConfrenceWindow'
import { useEffect } from 'react'
import CommunitiesList from '../../Components/Panels/SpaceCommunities'
import Confrences from '../../Components/Panels/SpaceConfrences'
import MySpaceDrawer from '../../Components/Drawer/MySpaceDrawer'
import ChatWindow from '../../Components/Chat/ChatWindow'

function MySpace() {
   const { t } = useTranslation('common')

   const [view] = useRecoilState(selectedView)

   const { id } = useParams()

   const [showConfrenceWindow, setShowConfrenceWindow] = useRecoilState(
      showConfrenceWindowAtom
   )

   const [confrencesList] = useRecoilState(confrencesIdAtom)

   useEffect(() => {
      if (!id) {
         setShowConfrenceWindow(false)
      }
      if (confrencesList) {
         confrencesList.forEach(({ _id }) => {
            if (id === _id) {
               setShowConfrenceWindow(true)
            }
         })
      }
   }, [])

   return (
      <>
         {view === 'my-space' && (
            <>
               <MySpaceDrawer />

               <div className="min-w-[430px] lg:min-w-[350px] max-w-[430px] md:hidden max-h-screen overflow-auto flex-col flex bg-gray-lightest px-4 md:h-auto">
                  <FadeBox>
                     <h2 className="self-start font-semibold my-6 text-[22px]">
                        {t('space.title')}
                     </h2>

                     <SearchInput />

                     <Tabs
                        className="justify-around w-full"
                        variant="solid-rounded"
                        colorScheme="whiteAlpha">
                        <TabList className="bg-gray-light rounded-lg p-1">
                           <Tab
                              _selected={{ color: 'gray-base', bg: 'white' }}
                              className="w-1/2 p-0"
                              rounded="lg"
                              boxShadow="none">
                              <RiWechatLine className="text-3xl text-gray-base" />
                           </Tab>

                           <Tab
                              _selected={{ color: 'gray-base', bg: 'white' }}
                              className="w-1/2 p-0"
                              rounded="lg">
                              <BsFillCameraVideoFill className="text-3xl text-gray-base" />
                           </Tab>
                        </TabList>

                        <TabPanels>
                           <TabPanel className="mt-4" p={0} rounded="lg">
                              <CommunitiesList />
                           </TabPanel>

                           <TabPanel className="mt-4" p={0}>
                              <Confrences />
                           </TabPanel>
                        </TabPanels>
                     </Tabs>
                  </FadeBox>
               </div>
            </>
         )}
         <div className="flex flex-col flex-1 ">
            {showConfrenceWindow ? (
               <>
                  <ConfrenceWindow />
               </>
            ) : (
               <>{id ? <ChatWindow /> : <NoCommunities />}</>
            )}
         </div>
      </>
   )
}

export default MySpace
