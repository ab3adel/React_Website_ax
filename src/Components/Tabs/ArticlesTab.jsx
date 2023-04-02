import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import AllArticlesTab from './AllArticlesTab'
import { NewsTab } from './NewsTab'
import VideosTab from './VideosTab'

function ArticlesTab() {
   const { t } = useTranslation('common')

   const [selectedTab, setSelectedTab] = useState('all')

   return (
      <Tabs
         className="justify-around w-full"
         variant="solid-rounded"
         colorScheme="whiteAlpha">
         <TabList className="bg-gray-light w-[95%] mx-auto rounded-lg p-1">
            <Tab
               _selected={{ color: 'gray-base', bg: 'white' }}
               className="w-1/2 p-0"
               rounded="lg"
               onClick={() => setSelectedTab('all')}
               boxShadow="none">
               {t('chat.drawer.article.all')}
            </Tab>
            <Tab
               _selected={{ color: 'gray-base', bg: 'white' }}
               boxShadow="none"
               outline="none"
               onClick={() => setSelectedTab('videos')}
               className="w-1/2 p-0"
               rounded="lg">
               {t('chat.drawer.article.videos')}
            </Tab>
            <Tab
               _selected={{ color: 'gray-base', bg: 'white' }}
               className="w-1/2 p-0"
               onClick={() => setSelectedTab('news')}
               rounded="lg">
               {t('chat.drawer.article.news')}
            </Tab>
         </TabList>
         <TabPanels>
            <TabPanel className="mt-4 whitespace-normal" p={0}>
               {selectedTab === 'all' && <AllArticlesTab />}
            </TabPanel>

            <TabPanel className="mt-4 whitespace-normal" p={0}>
               {selectedTab === 'videos' && <VideosTab />}
            </TabPanel>

            <TabPanel className="mt-4 whitespace-normal" p={0}>
               {selectedTab === 'news' && <NewsTab />}
            </TabPanel>
         </TabPanels>
      </Tabs>
   )
}

export default ArticlesTab
