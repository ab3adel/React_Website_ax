import {
   Drawer,
   DrawerHeader,
   DrawerOverlay,
   DrawerContent,
   DrawerCloseButton,
   Tab,
   TabList,
   TabPanel,
   TabPanels,
   Tabs
} from '@chakra-ui/react'
import React from 'react'

import { BsFillMegaphoneFill } from 'react-icons/bs'
import { IoMdPeople } from 'react-icons/io'
import { AiFillFile } from 'react-icons/ai'
import FilesTab from 'Components/Tabs/FilesTab'
import ArticlesTab from 'Components/Tabs/ArticlesTab'
import { CommunityMembers } from 'Components/CommunityMembers'
// import { useTranslation } from 'react-i18next'
import { LeaveCommunity } from 'Components/Buttons/LeaveCommunity'
import { showConfrenceWindowAtom } from 'Recoil/Atoms'
import { useRecoilState } from 'recoil'

export function CommunityDetailsDrawer({ isDrawerOpen, closeDrawer }) {
   const [showConfrenceWindow] = useRecoilState(showConfrenceWindowAtom)

   return (
      <Drawer
         size="sm"
         isOpen={isDrawerOpen}
         placement="right"
         backgroundColor="#F5F8FA"
         className="bg-[#F5F8FA]"
         onClose={closeDrawer}>
         <DrawerOverlay opacity={0.1} />
         <DrawerContent>
            <DrawerHeader padding={2} borderBottomWidth="1px">
               <LeaveCommunity />
            </DrawerHeader>
            <DrawerCloseButton />
            <div className="py-4 bg-[#F5F8FA]">
               <Tabs
                  className="justify-around w-full"
                  variant="solid-rounded"
                  colorScheme="whiteAlpha">
                  <TabList
                     h={12}
                     className="bg-gray-light w-[95%] mx-auto rounded-lg p-1">
                     {!showConfrenceWindow && (
                        <Tab
                           _selected={{ color: 'gray-base', bg: 'white' }}
                           className="w-1/2 p-0"
                           rounded="lg"
                           boxShadow="none">
                           <BsFillMegaphoneFill className="text-2xl md:text-xl text-gray-base" />
                        </Tab>
                     )}

                     <Tab
                        _selected={{ color: 'gray-base', bg: 'white' }}
                        className="w-1/2 p-0"
                        rounded="lg">
                        <AiFillFile className="text-2xl md:text-xl text-gray-base" />
                     </Tab>
                     <Tab
                        _selected={{ color: 'gray-base', bg: 'white' }}
                        boxShadow="none"
                        outline="none"
                        className="w-1/2 p-0"
                        rounded="lg">
                        <IoMdPeople className="text-4xl md:text-3xl text-gray-base" />
                     </Tab>
                  </TabList>
                  <TabPanels>
                     {!showConfrenceWindow && (
                        <TabPanel className="mt-4" p={0} rounded="lg">
                           <ArticlesTab />
                        </TabPanel>
                     )}

                     <TabPanel className="mt-4" p={0}>
                        <FilesTab />
                     </TabPanel>
                     <TabPanel className="mt-4 whitespace-normal" p={0}>
                        {!showConfrenceWindow && <CommunityMembers />}
                     </TabPanel>
                  </TabPanels>
               </Tabs>
            </div>
         </DrawerContent>
      </Drawer>
   )
}
