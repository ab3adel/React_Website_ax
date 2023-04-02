import { Route, Routes } from 'react-router-dom'

import Sidebar from 'Layout/Sidebar/Sidebar'
import Login from 'Pages/Login/Login'
import Register from 'Pages/Register/Register'
import Settings from 'Components/Panels/Settings/Settings'
import Notifications from 'Components/Panels/Notifications/Notifications'
import ExploreAsync from 'Pages/Explore/ExploreAsync'
import MySpaceAsync from 'Pages/MySpace/MySpaceAsync'
import Activation from 'Pages/Activation/Activation'
import ProtectedRoute from 'Components/ProtectedRoute'
import ResetPassword from 'Pages/ResetPassword/ResetPassword'
import ConsentUser from 'Pages/ConsentUser/ConsentUser'
import AlreadyLoggedinRedirect from 'Components/AlreadyLoggedinRedirect'
import { NotFoundPage } from 'Pages/NotFoundPage'
import ForgetPassword from 'Pages/ForgetPassword/ForgetPassword'
import { useRecoilState } from 'recoil'
import { selectedView } from 'Recoil/Atoms'

export function AppRoutes() {
   const [view] = useRecoilState(selectedView)

   return (
      <Routes>
         <Route path="/" element={<Sidebar />}>
            <Route
               index
               element={
                  <ProtectedRoute>
                     {view === 'settings' && <Settings />}
                     {view === 'notifications' && <Notifications />}
                     <ExploreAsync />
                  </ProtectedRoute>
               }
            />

            <Route
               path="my-space/"
               element={
                  <ProtectedRoute>
                     {view === 'settings' && <Settings />}
                     {view === 'notifications' && <Notifications />}
                     <MySpaceAsync />
                  </ProtectedRoute>
               }>
               <Route
                  path=":id"
                  element={
                     <ProtectedRoute>
                        {view === 'settings' && <Settings />}
                        {view === 'notifications' && <Notifications />}
                        <MySpaceAsync />
                     </ProtectedRoute>
                  }
               />
            </Route>
         </Route>
         <Route
            path="forgot-password"
            element={
               <AlreadyLoggedinRedirect>
                  <ForgetPassword />
               </AlreadyLoggedinRedirect>
            }
         />
         <Route
            path="login"
            element={
               <AlreadyLoggedinRedirect>
                  <Login />
               </AlreadyLoggedinRedirect>
            }
         />
         <Route
            path="user-activation"
            element={
               <AlreadyLoggedinRedirect>
                  <Activation />
               </AlreadyLoggedinRedirect>
            }
         />
         <Route
            path="register"
            element={
               <AlreadyLoggedinRedirect>
                  <Register />
               </AlreadyLoggedinRedirect>
            }
         />
         <Route
            path="password-reset"
            element={
               <AlreadyLoggedinRedirect>
                  <ResetPassword />
               </AlreadyLoggedinRedirect>
            }
         />

         <Route path="consent" element={<ConsentUser />} />

         <Route path="*" element={<NotFoundPage />} />
      </Routes>
   )
}
