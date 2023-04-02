import React from 'react'
import { useTranslation } from 'react-i18next'
import noData from '../Assets/NoData.svg'

export function NoCommunities() {
   const { t } = useTranslation('common')

   return (
      <div className="w-full md:px-5 flex flex-col gap-8 justify-center items-center h-screen">
         <img className="w-2/4 md:w-3/4" alt="NoCommunities" src={noData} />
         <h1 className="text-gray-base font-normal text-xl md:text-base">
            {t('chat.select_community')}
         </h1>
      </div>
   )
}
