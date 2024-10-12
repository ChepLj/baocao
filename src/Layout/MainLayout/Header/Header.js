import { signOut } from 'firebase/auth'
import { Link } from 'react-router-dom'
import logo from '../../../static/img/logo.png'
import style from './Header.module.css'
import { auth } from '../../../firebase/firebaseConfig'
import { getFirebaseData } from './../../../handelAction/getFirebaseData';
import createPostData from './../../../handelAction/createDataPost/createPostData';

export default function Header({ user, authLogin }) {
   authLogin.providerData ??= ['none']
   const provider = authLogin?.providerData[0]
   authLogin.displayName ??= 'guest'
   authLogin.email ??= 'none'
   authLogin.photoURL ??=
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_h6QOa3uNotOm0ue_LW0AABchkoq3MtRadKl6pFU&s'

   //: làm chương trình xem và đổi mã định danh
   const handelViewUserID = ()=>{
      //TODO: làm chức năng xem mã định danh
      getFirebaseData('UserID')
      .then(data => {
         const UserIDList = data.val()
               
         for( const user in UserIDList ) {
            if(UserIDList[user].email === authLogin.email){
               return alert(`Mã định danh của bạn là : ${user.slice(0, user.length - 4)}****`)
            }
         } 
         alert('Không tìm thấy mã định danh của bạn, hãy tạo mã định danh để thuận tiện xác nhận báo cáo!')       
      })     
   }
   const handelChangeUserID = () => {
      //TODO: làm chức năng Đổi mã định danh
      //:hàm callback khi upload xong UserID mới
      const uploadCallback = () => {
         //TODO: gọi lại lên firebase để xem mã định danh mới
         getFirebaseData('UserID').then((data) => {
            const UserIDList = data.val()            
            for (const user in UserIDList) {
               if (UserIDList[user].email === authLogin.email) {
                  return alert(`Thành công ! Mã định danh mới của bạn là : ${user.slice(0, user.length - 4)}****`)
               }
            }
            alert('Có lỗi không xác định xảy ra khi cố gắng lấy UserID mới ! liên hệ Mr.Sỹ để biết thêm chi tiết')
         })
      }
      ////////////////////////////////////
      const inputText = prompt('Nhập mã định danh mới .\nBao gồm 8 ký tự trở lên bao gồm cả chữ và số\nChỉ chấp nhận [a-z] [A-Z] [0-9] và dấu gạch dưới\nPhân biệt HOA thường và không chứa khoảng trắng')
      var passw = /(?=.*\d)^[A-Za-z]\w{6,64}$/
      if (inputText.match(passw)) {
         const inputText2 = prompt('Nhập lại mã định danh mới')
         if(inputText === inputText2){
            //TODO: Gọi lên firebase lấy UserID để kiểm tra tồn tại, sau đó Lấy Ref để xóa nếu tồn tại
               getFirebaseData('UserID').then((data)=>{
                  const UserIDList = data.val()
                  for( const user in UserIDList){
                     if(user === inputText){//:kiểm tra nếu đã tồn tại thì không cho phép thêm và thoát vòng lặp
                        return alert('Mã định danh này không được chấp nhận, vui lòng thay bằng mã định danh khác !\nhoặc liên hệ Mr.Sỹ để biết thêm chi tiết ')
                     }
                  }
                  //:nếu chưa tồn tại thì dò mã định danh cũ của currentUser để xóa trước khi thêm mới(xóa bằng cách thêm giá trị null)
                 
                  for( const user in UserIDList ) {
                     if(UserIDList[user].email === authLogin.email){   
                        //TODO: Xóa UserID cũ
                        createPostData(`UserID/${user}`, null)
                        .then(()=>{console.log('đã xóa UserID')})
                        .catch(error=> alert(error))
                        break
                     }
                  } 
                  //TODO: them UserID moi
                  const objectPost = {}
                        objectPost.avatar = authLogin.photoURL
                        objectPost.email = authLogin.email
                        objectPost.name = authLogin.displayName
                        objectPost.provider = provider.providerId
                  createPostData(`UserID/${inputText}`, objectPost)
                  .then(()=>{uploadCallback()})
                  ////////////////////////////////////
               })
         }else{
            alert('Lỗi: Mã không khớp')
         }
         
      } else {
         alert('Wrong...! Mã định danh không hợp lệ !')
         return false
      }
   }
   ///////////////////
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
               <span className={`material-symbols-outlined ${style.writeReportIcon}`}>edit_calendar</span>
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
                              <i>Provider:</i> {provider.providerId}
                           </li>
                           
                        </ul>
                        <div className={style.userIDWrap}>
                              <span className={style.userID} onClick={handelViewUserID}>Xem mã định danh</span>
                              <span className={style.userID} onClick={handelChangeUserID}>Đổi mã định danh</span>
                           </div>
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
