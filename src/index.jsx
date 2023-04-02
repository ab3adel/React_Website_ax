import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { ChakraProvider } from '@chakra-ui/react'
import { i18nextInit } from 'Configs/i18nextInit'
import { QueryClient, QueryClientProvider } from 'react-query'
import { CookiesProvider } from 'react-cookie'
import App from './App'
import './index.css'
import { theme } from './Configs/chakraTheme'

/* Initializing the i18next library. */
i18nextInit()

const queryClient = new QueryClient({})

ReactDOM.render(
   <BrowserRouter>
      <CookiesProvider>
         <ChakraProvider theme={theme}>
            <RecoilRoot>
               <QueryClientProvider client={queryClient}>
                  <App />
               </QueryClientProvider>
            </RecoilRoot>
         </ChakraProvider>
      </CookiesProvider>
   </BrowserRouter>,
   document.getElementById('root')
)
