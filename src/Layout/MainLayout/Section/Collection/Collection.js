import style from './Collection.module.css'
import WeekReport from './WeekReport/WeekReport'
import MonthReport from './MonthReport/MonthReport'
import ShiftReport from './ShiftReport/ShiftReport'

export default function Collection({
   data,
   filter = { type: ['Tất Cả'], user: ['Tất Cả'] },
   auth,
}) {
   if (filter.user.includes('Tất Cả')) {
      //nếu là tất cả thì không làm gì
   } else {
      for (const key in data) {
         const object = data[key]
         for (const key in object) {
            !filter.user.includes(object[key].user) && delete object[key] //nếu không chứa điều kiện lọc thì xóa property
         }
      }
   }
   return (
      <section className={style.warp}>
         <div className={style.title}>Collection</div>

         {data.ShiftReport &&
            (filter.type.includes('Tất Cả') || filter.type.includes('Báo Cáo Ca')) && (
               <ShiftReport
                  data={data.ShiftReport}
                  authEmailCurrent={(auth.email ??= 'authEmailCurrent')}
               />
            )}
         {data.WeekReport &&
            (filter.type.includes('Tất Cả') || filter.type.includes('Báo Cáo Tuần')) && (
               <WeekReport
                  data={data.WeekReport}
                  authEmailCurrent={(auth.email ??= 'authEmailCurrent')}
               />
            )}
         {data.MonthReport &&
            (filter.type.includes('Tất Cả') || filter.type.includes('Báo Cáo Tháng')) && (
               <MonthReport
                  data={data.MonthReport}
                  authEmailCurrent={(auth.email ??= 'authEmailCurrent')}
               />
            )}
      </section>
   )
}
