import {
   Button,
   Input,
   Radio,
   RadioGroup,
   Textarea,
   useToast
} from '@chakra-ui/react'
import { useSuggestCommunityQuery } from 'Hooks/queries/useSuggestCommunityQuery'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoChatbubble } from 'react-icons/io5'
import { MdKeyboardArrowRight } from 'react-icons/md'
import CollapsibleButton from './CollapsibleButton'

function SuggestNewCommunity() {
   const [suggestInputsValue, setSuggestInputsValue] = useState({
      title: '',
      purpose: '',
      type: '1'
   })

   const { isLoading, mutate } = useSuggestCommunityQuery()

   const toast = useToast()

   const { t } = useTranslation('common')

   const handleSubmit = () => {
      if (
         suggestInputsValue.purpose.length > 0 &&
         suggestInputsValue.title.length > 0
      ) {
         mutate(suggestInputsValue)

         setSuggestInputsValue({
            title: '',
            purpose: '',
            type: '1'
         })
      } else {
         toast({
            title: t('error'),
            position: 'top',
            description: t('toasts.fill_field'),
            status: 'warning',
            isClosable: true
         })
      }
   }

   return (
      <CollapsibleButton
         icon={<IoChatbubble className="text-2xl" />}
         text={t('explore.suggest_community.btn')}>
         <>
            <Input
               className="mb-4"
               type="text"
               variant="filled"
               value={suggestInputsValue.title}
               placeholder={t('explore.suggest_community.title')}
               onChange={(e) =>
                  setSuggestInputsValue({
                     ...suggestInputsValue,
                     title: e.target.value
                  })
               }
            />
            <Textarea
               className="mb-4"
               type="text"
               variant="filled"
               value={suggestInputsValue.purpose}
               placeholder={t('explore.suggest_community.purpose')}
               onChange={(e) =>
                  setSuggestInputsValue({
                     ...suggestInputsValue,
                     purpose: e.target.value
                  })
               }
            />

            <div>
               <div className="my-2">
                  <h6 className="text-primary text-sm my-2">
                     {t('explore.suggest_community.target')}
                  </h6>
                  <RadioGroup
                     name="type"
                     value={suggestInputsValue.type}
                     onChange={(v) =>
                        setSuggestInputsValue({
                           ...suggestInputsValue,
                           type: v
                        })
                     }>
                     <div className="flex-col flex my-2 gap-3">
                        <Radio value="1" colorScheme="red" size="sm">
                           {t('explore.suggest_community.public')}
                        </Radio>
                        <Radio value="2" colorScheme="red" size="sm">
                           {t('explore.suggest_community.private')}
                        </Radio>
                     </div>
                  </RadioGroup>
               </div>

               <Button
                  type="submit"
                  onClick={handleSubmit}
                  loadingText={t('explore.suggest_community.submitting')}
                  isLoading={isLoading}
                  spinnerPlacement="end"
                  justifyContent="space-between"
                  rightIcon={<MdKeyboardArrowRight className="text-2xl" />}
                  variant="solid">
                  {t('explore.suggest_community.send')}
               </Button>
            </div>
         </>
      </CollapsibleButton>
   )
}

export default SuggestNewCommunity
