import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { AiOutlineSearch } from 'react-icons/ai'
import { useTranslation } from 'react-i18next'

function SearchInput() {
   const { t } = useTranslation('common')

   return (
      <InputGroup
         size="lg"
         height="14"
         className="self-center w-full justify-center my-4">
         <InputLeftElement
            pointerEvents="none"
            className="relative"
            height="14"
            children={<AiOutlineSearch className="text-gray-base" />}
         />
         <Input
            className="self-center justify-center font-medium"
            type="text"
            variant="filled"
            placeholder={t('explore.search')}
         />
      </InputGroup>
   )
}

export default SearchInput
