import { recoilPersist } from 'recoil-persist'

const { atom } = require('recoil')

const { persistAtom } = recoilPersist()

export const repliedMessageAtom = atom({
   key: 'repliedMessageAtom',
   default: null
})

export const isUserRegistered = atom({
   key: 'isUserRegistered',
   default: false
})

export const selectedView = atom({
   key: 'selectedView',
   default: 'explore',
   effects_UNSTABLE: [persistAtom]
})

export const abilitiesArr = atom({
   key: 'abilities',
   default: [],
   effects_UNSTABLE: [persistAtom]
})

export const selectedCommunityId = atom({
   key: 'selectedCommunityId',
   default: '',
   effects_UNSTABLE: [persistAtom]
})

export const userIdAtom = atom({
   key: 'userId',
   default: '',
   effects_UNSTABLE: [persistAtom]
})

export const messagesArrAtom = atom({
   key: 'messagesArr',
   default: []
})

export const selectedCommunityName = atom({
   key: 'selectedCommunityName',
   default: '',
   effects_UNSTABLE: [persistAtom]
})

export const drawerIsOpenAtom = atom({
   key: 'drawerIsOpenAtom',
   default: false,
   effects_UNSTABLE: [persistAtom]
})

export const pageIndexAtom = atom({
   key: 'pageIndexAtom',
   default: 1
})

export const activeUsersAtom = atom({
   key: 'activeUsersAtom',
   default: [],
   effects_UNSTABLE: [persistAtom]
})

export const recievedMessagesAtom = atom({
   key: 'recievedMessagesAtom',
   default: []
})

export const recievedMessagesCountAtom = atom({
   key: 'recievedMessagesCountAtom',
   default: []
})

export const vendorIdAtom = atom({
   key: 'vendorIdAtom',
   default: '',
   effects_UNSTABLE: [persistAtom]
})

export const userInfoAtom = atom({
   key: 'userInfo',
   default: {},
   effects_UNSTABLE: [persistAtom]
})

export const showConfrenceWindowAtom = atom({
   key: 'showConfrence',
   default: false,
   effects_UNSTABLE: [persistAtom]
})

export const confrencesIdAtom = atom({
   key: 'confrencesIdAtom',
   default: [],
   effects_UNSTABLE: [persistAtom]
})

export const zoomWindowAtom = atom({ default: false, key: 'isZoomWindow' })

export const zoomMeetingIdAtom = atom({
   default: 0,
   key: 'zoomMeetingId',
   effects_UNSTABLE: [persistAtom]
})
