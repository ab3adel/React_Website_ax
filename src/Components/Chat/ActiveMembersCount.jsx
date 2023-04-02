import { useActiveMembersCount } from 'Hooks/useActiveMembersCount'
import { useTranslation } from 'react-i18next'

export function ActiveMembersCount({ members_count }) {
   const { t } = useTranslation('common')
   const { onlineMembers } = useActiveMembersCount()

   return (
      <p className="text-gray-base text-sm md:text-xs">
         {members_count} {t('chat.header.members')}, {onlineMembers}{' '}
         {t('chat.header.online')}
      </p>
   )
}
