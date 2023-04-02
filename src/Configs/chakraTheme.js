import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
   fonts: { body: 'Roboto', heading: 'Roboto' },
   components: {
      Button: {
         baseStyle: { _focus: { boxShadow: 'none' } },
         variants: {
            solid: () => ({
               bg: 'primary',
               rounded: 'lg',
               color: 'white',
               height: '14',
               w: 'full',
               _disabled: {
                  bgColor: 'primary',
                  opacity: 0.5
               },
               _hover: {
                  bg: 'primary',
                  _disabled: {
                     bgColor: 'primary'
                  }
               },
               _active: { bg: 'rose' }
            }),
            ghost: () => ({
               bg: 'white',
               rounded: 'lg',
               borderRadius: '5px',
               color: 'primary',
               _hover: { bg: 'red.50' },
               _active: { bg: 'red.100' }
            }),
            fade: () => ({
               bg: 'gray-light',
               w: 'full',
               rounded: 'lg',
               color: 'gray-base'
            }),
            white: () => ({
               bg: 'white',
               rounded: 'lg',
               borderRadius: '5px',
               color: 'gray-base'
            })
         }
      },
      Tabs: {
         baseStyle: {
            rounded: 'lg',
            tab: {
               _focus: {
                  boxShadow: 'none'
               }
            }
         }
      },
      Input: {
         variants: {
            light: {
               field: {
                  height: 6,
                  marginTop: 0,
                  rounded: 'lg',
                  backgroundColor: 'white',
                  textColor: 'gray-base',
                  _focus: {
                     border: '2px solid',
                     boxShadow: 'none'
                  }
               }
            },
            filled: {
               field: {
                  border: '2px solid',
                  backgroundColor: 'gray-light',
                  textColor: 'blue-dark',
                  rounded: 'lg',
                  height: 14,
                  fontSize: 'md',
                  _focus: {
                     borderColor: 'primary',
                     boxShadow: 'none'
                  }
               }
            }
         }
      },
      Select: {
         variants: {
            filled: {
               field: {
                  border: '2px solid',
                  backgroundColor: 'gray-light',
                  textColor: 'blue-dark',
                  rounded: 'lg',
                  height: 14,
                  fontSize: 'md',
                  _focus: {
                     borderColor: 'primary',
                     boxShadow: 'none'
                  }
               }
            }
         }
      },
      Textarea: {
         variants: {
            filled: {
               border: '2px solid',
               backgroundColor: 'gray-light',
               textColor: 'blue-dark',
               rounded: 'lg',
               fontSize: 'md',
               _focus: {
                  borderColor: 'primary',
                  boxShadow: 'none'
               }
            }
         }
      }
   },
   styles: {},
   colors: {
      primary: 'var(--primary)',
      rose: '#e28a9f',
      'gray-light': '#E9EFF5',
      'gray-lightest': '#F5F8FA',
      'gray-dark': '#8CA0BF',
      // 'blue-dark': '#263246',
      'gray-base': 'var(--secondary)',
      'gray-md': '#838EA4'
   }
})
