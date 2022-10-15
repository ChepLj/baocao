import html2canvas from 'html2canvas'
import { useEffect, useState } from 'react'
import createMonthDataPost from '../../handelAction/createDataPost/createMonthDataPost'
import createWeekDataPost from '../../handelAction/createDataPost/createWeekDataPost'
import { getFirebaseData } from '../../handelAction/getFirebaseData'
import MonthReport from '../../Preview/MonthReport/MonthReport'
import WeekReport from '../../Preview/WeekReport/WeekReport'
import style from './SaveModal.module.css'

export default function SaveModal({ type, upload = true, refDirection, callBackClose }) {
   const [state, setState] = useState([false, {}])
   const reRender = (result) => {
      setState([true, result])
   }
   ////////////////
   const screenShotDocument = () => {
      const html = document.querySelector(`.${style.areaPrint}`)
      html2canvas(html).then((canvas) => {
         const imgData = canvas.toDataURL('image/png')
         const a = document.createElement('a')
         a.href = imgData
         a.download = `${state[1]?.date?.timestamp}-${state[1]?.user}-report.png`
         document.body.appendChild(a)
         a.click()
      })
   }
   ///////////////////
   const printDocument = () => {
      const html = document.querySelector(`.${style.areaPrint}`).innerHTML
      const stylePrint =
         '.warp {   display: flex;   flex-direction: column;   align-items: center;   width: 70vh;   height: 100%;   user-select: text;width: 70vh;   position: relative;}.header {width:100%;   display: flex;   align-items: top;   justify-content: space-between;   border-bottom: 1px solid#333;   margin: 0 7px 10px 7px;}.address {   width: 40%;   /* font-size: 12px; */   font-size: 0.75rem;   padding: 15px;}.logo {   width: 30%;   /* font-size: 12px; */   font-size: 0.75rem;   padding: 15px;   display: flex;   flex-direction: column;   align-items: center;}.logoImg {   width: 70%;height: auto;   padding-bottom: 3px;}.title {   /* font-size: 28px; */   font-size: 1.75rem;   font-weight: 600;   color: #20ae95;}.user {   /* font-size: 18px; */   font-size: 1.125rem;   margin-bottom: 25px;   color: rgb(205, 27, 228);   font-style: italic;}.list {   width: 100%;   font-size: 1.125rem;   /* font-size: 18px; */   font-weight: 700;   box-sizing: border-box;   margin: 5px;}.item {   /* font-size: 14px; */   font-size: 0.875rem;   font-weight: 500;   list-style: circle;   margin: 5px 10px 10px 35px;}.signature {   display: flex;   justify-content: space-between;   width: 100%;   margin-top: 30px;}.signatureTemp {   flex: 1;   /* width: 10px; */   height: 10px;}.signatureWarp {   /* position: absolute; */   /* bottom: 40px; */   /* right: 40px; */   /* width: 100%; */   display: flex;   flex-direction: column;   align-items: center;   margin: 15px;}.signatureDate {   margin-bottom: 70px;   font-size: 0.875rem;   /* font-size: 14; */}.signatureName {   font-style: italic;}.listItem {   list-style: none;   box-sizing: border-box;   padding-left: 0;   margin-top: 5px;}.itemTitle {   color: #b8c523;   font-size: 0.9375rem;   /* font-size: 15px; */   padding-left: 30px;}.issueWarp {   width: 100%;   font-size: 1.125rem;   /* font-size: 18px; */   font-weight: 700;   box-sizing: border-box;   margin: 5px;   padding-left: 40px;}.auth {display:none;   position: absolute;   bottom: 4px;   left: 4px;   font-style: italic;   font-size: 0.875rem;   /* font-size: 14px; */}'
      let windowPrint = window.open()
      windowPrint.document.write(
         `<head><title>In Báo Cáo</title><style>${stylePrint}</style></head>`,
      )
      windowPrint.document.write(html)
      windowPrint.focus()
      windowPrint.print()
      windowPrint.close()
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
         ////////// lấy du lieu tu server khi o che do xem o trang chu
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
         <div className={style.form}>
            <div
               className={style.close}
               onClick={() => {
                  callBackClose(false)
               }}
            >
               đóng X
            </div>
            <div className={style.areaPrint}>{state[0] && typeReportShow(type)}</div>

            <div
               className={style.downloadPDF}
               onClick={() => {
                  printDocument()
               }}
            >
               tải xuống file PDF
            </div>
            <div
               className={style.downloadJPG}
               onClick={() => {
                  screenShotDocument()
               }}
            >
               tải xuống ảnh PNG
            </div>
         </div>
      </section>
   )
}
