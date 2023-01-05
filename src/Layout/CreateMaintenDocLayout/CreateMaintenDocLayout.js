import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import style from './CreateMaintenDocLayout.module.css'
import Header from './Header/Header'

export default function CreateMaintenDocLayout() {
   let location = useLocation() //dùng useLocation để lấy prop
   const [closeChooseAddGroup, setCloseChooseAddGroup] = useState(false)
   const groupArray = [
      'BF Trough',
      'Phun Than',
      'Lò Gió Nóng',
      'Nhà Quạt',
      'Lọc Bụi Gas',
      'Nhà Quạt',
      'Đúc Gang',
      'Trạm Cân Gang Lỏng',
      'Tháp Đốt',
      'Xử Lý Nước',
      'Xử Lý Bụi Môi Trường',
      'Xử Lý Nước Xối Xỉ',
      'Lọc Bụi Trọng Trường',
      'Lọc Vôi',
      'Trạm Điện Tổng',
   ]
   const user = location.state.user
   const dateArray = []
   for (let day = 1; day <= 31; day++) {
      dateArray.push(day)
   }
   let auth = {}
   if (sessionStorage.getItem('user')) {
      auth = JSON.parse(sessionStorage.getItem('user'))
   } else {
      window.location.href = '/login'
   }
   //////////
   const [group, setGroup] = useState([])
   const handelAddGroupField = (groupInput) => {
      if (!group.includes(groupInput)) {
         const array = [...group, groupInput]
         setGroup(array)
         setCloseChooseAddGroup(false)
      }
   }
   const handelDeleteGroupField = (index) => {
      const arrayNode = document.querySelectorAll(`.create-group`)
      for (const item of arrayNode) {
         if (item.dataset.issueIndex === index) {
            return item.remove()
         }
      }
   }
   ////////

   //////////
   return (
      <section className={style.warpPage}>
         <Header auth={auth} />
         {/* <h2>Đang phát triển, vui lòng quay lại sau!!!</h2> */}
         <section className={style.warpContent}>
            <section className={style.writeArea}>
               <div className={style.writeAreaTitle}>Kế hoạch bảo trì</div>
               <div className={style.writeAreaTime}>
                  Ngày{' '}
                  <select className={style.optionWeek} name="dateMaintenReport">
                     {dateArray.map((crr) => {
                        return (
                           <option value={crr} key={crr}>
                              {crr}
                           </option>
                        )
                     })}
                  </select>
                  {' .'}
                  Tháng{' '}
                  <select className={style.optionMonth} name="monthMaintenReport">
                     <option value={1}>1</option>
                     <option value={2}>2</option>
                     <option value={3}>3</option>
                     <option value={4}>4</option>
                     <option value={5}>5</option>
                     <option value={6}>6</option>
                     <option value={7}>7</option>
                     <option value={8}>8</option>
                     <option value={9}>9</option>
                     <option value={10}>10</option>
                     <option value={11}>11</option>
                     <option value={12}>12</option>
                  </select>{' '}
                  <select className={style.user} name="userWeekReport">
                     {user.map((crr, index) => {
                        return (
                           <option value={crr} key={index}>
                              {crr}
                           </option>
                        )
                     })}
                  </select>{' '}
               </div>
               {/*  */}

               {group.map((crr, index) => {
                  return (
                     <AreaWrite
                        key={index}
                        title={crr}
                        index={index}
                        callBack={(indexFB) => {
                           handelDeleteGroupField(indexFB)
                        }}
                     />
                  )
               })}

               {/*  */}

               <div
                  className={style.addGroupWrap}
                  onClick={() => {
                     setCloseChooseAddGroup(true)
                  }}
               >
                  <div className={style.addIssueWrapText}>Thêm Khu Vực </div>
                  <span className="material-symbols-outlined">add</span>
               </div>
               <h2>Đang phát triển, chưa sử dụng được !!!</h2>
               {/* hieenj modal chon khu vuc */}
               {closeChooseAddGroup && (
                  <section className={style.chooseGroupPosition}>
                     <section className={style.chooseGroupWrap}>
                        <header className={style.chooseGroupHeader}>Chọn Khu Vực</header>
                        <ul className={style.chooseGroupList}>
                           {groupArray.map((crr, index) => {
                              return (
                                 <li
                                    className={style.chooseGroupItem}
                                    key={index}
                                    onClick={() => {
                                       handelAddGroupField(crr)
                                    }}
                                 >
                                    {crr}
                                 </li>
                              )
                           })}
                        </ul>
                        <input
                           className={style.chooseGroupInput}
                           placeholder={'hoặc nhập khu vực khác'}
                        ></input>
                        <button className={style.chooseGroupButton}>Thêm Khu Vực</button>

                        <span
                           className={style.chooseGroupCancel}
                           onClick={() => {
                              setCloseChooseAddGroup(false)
                           }}
                        >
                           đóng X
                        </span>
                     </section>
                  </section>
               )}
            </section>
            <section className={style.descriptionArea}>Miêu tả</section>
         </section>
      </section>
   )
}

