import { update } from 'firebase/database'
import { dbRT } from '../../firebase/firebaseConfig'


export default function createPostData(ref,objectData) {
   const updates = {}
   updates[ref] = objectData
   return update(dbRT, updates)
  }
  ////////////
