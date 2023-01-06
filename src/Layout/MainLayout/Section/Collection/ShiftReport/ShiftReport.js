import style from './ShiftReport.module.css'
import { useRef, useState,useEffect } from 'react'
import SaveModal from '../../../../../Modal/SaveModal/SaveModal'
import { dbRT } from '../../../../../firebase/firebaseConfig'
import { update } from 'firebase/database'
import { waitConfirmIcon } from '../../../../../static/svg/sgv'

export default function ShiftReport({ data, authEmailCurrent }) {
   const arrayData = []
   if (data) {
      for (const key in data) arrayData.push(data[key])
      arrayData.reverse()
   }
   return (
      <section className={style.warp}>
         <div className={style.title}>Báo cáo Ca</div>
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
   const [checkConfirm, setCheckConfirm] = useState(false)
   const ref = useRef(data.ref)
   ////////////////////
   const handelConfirm = (ref) => {
      if(data?.status.includes("lock") && authEmailCurrent !== "permission"){
         alert("Báo cáo này đã bị Khóa và không thể xóa. Liên hệ Mr.Sỹ để xóa hoặc biết thêm chi biết !")
         return //:thoát khỏi hàm handelConfirm
      }
      let valueConfirm = prompt('Nhập mã sau để xóa ( pomina3-btdbf )', '(nhập chính xác có dấu)')
      let text = valueConfirm ??='none'
      if (text.trim() === 'pomina3-btdbf') {
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
   //////////////

   return (
      <>
         <section
            className={style.documentWarp}
            onClick={() => {
               setState(true)
            }}
         >
            <div className={`${style.document}`}>
               {/* // : hiện icon nếu như báo cáo chưa được xác nhận */}
               {!(data?.confirm?.status)
                && 
               <div className={`${style.waitConfirm}`}>
                  {waitConfirmIcon}
               </div>}
               {/* //:////////////// */}
               Báo cáo CA{' '}
               <br />
               <span className={style.shift}>
  
                  {data.shift}
               </span>
               <div  className={style.timeWrap}>
               <span className={style.session}>{data.date.session} </span>
               <span className={style.date}>{data.date.date} </span>
               <span className={style.monthYear}>{data.date.month}/{data.date.year} </span>
               </div >
               <div className={style.time}>{data.date.timestamp}</div>
            </div>
            {(data.authEmail === authEmailCurrent || authEmailCurrent === 'permission') && (
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
               type={'shiftReport'}
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

//////////////////

