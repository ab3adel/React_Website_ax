import { Avatar, Button, Stack, VStack } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { GoPrimitiveDot } from 'react-icons/go'

function AdminContactCard({ user, online }) {
   return (
      <Button
         variant="ghost"
         size="lg"
         width="100%"
         justifyContent="space-between"
         fontWeight="600"
         className="mb-3.5"
         bgColor="gray-base"
         height="105px">
         <Stack
            spacing={7}
            pl="20px"
            height="24"
            justifyContent="flex-start"
            alignItems="center"
            direction="row">
            <div className="relative mr-3">
               {online && (
                  <GoPrimitiveDot
                     className="absolute z-10 top-0 right-0"
                     color="green"
                  />
               )}
               <Avatar
                  backgroundColor="gray.200"
               />
            </div>
            <VStack alignItems="flex-start">
               <p className="font-bold text-base text-white">{user.user}</p>
               <p className="font-normal text-base text-white">Admin</p>
            </VStack>
         </Stack>
      </Button>
   )
}

export default AdminContactCard

AdminContactCard.propTypes = {
   user: PropTypes.object.isRequired,
   online: PropTypes.bool
}
