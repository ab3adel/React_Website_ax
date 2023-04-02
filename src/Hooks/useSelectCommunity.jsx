import { useRecoilState } from 'recoil'
import {
   drawerIsOpenAtom,
   pageIndexAtom,
   selectedCommunityId,
   selectedCommunityName,
   showConfrenceWindowAtom
} from 'Recoil/Atoms'
import { useNavigate, useParams } from 'react-router-dom'

/**
 * It's a custom hook that returns a function that sets the state of the app to the community that was
 * selected.
 * @returns The return value is an object with two properties: handleSelectCommunity and paramId.
 */
export const useSelectCommunity = () => {
   const [, setDrawerIsOpen] = useRecoilState(drawerIsOpenAtom)

   const [, setCommunityName] = useRecoilState(selectedCommunityName)

   const [, setcommunityId] = useRecoilState(selectedCommunityId)

   const [, setPageIndex] = useRecoilState(pageIndexAtom)

   const navigate = useNavigate()

   const params = useParams()

   const [, setShowConfrenceWindow] = useRecoilState(showConfrenceWindowAtom)

   /**
    * When a user clicks on a community, the drawer closes, the page index is set to 1, the community name
    * and members count are set, and the community id is set.
    */
   const handleSelectCommunity = (id, name, members_count) => {
      setPageIndex(1)
      navigate(`/my-space/${id}`, {
         replace: true
      })
      setCommunityName({ name, members_count })
      setcommunityId(id)
      setShowConfrenceWindow(false)
      setDrawerIsOpen(false)
   }

   return { handleSelectCommunity, urlParamId: params.id }
}
