/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import { BsSearch, BsChat } from 'react-icons/bs'
import { AiOutlineSetting } from 'react-icons/ai'
import { RiEarthLine } from 'react-icons/ri'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { selectedView, userInfoAtom } from 'Recoil/Atoms'
import { FiBell } from 'react-icons/fi'
import { Avatar, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import logo from '../../Assets/logo TIP.svg'

function Sidebar() {
   const [userInfo] = useRecoilState(userInfoAtom)

   const [view, setView] = useRecoilState(selectedView)

   const path = useLocation()

   const getLocation = (location) => {
      if (view === location) return true
   }

   const navigate = useNavigate()

   const currentPath = path.pathname.split('/')

   useEffect(() => path.pathname === '/' && setView('explore'), [])

   return (
      <>
         <div className="w-24 min-w-sidebar bg-white h-screen flex flex-col align-middle sticky top-0 justify-between py-5 md:flex-row md:w-full md:items-center md:max-h-[3.7rem] md:min-h-[3.7rem] border-t md:sticky md:bottom-0 z-30 md:py-0 md:px-4">
            <div className="w-auto flex justify-center">
               <img
                  className="w-14 md:w-10"
                  alt="logo"
                  src={
                     localStorage.getItem('logo')
                  }
               />
               {/* <img className="w-14 md:w-10" alt="logo" src={logo} /> */}
            </div>
            <div className="flex flex-col align-middle justify-center md:flex-row md:gap-7">
               <NavLink
                  onClick={() => {
                     setView('explore')
                  }}
                  className={() =>
                     getLocation('explore')
                        ? 'transition ease-in-out duration-500 text-primary'
                        : 'transition-colors  text-gray-base'
                  }
                  to="/">
                  <BsSearch className="nav-icon" />
               </NavLink>
               <NavLink
                  onClick={() => {
                     setView('my-space')
                  }}
                  className={() =>
                     getLocation('my-space')
                        ? 'transition ease-in-out duration-500 text-primary'
                        : 'transition-colors  text-gray-base'
                  }
                  to={currentPath[1] === 'my-space' ? '#' : 'my-space'}>
                  <BsChat className="nav-icon" />
               </NavLink>
               <NavLink
                  onClick={() => {
                     setView('notifications')
                  }}
                  className={() =>
                     getLocation('notifications')
                        ? 'transition ease-in-out duration-500 text-primary'
                        : 'transition-colors  text-gray-base'
                  }
                  to={path.pathname}>
                  <FiBell className="nav-icon" />
               </NavLink>
               <NavLink
                  to={path.pathname}
                  onClick={() => {
                     setView('settings')
                  }}
                  className={() =>
                     getLocation('settings')
                        ? 'transition ease-in-out duration-500 text-primary'
                        : 'transition-colors  text-gray-base'
                  }>
                  <AiOutlineSetting className="nav-icon" />
               </NavLink>
               <a href="#" rel="noreferrer">
                  <RiEarthLine className="nav-icon text-gray-base" />
               </a>
            </div>
            <div className="flex justify-center">
               <Menu isLazy>
                  <MenuButton>
                     <Avatar
                        mx="auto"
                        size="md"
                        name={userInfo.first_name}
                        src={
                           process.env.REACT_APP_MEDIA_PREFIX + userInfo.photo
                        }
                     />
                  </MenuButton>
                  <MenuList>
                     {/* MenuItems are not rendered unless Menu is open */}
                     <MenuItem onClick={() => setView('settings')}>
                        Profilo
                     </MenuItem>
                     <MenuItem
                        onClick={() => {
                           localStorage.removeItem('token')
                           setTimeout(() => navigate('/login'), 1000)
                        }}>
                        disconnettersi
                     </MenuItem>
                  </MenuList>
               </Menu>
            </div>
         </div>
         <Outlet />
      </>
   )
}

export default Sidebar
