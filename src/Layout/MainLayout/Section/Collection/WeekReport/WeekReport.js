import style from './WeekReport.module.css'
import { useRef, useState } from 'react'
import SaveModal from '../../../../../Modal/SaveModal/SaveModal'

export default function WeekReport({ data }) {
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
               return <ElementDoc data={crr} key={index} />
            })}
         </div>
      </section>
   )
}

function ElementDoc({ data }) {
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
