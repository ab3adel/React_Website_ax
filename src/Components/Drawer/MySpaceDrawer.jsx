import React from 'react'
import LeftMenu from 'Components/Drawer/LeftMenu'
import SearchInput from 'Components/Inputs/SearchInput'
// import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { RiWechatLine } from 'react-icons/ri'
import { BsFillCameraVideoFill } from 'react-icons/bs'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import Confrences from 'Components/Panels/SpaceConfrences'
import CommunitiesList from '../Panels/SpaceCommunities'

function MySpaceDrawer() {
   return (
      <LeftMenu>
         <PerfectScrollbar className="w-screen max-h-screen overflow-auto flex-col flex p-4 bg-gray-lightest md:h-auto">
            <h2 className="self-start font-semibold my-7 ml-2 text-2xl">
               My space
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
         </PerfectScrollbar>
      </LeftMenu>
   )
}

export default MySpaceDrawer
