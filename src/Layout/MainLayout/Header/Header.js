import { signOut } from 'firebase/auth'
import { Link } from 'react-router-dom'
import logo from '../../../static/img/logo.png'
import style from './Header.module.css'
import { auth } from '../../../firebase/firebaseConfig'

export default function Header({ user, authLogin }) {
   authLogin.providerData ??= ['none']
   const provider = authLogin?.providerData[0]
   authLogin.displayName ??= 'guest'
   authLogin.email ??= 'none'
   authLogin.photoURL ??=
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_h6QOa3uNotOm0ue_LW0AABchkoq3MtRadKl6pFU&s'

   return (
      <section className={style.warp}>
         <img
            className={style.logo}
            onClick={() => {
               window.location.href = '/'
            }}
            src={logo}
            alt="avatar"
         />
         <div className={style.nav}>
            <div className={style.writeReport}>
               Viết báo cáo mới{'...'}
               <span className="material-symbols-outlined">edit_calendar</span>
               <div className={style.writeReportWrap}>
                  <ul className={style.writeReportList}>
                     <li className={style.writeReportItem}>
                        <Link to="/createshift" className={style.Link} state={{ user: user }}>
                           Viết báo cáo ca
                        </Link>
                     </li>

                     <li className={style.writeReportItem}>
                        <Link to="/createweek" className={style.Link} state={{ user: user }}>
                           Viết báo cáo tuần
                        </Link>
                     </li>

                     <li className={style.writeReportItem}>
                        <Link to="/createmonth" className={style.Link} state={{ user: user }}>
                           Viết báo cáo tháng
                        </Link>
                     </li>

                     <li className={style.writeReportItem}>
                        <Link to="/createmainten" className={style.Link} state={{ user: user }}>
                           Viết kế hoạch bảo trì
                        </Link>
                     </li>
                  </ul>
               </div>
            </div>
            <div className={style.myReport}>Báo cáo của tôi</div>
            <div className={style.account}>
               <img className={style.avatar} src={authLogin.photoURL} alt="avatar" />
               <div className={style.accountWrap}>
                  {authLogin?.displayName === 'guest' ? (
                     <>
                        <ul className={style.accountList}>
                           <li className={style.accountItem}>
                              <i>UserName:</i> none
                           </li>
                           <li className={style.accountItem}>
                              <i>Email:</i> none
                           </li>
                           <li className={style.accountItem}>
                              <i>Provider:</i> none
                           </li>
                        </ul>
                        <button
                           className={style.accountBtn}
                           onClick={() => {
                              window.location.href = '/login'
                           }}
                        >
                           Đăng Nhập
                        </button>
                     </>
                  ) : (
                     <>
                        <ul className={style.accountList}>
                           <li className={style.accountItem}>
                              <i>UserName:</i> {authLogin.displayName}
                           </li>
                           <li className={style.accountItem}>
                              <i>Email:</i> {authLogin.email}
                           </li>
                           <li className={style.accountItem}>
                              <i>Provider:</i> {provider.providerId}{' '}
                           </li>
                        </ul>
                        <button
                           className={style.accountBtn}
                           onClick={() => {
                              signOut(auth)
                                 .then(() => {
                                    // Sign-out successful.
                                    sessionStorage.removeItem('user')
                                    window.location.href = '/login'
                                 })
                                 .catch((error) => {
                                    // An error happened.
                                    alert(error)
                                 })
                           }}
                        >
                           Đăng Xuất
                        </button>
                     </>
                  )}
               </div>
            </div>
         </div>
      </section>
   )
}
