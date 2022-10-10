import { update } from 'firebase/database'
import { terminate } from 'firebase/firestore'
import { useRef, useState } from 'react'
import { dbRT } from '../../../../../firebase/firebaseConfig'
import SaveModal from '../../../../../Modal/SaveModal/SaveModal'
import style from './WeekReport.module.css'

export default function WeekReport({ data, authEmailCurrent }) {
   const arrayData = []
   if (data) {
      for (const key in data) arrayData.push(data[key])
      arrayData.reverse()
   }
   return (
      <section className={style.warp}>
         <div className={style.title}>Báo cáo tuần</div>
         <div className={style.elementsWarp}>
            {arrayData.map((crr, index) => {
               return <ElementDoc data={crr} key={index} authEmailCurrent={authEmailCurrent} />
            })}
         </div>
      </section>
   )
}

function ElementDoc({ data, authEmailCurrent }) {
   const [state, setState] = useState(false)
   const ref = useRef(data.ref)
   ////////////////////
   const handelConfirm = (ref) => {
      let valueConfirm = prompt('Nhập mã sau để xóa ( pomina3-btdbf )', '(nhập chính xác có dấu)')
      if (valueConfirm.trim() === 'pomina3-btdbf') {
         handelDelete(ref)
      } else {
         alert('Lỗi ! Mã xác thực không đúng !!!')
      }
   }
   const handelDelete = (ref) => {
      const object = {}
      const newReportRef = 'NewReport/' + ref.replace(/[^0-9]/g, '')
      object[ref] = null
      object[newReportRef] = null
      // dung hàm update với giá trị null để xóa
      update(dbRT, object)
         .then((result) => {
            window.location.href = '/'
            alert('Xóa thành công !!!')
         })
         .catch((error) => {
            alert('Lỗi', error)
         })
   }
   ////////////////
   return (
      <>
         <section
            className={style.documentWarp}
            onClick={() => {
               setState(true)
            }}
         >
            <div className={style.document}>
               Báo cáo Tuần{' '}
               <span style={{ color: 'red', fontSize: '22px', fontWeight: '700' }}>
                  <br />
                  {data.date.week}
               </span>
               <br />
               Tháng{' '}
               <span style={{ color: 'green', fontSize: '22px', fontWeight: '700' }}>
                  {data.date.month}
               </span>
               <br />
               <span className={style.userName}>{data.user}</span>
               <div className={style.time}>{data.date.timestamp}</div>
            </div>
            {data.authEmail === authEmailCurrent && (
               <span
                  className={`${style.delete} material-symbols-outlined `}
                  onClick={(event) => {
                     handelConfirm(data.ref)
                     // handelDelete(data.ref)
                     event.stopPropagation()
                  }}
               >
                  delete
               </span>
            )}
         </section>
         {/* ẩn hiện Save Modal */}
         {state && (
            <SaveModal
               type={'weekReport'}
               upload={false}
               refDirection={ref.current}
               callBackClose={(value) => {
                  setState(false)
               }}
            />
         )}
      </>
   )
}
