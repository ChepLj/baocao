import googleLogin from '../../handelAction/loginHandel'
import style from './LoginLayout.module.css'
export default function LoginLayout() {
   return (
      <div className={style.container}>
         <form>
            <div className={style.row}>
               <h2 style={{ textAlign: 'center' }}>Login with Social Media or Manually</h2>
               <div className={style.vl}>
                  <span className={style.vlInnertext}>or</span>
               </div>

               <div className={style.col}>
                  <a
                     onClick={() => {
                        alert('Tính năng này đang tạm khóa, vui lòng đăng nhập với Google !')
                     }}
                     className={`${style.fb} ${style.btn}`}
                  >
                     <i className="fa fa-facebook fa-fw"></i> Login with Facebook
                  </a>
                  <a
                     onClick={() => {
                        alert('Tính năng này đang tạm khóa, vui lòng đăng nhập với Google !')
                     }}
                     className={`${style.twitter} ${style.btn}`}
                  >
                     <i className="fa fa-twitter fa-fw"></i> Login with Twitter
                  </a>
                  <a
                     onClick={() => {
                        const elementLoadding = document.createElement('span')
                        elementLoadding.classList.add('loader')
                        document.querySelector('.App').appendChild(elementLoadding)
                        googleLogin()
                     }}
                     className={`${style.google} ${style.btn}`}
                  >
                     <i className="fa fa-google fa-fw"></i> Login with Google+
                  </a>
               </div>

               <div className={style.col}>
                  <input type="text" name="username" placeholder="Username" required />
                  <input type="password" name="password" placeholder="Password" required />
                  <input type="submit" value="Login" />
               </div>
            </div>
         </form>
      </div>
   )
}
