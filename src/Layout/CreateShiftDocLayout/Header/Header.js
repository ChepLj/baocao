import { useState } from 'react'
import SaveModal from '../../../Modal/SaveModal/SaveModal'
import style from './Header.module.css'

export default function Header({ auth }) {
   const [state, setState] = useState(false)
   auth.displayName ??= 'guest'
   auth.email ??= 'none'
   auth.photoURL ??= 'https://cdn4.iconfinder.com/data/icons/hotel-service-5/300/guest-512.png'

   // Check bỏ trống trường sự cố
   const validateIsuue = () => {
      const issueElm = document.querySelectorAll('.create-issue')
      const jobElm = document.querySelectorAll('.create-job')
      const planElm = document.querySelectorAll('.create-plan')
      const proposeElm = document.querySelectorAll('.create-propose')
      const collectElm = [...jobElm, ...planElm, ...proposeElm]

      for (const item of issueElm) {
         const pTagInput = item.getElementsByTagName('p')
         for (const item of pTagInput) {
            if (item.innerText.trim() === '') {
               alert('LỖI ! Trường sự cố phải điền đẩy đủ tất cả thông tin !!!')
               return false
            }
         }
      }
      /////////////// Check dữ liệu trống
      for (const item of collectElm) {
         const pTagInput = item.getElementsByTagName('p')
         for (const item of pTagInput) {
            if (!(item.innerText.trim() === '')) {
               return true
            }
         }
      }
      ////////////////
      alert('LỖI ! Phải điền ít nhất 1 trường')
   }
   /////////
   return (
      <section className={style.warp}>
         <div
            className={style.home}
            onClick={() => {
               window.location.href = '/'
            }}
         >
            <img
               className={style.logo}
               src={
                  'https://down.699pic.com/element/40024/9047.png?_upt=849453e71664874767&_upd=Lovepik_com-400249047-a-row-of-files.png'
               }
            />
            Quay về trang chủ
         </div>

         <div className={style.nav}>
            <div
               className={style.writeReport}
               onClick={() => {
                  setState(validateIsuue)
               }}
            >
               Lưu báo cáo{'...'}
               <span className="material-symbols-outlined">save</span>
            </div>

            <img className={style.avatar} src={auth.photoURL} />
         </div>
         {/* ẩn hiện Save Modal */}
         {state && (
            <SaveModal
               callBackClose={(value) => {
                  // setState(value)
                  window.location.href = '/create'
               }}
            />
         )}
      </section>
   )
}
