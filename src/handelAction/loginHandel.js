import { signInWithRedirect } from 'firebase/auth'
import { auth, providerGG } from '../firebase/firebaseConfig'

export default function googleLogin() {
   signInWithRedirect(auth, providerGG)
}