/////////////////////

function AreaWrite({ title, index, callBack }) {
   const [state, setState] = useState([1])

   const handelAddAreaField = () => {
      const array = [...state, state[state.length - 1] + 1]
      setState(array)
   }
   const handelDeleteAreaField = (index) => {
      const arrayNode = document.querySelectorAll(`.create-area`)
      for (const item of arrayNode) {
         if (item.dataset.issueIndex === index) {
            return item.remove()
         }
      }
   }
   return (
      <div className={`${style.fieldIssueWarp} create-group`} data-issue-index={index}>
         <div className={style.fieldIssueTitle}>
            Khu vực :{' '}
            <b style={{ color: 'red', fontSize: '1.2rem', paddingLeft: '5px' }}>{title}</b>
            <span
               className={`material-symbols-outlined ${style.fieldIssueItemDelete}`}
               onClick={(e) => {
                  callBack(e.target.dataset.index)
               }}
               data-index={index}
            >
               delete
            </span>
         </div>
         <ul className={style.fieldIssueList}>
            {/*  */}
            {state.map((crr, index) => {
               return (
                  <AreaWriteElement
                     key={index}
                     index={index}
                     callBack={(indexFB) => {
                        handelDeleteAreaField(indexFB)
                     }}
                  />
               )
            })}

            {/*  */}
            <div className={style.addIssueWrap} onClick={handelAddAreaField}>
               <div className={style.addIssueWrapText}>Thêm đầu việc </div>
               <span className="material-symbols-outlined">add</span>
            </div>
         </ul>
      </div>
   )
}

// //////////////////////////////////////////////////////
function AreaWriteElement({ index, callBack }) {
   return (
      <li className={`${style.fieldIssueItem} create-area`} data-issue-index={index}>
         <div className={style.fieldIssueItemTitle}>Công việc</div>
         <div className={style.fieldIssueItemContentWarp}>
            {/*  */}
            <div className={style.fieldIssueItemContentWarpItem}>
               <div className={style.fieldIssueItemTitleChild}>Nội dung CV*</div>
               <p
                  className={style.fieldIssueItemInput}
                  data-issue-input="name"
                  contentEditable="true"
               />
            </div>
            <div className={style.fieldIssueItemContentWarpItem}>
               <div className={style.fieldIssueItemTitleChild}>Thời gian làm việc*</div>
               <p
                  className={style.fieldIssueItemInput}
                  data-issue-input="date"
                  contentEditable="true"
               />
            </div>
            {/*  */}
            {/*  */}
            <div className={style.fieldIssueItemContentWarpItem}>
               <div className={style.fieldIssueItemTitleChild}>Nhân sự*</div>
               <p
                  className={style.fieldIssueItemInput}
                  data-issue-input="content"
                  contentEditable="true"
               />
            </div>
            {/*  */}
            <div className={style.fieldIssueItemContentWarpItem}>
               <div className={style.fieldIssueItemTitleChild}>Chuẩn bị*</div>
               <p
                  className={style.fieldIssueItemInput}
                  data-issue-input="solution"
                  contentEditable="true"
               />
            </div>
            {/*  */}
         </div>
         <span
            className={`material-symbols-outlined ${style.fieldIssueItemDelete}`}
            onClick={(e) => {
               callBack(e.target.dataset.index)
            }}
            data-index={index}
         >
            delete
         </span>
      </li>
   )
}

////////////////////
