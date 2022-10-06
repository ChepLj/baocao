import { signInWithPopup } from 'firebase/auth'
import { auth, providerGG } from '../firebase/firebaseConfig'

export default function googleLogin() {
   signInWithPopup(auth, providerGG)
      .then((result) => {
         // The signed-in user info.

         sessionStorage.setItem('user', JSON.stringify(result.user))
         if (sessionStorage.getItem('user')) {
            window.location.href = '/'
         }
      })
      .catch((error) => {
         alert(error)
      })
}
