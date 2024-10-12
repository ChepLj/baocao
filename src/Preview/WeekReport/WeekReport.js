import style from './WeekReport.module.css'
import { logoPomina } from '../../static/svg/sgv'

export default function WeekReport({ content }) {

   return (
      <section className={`${style.warp} warp`}>
         <header className={`${style.header} header`}>
            <div className={`${style.address} address`}>
               CÔNG TY CỔ PHẦN THÉP POMINA <br />
               Khu Công nghiệp Phú Mỹ I Thị Xã Phú mỹ, Tỉnh Bà rịa Vũng tàu <br />
               ÐT: 064 3922-521 / Fax: 064 3922-446
            </div>
            <div className={`${style.logo} logo`}>
            
               <div className={`${style.logoImg} logoImg`}>{logoPomina}</div>

               <span>NHÀ MÁY LUYỆN PHÔI THÉP</span>
            </div>
         </header>
         <div className={`${style.title} title`}>
            Báo Cáo Tuần {content.date.week} Tháng {content.date.month}
         </div>
         <div className={`${style.user} user`}>{content.user}</div>
         <ul className={`${style.list} list`}>
            Công việc đã làm trong tuần
            {content.job.map((crr, index) => {
               return (
                  <li className={`${style.item} item`} key={index}>
                     {crr}
                  </li>
               )
            })}
         </ul>
         <div className={`${style.issueWarp} issueWarp`}>
            Các sự cố xảy ra trong tuần
            {content.issue ? (
               content.issue.map((crr, index) => {
                  return (
                     <ul className={`${style.listItem} listItem`} key={index}>
                        <div className={`${style.itemTitle} itemTitle`}>{crr.name}</div>
                        <li className={`${style.item} item`}>
                           <i>Ngày xảy ra:</i> {crr.date}
                        </li>
                        <li className={`${style.item} item`}>
                           <i>Nội dung:</i> {crr.content}
                        </li>
                        <li className={`${style.item} item`}>
                           <i>Biện pháp khắc phục:</i> {crr.solution}
                        </li>
                     </ul>
                  )
               })
            ) : (
               <span className={`${style.item} item`}
                  style={{
                    
                     fontStyle: 'italic',
                     
                  }}
               >
                  <br />
                  không có sự cố ảnh hưởng sản xuất
               </span>
            )}
         </div>
         <ul className={`${style.list} list`}>
            Kế hoạch tuần tới
            {content.plan.map((crr, index) => {
               return (
                  <li className={`${style.item} item`} key={index}>
                     {crr}
                  </li>
               )
            })}
         </ul>
         <ul className={`${style.list} list`}>
            Ý kiến/Đề xuất
            {content.propose.map((crr, index) => {
               return (
                  <li className={`${style.item} item`} key={index}>
                     {crr}
                  </li>
               )
            })}
         </ul>
         <section className={`${style.signature} signature`}>
            <div className={`${style.signatureTemp} signatureTemp`}></div>
            <div className={`${style.signatureWarp} signatureWarp`}>
               <span className={`${style.signatureDate} signatureDate`}>
                  Pomina3, Ngày {content.date.timestamp.slice(8)} tháng{' '}
                  {content.date.timestamp.slice(5, 7)} năm {content.date.timestamp.slice(0, 4)}
               </span>
               <span className={`${style.signatureName} signatureName`}>{content.user}</span>
            </div>
         </section>
         <div className={`${style.auth} auth`}>{(content.authEmail ??= 'none')}</div>
      </section>
   )
}
