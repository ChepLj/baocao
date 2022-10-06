import { child, get } from 'firebase/database'
import { dbRT } from '../firebase/firebaseConfig'

export const getFirebaseData = (ref) => {
   try {
      return get(child(dbRT, ref))
   } catch (error) {
      console.log(error)
   }
}
