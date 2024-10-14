import html2canvas from 'html2canvas';
import { useEffect, useState } from 'react';
import createMonthDataPost from '../../handelAction/createDataPost/createMonthDataPost';
import createWeekDataPost from '../../handelAction/createDataPost/createWeekDataPost';
import createShiftDataPost from '../../handelAction/createDataPost/createShiftDataPost';

import { getFirebaseData } from '../../handelAction/getFirebaseData';
import MonthReport from '../../Preview/MonthReport/MonthReport';
import WeekReport from '../../Preview/WeekReport/WeekReport';
import ShiftReport from '../../Preview/ShiftReport/ShiftReport';
import ProgressUpload from '../ProgressUpload/ProgressUpload';
import style from './SaveModal.module.css';
import progressUpload from '../../handelAction/progressUpload';

export default function SaveModal({ type,upload=false, refDirection, callBackClose, mediaData }) {
   const [state, setState] = useState([false, {}]);


   const reRender = (result) => {
      setState([true, result]);
   };
   ////////////////
   const screenShotDocument = () => {
      const html = document.querySelector(`.${style.areaPrint}`);
      html2canvas(html, { scale: 2, backgroundColor: '#ffffff' }).then((canvas) => {
         const imgData = canvas.toDataURL('image/png');
         const a = document.createElement('a');
         a.href = imgData;
         a.download = `${state[1]?.date?.timestamp}-${type}-${state[1]?.user}.png`;
         document.body.appendChild(a);
         a.click();
      });
   };
   ///////////////////
   const printDocument = () => {
      const html = document.querySelector(`.${style.areaPrint}`).innerHTML;
      const stylePrint =
         '.warp {   display: flex;   flex-direction: column;   align-items: center;   width: 70vh;   height: 100%;   user-select: text;width: 70vh;   position: relative;}.header {width:100%;   display: flex;   align-items: top;   justify-content: space-between;   border-bottom: 1px solid#333;   margin: 0 7px 10px 7px;}.address {   width: 40%;   /* font-size: 12px; */   font-size: 0.75rem;   padding: 15px;}.logo {   width: 30%;   /* font-size: 12px; */   font-size: 0.75rem;   padding: 15px;   display: flex;   flex-direction: column;   align-items: center;}.logoImg {   width: 70%;height: auto;   padding-bottom: 3px;}.title {   /* font-size: 28px; */   font-size: 1.75rem;   font-weight: 600;   color: #20ae95;}.user {   /* font-size: 18px; */   font-size: 1.125rem;   margin-bottom: 25px;   color: rgb(205, 27, 228);   font-style: italic;}.list {   width: 100%;   font-size: 1.125rem;   /* font-size: 18px; */   font-weight: 700;   box-sizing: border-box;   margin: 5px;}.item {   /* font-size: 14px; */   font-size: 0.875rem;   font-weight: 500;   list-style: circle;   margin: 5px 10px 10px 35px;}.signature {   display: flex;   justify-content: space-between;   width: 100%;   margin-top: 30px;}.signatureTemp {   flex: 1;   /* width: 10px; */   height: 10px;}.signatureWarp {   /* position: absolute; */   /* bottom: 40px; */   /* right: 40px; */   /* width: 100%; */   display: flex;   flex-direction: column;   align-items: center;   margin: 15px;}.signatureDate {   margin-bottom: 70px;   font-size: 0.875rem;   /* font-size: 14; */}.signatureName {   font-style: italic;}.listItem {   list-style: none;   box-sizing: border-box;   padding-left: 0;   margin-top: 5px;}.itemTitle {   color: #b8c523;   font-size: 0.9375rem;   /* font-size: 15px; */   padding-left: 30px;}.issueWarp {   width: 100%;   font-size: 1.125rem;   /* font-size: 18px; */   font-weight: 700;   box-sizing: border-box;   margin: 5px;   padding-left: 40px;}.auth {display:none;   position: absolute;   bottom: 4px;   left: 4px;   font-style: italic;   font-size: 0.875rem;   /* font-size: 14px; */}';
      const stylePrintShift =
         ' .shift-warp {    display: flex;    flex-direction: column;    align-items: center;    width: 100%;    height: 100%;   /* overflow-y: scroll; */   overflow-x: hidden;    scrollbar-width: thin;    user-select: text;}.shift-header {    display: flex;    align-items: top;    justify-content: space-between;    border-bottom: 1px solid#333;    width: 100%;    margin: 0 7px 5px 7px; position: relative;}.shift-address {    width: 40%;    font-size: 0.75rem;    padding: 15px;}.shift-headerItem {    width: 33%;    font-size: 0.75rem;    padding: 0 10px;    margin: 10px 0;    display: flex;    flex-direction: column;    align-items: center;    justify-content: start;    text-align: center;}.shift-headerItemInfo {    width: 33%;    font-size: 0.75rem;    padding: 0 10px;    margin: 10px 0;    display: flex;    align-items: start;    justify-content: center;    text-align: center;}.shift-headerItemBorderLR {    border-right: 1px #333 solid;    border-left: 1px #333 solid;}.shift-logoImg {    width: 60%;    height: auto;    padding-bottom: 3px;}.shift-infoItem {    font-size: 16px;    width: 33%;}.shift-timeStamp {    font-size: 0.75rem;    font-weight: 600;    color: gray;}.shift-user {    font-size: 1.125rem;    margin-bottom: 25px;    color: rgb(205, 27, 228);    font-style: italic;}.shift-list {    width: 100%;    font-size: 1.125rem;    font-weight: 700;    box-sizing: border-box;    margin: 5px;}.shift-item {    font-size: 0.875rem;    font-weight: 500;    list-style: circle;    margin: 5px 10px 10px 35px;}.shift-signature {    display: flex;    justify-content: space-between;    width: 100%;    margin-top: 30px;}.shift-signatureTemp {    flex: 1;    height: 10px;}.shift-signatureWarp {    display: flex;    flex-direction: column;    align-items: center;    margin: 15px;}.shift-signatureDate {    margin-bottom: 70px;    font-size: 0.875rem;}.shift-signatureName {    font-style: italic;}.shift-listItem {    list-style: none;    box-sizing: border-box;    padding-left: 0;    margin-top: 5px;}.shift-itemTitle {    color: #b8c523;    font-size: 0.9375rem;    padding-left: 30px;}.shift-issueWarp {    width: 100%;    font-size: 1.125rem;    font-weight: 700;    box-sizing: border-box;    margin: 5px;    padding-left: 40px;}.shift-auth {    position: absolute;    bottom: 4px;    left: 4px;    font-style: italic;    font-size: 0.875rem;    color: #ccc;}.shift-time {    position: absolute;    bottom: 4px;    right: 18px;    font-style: italic;    font-size: 0.875rem;    color: #ccc;}.shift-table {    width: 96%;    margin: 0.5rem 0.5rem 0.1rem 1rem;    padding: 0;    border-spacing: 0px;    border: 0.8px solid #3f3e3e;    text-align: center;}.shift-tableCaption {    text-align: left;    font-size: 1.0rem;    font-weight: 500;    padding-bottom: 0.3rem;}.shift-tableTitle {    font-size: 0.9rem;    font-weight: 550;    padding: 0.2rem 0; border: 0.8px solid #3f3e3e;  }.shift-tableContent {    font-size: 0.9rem; padding: 3px ; border: 0.8px solid #3f3e3e;}.shift-tableChild {    width: 100%;    padding: 0;    border-spacing: 0px;    border-color: #ccc;    text-align: center;    border-collapse: collapse;    align-items: start;}.shift-tableTitleChild {    font-size: 0.8rem;    font-weight: 450;    padding: 0.2rem 0;}.shift-tableContentChild {    font-size: 0.7rem;    padding: 0.2rem 0.1rem;}.shift-tableSignContent {    height: 4rem;}.shift-confirmImg {    width: 20%;    position: absolute;    top: 110%;    right: 8%;}.shift-signWrap {    width: 100%;    padding: 0;    margin: 0;    position: relative;} .shift-hidden {display:none !important;}.shift-infoItemChild{color:green; display:block;      font-size: 26px;       font-weight: 700 ;}';

      let windowPrint = window.open();

      console.log('print');
      switch (type) {
         case 'shiftReport': {
            console.log('shiftReport');
            windowPrint.document.write(`<head><title>In Báo Cáo</title><style>${stylePrintShift}</style></head>`);
            break;
         }
         default: {
            windowPrint.document.write(`<head><title>In Báo Cáo</title><style>${stylePrint}</style></head>`);
         }
      }

      windowPrint.document.write(html);
      windowPrint.focus();
      // windowPrint.document.title = 'ok'
      windowPrint.print();
      windowPrint.close();
   };

   ////////////////////
   useEffect(() => {
      if (upload) {
         setState([false, {}]);
         
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
            return <WeekReport content={state[1]} />;
         }
         case 'monthReport': {
            return <MonthReport content={state[1]} />;
         }
         case 'shiftReport': {
            return <ShiftReport content={state[1]} />;
         }
      }
   };

   return (
      <>
         <section className={style.modal}>
            <div className={style.form}>
               {state[0] ? (
                  <div>
                     <div
                        className={style.close}
                        onClick={() => {
                           callBackClose(false);
                        }}
                     >
                        đóng X
                     </div>
                     <div className={style.areaPrint}> {state[1] && typeReportShow(type)}</div>

                     <div
                        className={style.downloadPDF}
                        onClick={() => {
                           printDocument();
                        }}
                     >
                        tải xuống file PDF
                     </div>
                     <div
                        className={style.downloadJPG}
                        onClick={() => {
                           screenShotDocument();
                        }}
                     >
                        tải xuống ảnh PNG
                     </div>
                  </div>
               ) : (
                  upload && <ProgressUpload reRender={reRender} type={type} mediaData={mediaData}/>
               )}
            </div>
         </section>
      </>
   );
}
