import { Navigate } from 'react-router-dom'

function AlreadyLoggedinRedirect({ children }) {
   const token = localStorage.getItem('token')

   if (token)
      return <Navigate to="/" replace state={{ alreadyLoggedin: true }} />

   return children
}

export default AlreadyLoggedinRedirect
