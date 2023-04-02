import { useRecoilState } from 'recoil'
import { selectedCommunityId } from 'Recoil/Atoms'
import { useAxiosInstance } from './axiosInstance'

export const useApiRequests = () => {
   const { axiosClient } = useAxiosInstance()

   const [communityId] = useRecoilState(selectedCommunityId)

   return {
      getEviroment: async () => axiosClient.get('/vendor/info'),

      getProfession: async () => axiosClient.get('/user/prof_prov'),

      getProfile: async () => axiosClient.get('/user/profile'),

      getProfileSettings: async () => axiosClient.get('/user/profile-settings'),

      updateProfileSettings: async (data) =>
         axiosClient.post('/user/profile-settings/update', data),

      changePassword: async (data) =>
         axiosClient.post('/user/change-password', data),

      updateProfile: async (data) =>
         axiosClient.post('/user/profile/update', data),

      getSpecializations: async (data) =>
         axiosClient.post('/user/specializations', data),

      login: async (data) => axiosClient.post('/user/login', data),

      register: async (data) => axiosClient.post('/user/register', data),

      activateUser: async (data) => axiosClient.post('/user/activate', data),

      consent: async (data) => axiosClient.post('/user/consent', data),

      requestPassword: async (data) =>
         axiosClient.post('/user/request-password', data),

      resetPassword: async (data) =>
         axiosClient.post('/user/reset-password', data),

      getSpaceUsers: async () => axiosClient.get('/vendor/user'),

      getCommunities: async () => axiosClient.get('/community'),

      getUserCommunities: async () => axiosClient.get('/user/community'),

      getCommunityMessages: async (id, perPage, page) =>
         axiosClient.get(
            `conversation/${id}/?per_page=${perPage}&page=${page}`
         ),

      getCommunitiesArticles: async (id, perPage, page) =>
         axiosClient.get(
            `/community/${id}/article?per_page=${perPage}&page=${page}`
         ),

      getCommunitiesFiles: async (id, perPage, page) =>
         axiosClient.get(
            `attachment/${id}/all?per_page=${perPage}&page=${page}`
         ),

      getCommunityMembers: async (id) =>
         axiosClient.get(`/community/${id}/user`),

      joinCommunity: async (data) => axiosClient.post('/community/join', data),

      downloadFile: async (id) =>
         axiosClient.get(`/attachment/download/${id}`, {
            responseType: 'blob',
            headers: { 'Access-Control-Allow-Origin': '*', mode: 'no-cors' }
         }),

      previewFile: async (id) => axiosClient.get(`/attachment/preview/${id}`),

      suggestCommunity: async (data) =>
         axiosClient.post('/community/suggest', data),

      getConfrecesList: async () => axiosClient.get('/user/conference'),

      cancelJoinRequestCommunity: async (id) =>
         axiosClient.delete(`/community/${id}/exit`),

      sendMessage: async (data) => {
         const response = await axiosClient.post(
            `/conversation/${communityId}/message/send`,
            data
         )
         return response
      },
      getZomeSign: (zoom_meeting_id) =>
         axiosClient.get(`/zoom/sign?meeting_number=${zoom_meeting_id}`)
   }
}
