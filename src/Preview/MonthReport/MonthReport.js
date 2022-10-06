import style from './MonthReport.module.css'

export default function MonthReport({ content }) {
   const time = new Date()
   return (
      <section className={style.warp}>
         <header className={style.header}>
            <div className={style.address}>
               CÔNG TY CỔ PHẦN THÉP POMINA <br />
               Khu Công nghiệp Phú Mỹ I Thị Xã Phú mỹ, Tỉnh Bà rịa Vũng tàu <br />
               ÐT: 064 3922-521 / Fax: 064 3922-446
            </div>
            <div className={style.logo}>
               <img
                  className={style.logoImg}
                  src="https://www.tienlensteel.com.vn/static/media/POMINA.aaacf593.png"
                  alt=""
               />
               <span>NHÀ MÁY LUYỆN PHÔI THÉP</span>
            </div>
         </header>
         <div className={style.title}>
            Báo Cáo Tháng {content.date.month} Năm {content.date.year}
         </div>
         <div className={style.user}>{content.user}</div>
         <ul className={style.list}>
            Tình trạng thiết bị
            {/* {content.job.map((crr, index) => {
               return (
                  <li className={style.item} key={index}>
                     {crr}
                  </li>
               )
            })} */}
            {content.equipment ? (
               content.equipment.map((crr, index) => {
                  return (
                     <ul className={style.listItem} key={index}>
                        <div className={style.itemTitle}>{crr.name}</div>

                        <li className={style.item}>
                           <i>Tình trạng:</i> {crr.status}
                        </li>
                     </ul>
                  )
               })
            ) : (
               <span
                  style={{
                     fontSize: '14px',
                     fontStyle: 'italic',
                     fontWeight: '400',
                  }}
               >
                  <br />
                  không có thông tin
               </span>
            )}
         </ul>
         <div className={style.issueWarp}>
            Các sự cố xảy ra trong tháng
            {content.issue ? (
               content.issue.map((crr, index) => {
                  return (
                     <ul className={style.listItem} key={index}>
                        <div className={style.itemTitle}>{crr.name}</div>
                        <li className={style.item}>
                           <i>Ngày xảy ra:</i> {crr.date}
                        </li>
                        <li className={style.item}>
                           <i>Nội dung:</i> {crr.content}
                        </li>
                        <li className={style.item}>
                           <i>Biện pháp khắc phục:</i> {crr.solution}
                        </li>
                     </ul>
                  )
               })
            ) : (
               <span
                  style={{
                     fontSize: '14px',
                     fontStyle: 'italic',
                     fontWeight: '400',
                  }}
               >
                  <br />
                  không có sự cố ảnh hưởng sản xuất
               </span>
            )}
         </div>
         <ul className={style.list}>
            Kế hoạch tháng tới
            {content.plan.map((crr, index) => {
               return (
                  <li className={style.item} key={index}>
                     {crr}
                  </li>
               )
            })}
         </ul>
         <ul className={style.list}>
            Ý kiến/Đề xuất
            {content.propose.map((crr, index) => {
               return (
                  <li className={style.item} key={index}>
                     {crr}
                  </li>
               )
            })}
         </ul>
         <section className={style.signature}>
            <div className={style.signatureTemp}></div>
            <div className={style.signatureWarp}>
               <span className={style.signatureDate}>
                  Pomina3, Ngày {time.getDate()} tháng {time.getMonth() + 1} năm 2022
               </span>
               <span className={style.signatureName}>{content.user}</span>
            </div>
         </section>
      </section>
   )
}
