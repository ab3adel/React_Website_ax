import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { useApiRequests } from 'API/apiRequests'

import ConfrenceCard from 'Components/Cards/ConfrenceCard'
import LoadingPage from 'Components/LoadingPage'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import { confrencesIdAtom } from 'Recoil/Atoms'

function Confrences() {
   const { getConfrecesList } = useApiRequests()
   const [, setConfrences] = useRecoilState(confrencesIdAtom)
   const { data, isLoading } = useQuery(['confrences'], getConfrecesList, {
      onSuccess: () => {
         setConfrences(data?.data)
      }
   })

   if (isLoading) return <LoadingPage />

   return (
      <div>
         <Tabs
            className="justify-around w-full"
            variant="solid-rounded"
            colorScheme="whiteAlpha">
            <TabList className="bg-gray-light rounded-lg p-1 h-14">
               <Tab
                  _selected={{ color: 'gray-base', bg: 'white' }}
                  className="w-1/2 p-0"
                  rounded="lg">
                  Next
               </Tab>
               <Tab
                  _selected={{ color: 'gray-base', bg: 'white' }}
                  boxShadow="none"
                  outline="none"
                  className="w-1/2 p-0"
                  rounded="lg">
                  Past
               </Tab>
            </TabList>
            <TabPanels>
               <TabPanel className="mt-4" p={0} rounded="lg">
                  <div>
                     {data?.data.map(
                        ({ _id, past, from, to, zoom_meeting_id, name }) => {
                           if (past === 0) {
                              return (
                                 <ConfrenceCard
                                    key={_id}
                                    id={_id}
                                    zoom_meeting_id={zoom_meeting_id}
                                    name={name}
                                    date={`from ${from} to ${to}`}
                                 />
                              )
                           }
                        }
                     )}
                  </div>
               </TabPanel>
               <TabPanel className="mt-4" p={0}>
                  {data?.data.map(
                     ({ _id, past, from, to, zoom_meeting_id, name }) => {
                        if (past === 1) {
                           return (
                              <ConfrenceCard
                                 key={_id}
                                 zoom_meeting_id={zoom_meeting_id}
                                 id={_id}
                                 past={past === 1}
                                 name={name}
                                 date={`from ${from} to ${to}`}
                              />
                           )
                        }
                     }
                  )}
               </TabPanel>
            </TabPanels>
         </Tabs>
      </div>
   )
}

export default Confrences
