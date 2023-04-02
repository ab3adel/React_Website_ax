import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { PdfFilesTab } from './PdfFilesTab'
import { ImagesFilesTab } from './ImagesFilesTab'
import { PptFilesTab } from './PptFilesTab'

function FilesTab() {
   const [selectedTab, setSelectedTab] = useState()

   useEffect(() => {
      setSelectedTab('pdf')
   }, [])

   return (
      <Tabs
         className="justify-around w-full"
         variant="solid-rounded"
         colorScheme="whiteAlpha">
         <TabList className="bg-gray-light rounded-lg p-1 w-[95%] mx-auto">
            <Tab
               onClick={() => setSelectedTab('pdf')}
               _selected={{ color: 'gray-base', bg: 'white' }}
               className="w-1/2 p-0"
               rounded="lg"
               boxShadow="none">
               PDF
            </Tab>
            <Tab
               onClick={() => setSelectedTab('img')}
               _selected={{ color: 'gray-base', bg: 'white' }}
               boxShadow="none"
               outline="none"
               className="w-1/2 p-0"
               rounded="lg">
               Jpg
            </Tab>
            <Tab
               onClick={() => setSelectedTab('ppt')}
               _selected={{ color: 'gray-base', bg: 'white' }}
               className="w-1/2 p-0"
               rounded="lg">
               PPT
            </Tab>
         </TabList>
         <TabPanels>
            <TabPanel className="mt-4 whitespace-normal" p={0} rounded="lg">
               {selectedTab === 'pdf' && <PdfFilesTab />}
            </TabPanel>
            <TabPanel className="mt-4 whitespace-normal" p={0}>
               {selectedTab === 'img' && <ImagesFilesTab />}
            </TabPanel>
            <TabPanel className="mt-4 whitespace-normal" p={0}>
               {selectedTab === 'ppt' && <PptFilesTab />}
            </TabPanel>
         </TabPanels>
      </Tabs>
   )
}

export default FilesTab
