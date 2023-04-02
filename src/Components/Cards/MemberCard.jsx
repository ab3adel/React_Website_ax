import { Avatar, VStack } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { GoPrimitiveDot } from 'react-icons/go'
import { useRecoilState } from 'recoil'
import { activeUsersAtom } from 'Recoil/Atoms'
// import { FaTrash } from 'react-icons/fa'

function MemberCard({ user }) {
   const [activeUsers] = useRecoilState(activeUsersAtom)

   const userFromDate = user.created_at.split('/')

   return (
      <div className="py-2 px-3 mb-3.5 gap-2 transition-all w-full flex items-center bg-white rounded-lg cursor-pointer">
         <div className="relative mr-3">
            {activeUsers.map(({ user_id }) => {
               if (user.id === user_id) {
                  return (
                     <GoPrimitiveDot
                        key={user.id}
                        className="absolute z-10 top-0 right-0"
                        color="green"
                     />
                  )
               }
            })}
            <Avatar
               name={user.first_name}
               src={process.env.REACT_APP_MEDIA_PREFIX + user.photo}
            />
         </div>
         <VStack className="flex-grow" alignItems="flex-start">
            <p className="font-bold text-base text-black">
               {user.first_name} {user.last_name}
            </p>
            <p className="text-gray-dark text-sm font-normal">
               user since {userFromDate[1]} {userFromDate[2].split(' ')[0]}{' '}
               {userFromDate[0]}
            </p>
         </VStack>
         {/* <FaTrash className="text-gray-base text-lg " /> */}
      </div>
   )
}

export default MemberCard

MemberCard.propTypes = {
   user: PropTypes.object.isRequired
}
