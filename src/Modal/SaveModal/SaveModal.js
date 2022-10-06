import { useEffect, useRef, useState } from 'react'
import createMonthDataPost from '../../handelAction/createDataPost/createMonthDataPost'
import createWeekDataPost from '../../handelAction/createDataPost/createWeekDataPost'
import { getFirebaseData } from '../../handelAction/getFirebaseData'
import MonthReport from '../../Preview/MonthReport/MonthReport'
import WeekReport from '../../Preview/WeekReport/WeekReport'

import style from './SaveModal.module.css'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export default function SaveModal({ type, upload = true, refDirection, callBackClose }) {
   const [state, setState] = useState([false, {}])
   const inputRef = useRef(null)
   const reRender = (result) => {
      setState([true, result])
   }
   ////////////////
   const printDocument = () => {
      html2canvas(inputRef.current).then((canvas) => {
         const imgData = canvas.toDataURL('image/png')
         const pdf = new jsPDF()
         pdf.addImage(imgData, 'PNG', 0, 0, 210, 297)
         pdf.save('download.pdf')
      })
   }

   ////////////////////
   useEffect(() => {
      if (upload) {
         switch (type) {
            case 'weekReport': {
               createWeekDataPost(reRender) //gọi hàm upload và truyền callback để render lại khi upload xong
               break
            }
            case 'monthReport': {
               createMonthDataPost(reRender)
               break
            }
            case 'shiftReport': {
               // <ShiftReport content={state[1]} />
               break
            }
         }
      } else {
         ////////// lấy du lieu tu server khi o che do trang chu
         refDirection &&
            getFirebaseData(refDirection).then((result) => {
               setState([true, result.val()])
            })
      }
   }, [])

   const typeReportShow = (type) => {
      switch (type) {
         case 'weekReport': {
            return <WeekReport content={state[1]} />
         }
         case 'monthReport': {
            return <MonthReport content={state[1]} />
         }
         case 'shiftReport': {
            // return <ShiftReport content={state[1]} />
         }
      }
   }
   // console.log('render')
   return (
      <section className={style.modal}>
         <div className={style.form} ref={inputRef}>
            <div
               className={style.close}
               onClick={() => {
                  callBackClose(false)
               }}
            >
               đóng X
            </div>
            {state[0] && typeReportShow(type)}
            <div
               className={style.downloadPDF}
               onClick={() => {
                  printDocument()
               }}
            >
               tải xuống file pdf
            </div>
            <div className={style.downloadJPG}>tải xuống ảnh JPG</div>
         </div>
      </section>
   )
}
