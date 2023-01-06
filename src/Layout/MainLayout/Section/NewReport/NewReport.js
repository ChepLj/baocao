import style from './NewReport.module.css'
import { useState, useRef } from 'react'
import SaveModal from '../../../../Modal/SaveModal/SaveModal'
import { waitConfirmIcon } from '../../../../static/svg/sgv'

export default function NewReport({ data }) {
   const arrayData = []
   if (data) {
      for (const key in data) arrayData.push(data[key])
      arrayData.reverse()
   }
   return (
      <section className={style.warp}>
         <div className={style.title}>Báo cáo mới</div>
         <div className={style.elementsWarp}>
            {arrayData.map((crr, index) => {
               if (index >= 10) {
                  return
               }
               if (crr.type === 'weekReport') {
                  return <ElementWeekDoc data={crr} key={index} />
               }
               if (crr.type === 'monthReport') {
                  return <ElementMonthDoc data={crr} key={index} />
               }
               if (crr.type === 'shiftReport') {
                  return <ElementShiftDoc data={crr} key={index} />
               }
            })}
         </div>
      </section>
   )
}

function ElementWeekDoc({ data }) {
   const [state, setState] = useState(false)
   const ref = useRef(data.ref)
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
               <span style={{ color: 'red', fontSize: '18px', fontWeight: '700' }}>
                  {data.date.week}
               </span>
               Tháng{' '}
               <span style={{ color: 'green', fontSize: '18px', fontWeight: '700' }}>
                  {data.date.month}
               </span>
               <span
                  style={{
                     color: 'gray',
                     fontSize: '10px',
                     fontWeight: '700',
                  }}
               >
                  {data.user}
               </span>
            </div>
            <div className={style.time}>{data.date.timestamp}</div>
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
//////////////
function ElementMonthDoc({ data }) {
   const [state, setState] = useState(false)
   const ref = useRef(data.ref)
   return (
      <>
         <section
            className={style.documentWarp}
            onClick={() => {
               setState(true)
            }}
         >
            <div className={style.document}>
               Báo cáo Tháng{' '}
               <span style={{ color: 'green', fontSize: '28px', fontWeight: '700' }}>
                  {data.date.month}
               </span>
               <br />
               <span
                  className={style.userName}
                  style={{
                     color: 'gray',
                     fontSize: '10px',
                     fontWeight: '700',
                  }}
               >
                  {data.user}
               </span>
            </div>
            <div className={style.time}>{data.date.timestamp}</div>
         </section>
         {/* ẩn hiện Save Modal */}
         {state && (
            <SaveModal
               type={'monthReport'}
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
///////////
function ElementShiftDoc({ data }) {
   const [state, setState] = useState(false)
   const ref = useRef(data.ref)
   return (
      <>
         <section
            className={style.documentWarp}
            onClick={() => {
               setState(true)
            }}
         >
   <div className={style.document}>

               Báo cáo CA{' '}
               <span className={style.shift}>
                  {data.shift}
               </span>
               <div  className={style.timeWrap}>
               <span className={style.session}>{data.date.session} </span>
               <span className={style.date}>{data.date.date} </span>
               <span className={style.monthYear}>{data.date.month}/{data.date.year} </span>
               </div >

            </div>
            <div className={style.time}>{data.date.timestamp}</div>
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