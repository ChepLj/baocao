import style from './Header.module.css'
import { Link } from 'react-router-dom'

export default function Header({ user, auth }) {
   auth.displayName ??= 'guest'
   auth.email ??= 'none'
   auth.photoURL ??=
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_h6QOa3uNotOm0ue_LW0AABchkoq3MtRadKl6pFU&s'

   return (
      <section className={style.warp}>
         <img
            className={style.logo}
            onClick={() => {
               window.location.href = '/'
            }}
            src={
               'https://down.699pic.com/element/40024/9047.png?_upt=849453e71664874767&_upd=Lovepik_com-400249047-a-row-of-files.png'
            }
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
            <img className={style.avatar} src={auth.photoURL} />
         </div>
      </section>
   )
}
