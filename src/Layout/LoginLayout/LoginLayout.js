import { getRedirectResult } from 'firebase/auth'
import googleLogin from '../../handelAction/loginHandel'
import { auth } from '../../firebase/firebaseConfig'
import style from './LoginLayout.module.css'
import adminIcon from '../../static/img/admin.jpg'
import guestIcon from '../../static/img/guest.jpg'

export default function LoginLayout() {
   // lấy user khi reload lại trang
   getRedirectResult(auth)
      .then((result) => {
         console.log(result)
         // The signed-in user info.
         if (result) {
            // document.querySelector('.loader').remove()
            sessionStorage.setItem('user', JSON.stringify(result.user))
            if (sessionStorage.getItem('user')) {
               window.location.href = '/'
            }
         }
      })
      .catch((error) => {
         alert(error)
         // document.querySelector('.loader').remove()
      })
   //////////

   const handelManualLogin = () => {
      /////////admin Account
      if (document.querySelector('input[name="username"]').value === 'admin') {
         if (
            document.querySelector('input[name="password"]').value ===
            process.env.REACT_APP_ADMINPASSWORD
         ) {
            sessionStorage.setItem(
               'user',
               JSON.stringify({
                  displayName: 'Admin',
                  email: 'permission',
                  providerData: [{ providerId: 'manual' }],
                  photoURL: adminIcon,
               }),
            )
            window.location.href = '/'
         } else {
            alert('Sai mật khẩu')
         }
      } else if (document.querySelector('input[name="username"]').value === 'guest') {
         if (
            document.querySelector('input[name="password"]').value ===
            process.env.REACT_APP_GUESTPASSWORD
         ) {
            sessionStorage.setItem(
               'user',
               JSON.stringify({
                  displayName: 'Guest',
                  email: 'none',
                  providerData: [{ providerId: 'manual' }],
                  photoURL: guestIcon,
               }),
            )
            window.location.href = '/'
         } else {
            alert('Sai mật khẩu')
         }
      } else {
         alert('Tài khoản không tồn tại')
      }
   }
   /////////////////
   return (
      <div className={style.container}>
         <form>
            <div className={style.row}>
               <h2 style={{ textAlign: 'center' }}>Login with Social Media or Manually</h2>
               <div className={style.vl}>
                  <span className={style.vlInnertext}>or</span>
               </div>

               <div className={style.col}>
                  <div
                     onClick={() => {
                        alert('Tính năng này đang tạm khóa, vui lòng đăng nhập với Google !')
                     }}
                     className={`${style.fb} ${style.btn}`}
                  >
                     <i className="fa fa-facebook fa-fw"></i> Login with Facebook
                  </div>
                  <div
                     onClick={() => {
                        alert('Tính năng này đang tạm khóa, vui lòng đăng nhập với Google !')
                     }}
                     className={`${style.twitter} ${style.btn}`}
                  >
                     <i className="fa fa-twitter fa-fw"></i> Login with Twitter
                  </div>
                  <div
                     onClick={() => {
                        const elementLoadding = document.createElement('span')
                        elementLoadding.classList.add('loader')
                        document.querySelector('.App').appendChild(elementLoadding)
                        googleLogin()
                     }}
                     className={`${style.google} ${style.btn}`}
                  >
                     <i className="fa fa-google fa-fw"></i> Login with Google+
                  </div>
               </div>

               <div className={style.col}>
                  <input type="text" name="username" placeholder="Username" required />
                  <input type="password" name="password" placeholder="Password" required />
                  <input
                     type="submit"
                     value="Login"
                     onClick={(e) => {
                        e.preventDefault()
                        handelManualLogin()
                     }}
                  />
               </div>
            </div>
         </form>
      </div>
   )
}
