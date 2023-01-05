import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import style from './CreateMonthDocLayout.module.css'
import Header from './Header/Header'

export default function CreateMonthDocLayout() {
   let location = useLocation() //dùng useLocation để lấy prop
   const user = location.state.user

   let auth = {}
   if (sessionStorage.getItem('user')) {
      auth = JSON.parse(sessionStorage.getItem('user'))
   } else {
      window.location.href = '/login'
   }
   ////////
   return (
      <section className={style.warpPage}>
         <Header auth={auth} />
         <section className={style.warpContent}>
            <section className={style.writeArea}>
               <div className={style.writeAreaTitle}>Báo Cáo Tháng</div>
               <div className={style.writeAreaTime}>
                  Tháng{' '}
                  <select className={style.optionWeek} name="monthMonthReport">
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
                  </select>
                  {' .'}
                  Năm{' '}
                  <select className={style.optionMonth} name="yearMonthReport">
                     <option value={2022}>2022</option>
                     <option value={2023}>2023</option>
                     <option value={2024}>2024</option>
                     <option value={2025}>2025</option>
                  </select>{' '}
                  <select className={style.user} name="userMonthReport">
                     {user.map((crr, index) => {
                        return (
                           <option value={crr} key={index}>
                              {crr}
                           </option>
                        )
                     })}
                  </select>{' '}
               </div>
               <JobWrite />
               <IssueWrite />
               <EquipmentUseWrite />
               <PlanWrite />
               <ProposeWrite />
            </section>
            <section className={style.descriptionArea}>Miêu tả</section>
         </section>
      </section>
   )
}

/////////////////////

function JobWrite() {
   const [state, setState] = useState([1])

   const handelAddJobField = () => {
      const array = [...state, state[state.length - 1] + 1]
      setState(array)
   }
   const handelDeleteEquipmentField = (index) => {
      const arrayNode = document.querySelectorAll(`.create-job`)
      for (const item of arrayNode) {
         if (item.dataset.jobIndex === index) {
            return item.remove()
         }
      }
   }
   return (
      <div className={style.fieldJobWarp}>
         <div className={style.fieldJobTitle}>Tình trạng thiết bị</div>
         <ul className={style.fieldJobList}>
            {state.map((crr, index) => {
               return (
                  <li
                     className={`${style.fieldIssueItem} create-job`}
                     key={index}
                     data-job-index={index}
                  >
                     <div className={style.fieldJobItemTitle}>Thiết bị</div>
                     <div className={style.fieldIssueItemContentWarp}>
                        <div className={style.fieldJobItemWarp2}>
                           <span className={style.fieldIssueItemTitleChild}>Tên thiết bị*</span>
                           <p
                              className={style.fieldJobItemInput}
                              data-job-input="name"
                              // data-job-input={index}
                              contentEditable="true"
                           />
                        </div>
                        <div className={style.fieldJobItemWarp2}>
                           <span className={style.fieldIssueItemTitleChild}>Tình trạng*</span>
                           <p
                              className={style.fieldJobItemInput}
                              // data-job-input={index}
                              data-job-input="status"
                              contentEditable="true"
                           />
                        </div>
                     </div>

                     <span
                        className={`material-symbols-outlined ${style.fieldJobItemDelete}`}
                        onClick={(e) => {
                           handelDeleteEquipmentField(e.target.dataset.index)
                        }}
                        data-index={index}
                     >
                        delete
                     </span>
                  </li>
               )
            })}

            <div className={style.addJobWrap} onClick={handelAddJobField}>
               <div className={style.addJobWrapText}>Thêm Thiết bị </div>
               <span className="material-symbols-outlined">add</span>
            </div>
         </ul>
      </div>
   )
}
/////////////////

function IssueWrite() {
   const [state, setState] = useState([1])

   const handelAddIssueField = () => {
      const array = [...state, state[state.length - 1] + 1]
      setState(array)
   }
   const handelDeleteIssueField = (index) => {
      const arrayNode = document.querySelectorAll(`.create-issue`)
      for (const item of arrayNode) {
         if (item.dataset.issueIndex === index) {
            return item.remove()
         }
      }
   }
   return (
      <div className={style.fieldIssueWarp}>
         <div className={style.fieldIssueTitle}>Sự cố xảy ra trong tháng</div>
         <ul className={style.fieldIssueList}>
            {/*  */}
            {state.map((crr, index) => {
               return (
                  <IssueWriteElement
                     key={index}
                     index={index}
                     callBack={(indexFB) => {
                        handelDeleteIssueField(indexFB)
                     }}
                  />
               )
            })}

            {/*  */}
            <div className={style.addIssueWrap} onClick={handelAddIssueField}>
               <div className={style.addIssueWrapText}>Thêm sự cố </div>
               <span className="material-symbols-outlined">add</span>
            </div>
         </ul>
      </div>
   )
}

function IssueWriteElement({ index, callBack }) {
   return (
      <li className={`${style.fieldIssueItem} create-issue`} data-issue-index={index}>
         <div className={style.fieldIssueItemTitle}>Sự cố</div>
         <div className={style.fieldIssueItemContentWarp}>
            {/*  */}
            <div className={style.fieldIssueItemContentWarpItem}>
               <div className={style.fieldIssueItemTitleChild}>Tên sự cố*</div>
               <p
                  className={style.fieldIssueItemInput}
                  data-issue-input="name"
                  contentEditable="true"
               />
            </div>
            <div className={style.fieldIssueItemContentWarpItem}>
               <div className={style.fieldIssueItemTitleChild}>Ngày*</div>
               <p
                  className={style.fieldIssueItemInput}
                  data-issue-input="date"
                  contentEditable="true"
               />
            </div>
            {/*  */}
            {/*  */}
            <div className={style.fieldIssueItemContentWarpItem}>
               <div className={style.fieldIssueItemTitleChild}>Nội dung*</div>
               <p
                  className={style.fieldIssueItemInput}
                  data-issue-input="content"
                  contentEditable="true"
               />
            </div>
            {/*  */}
            <div className={style.fieldIssueItemContentWarpItem}>
               <div className={style.fieldIssueItemTitleChild}>Biện pháp khắc phục*</div>
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

///////////////////
function PlanWrite() {
   const [state, setState] = useState([1])

   const handelAddPlanField = () => {
      const array = [...state, state[state.length - 1] + 1]
      setState(array)
   }
   const handelDeletePlanField = (index) => {
      const arrayNode = document.querySelectorAll(`.create-plan`)
      for (const item of arrayNode) {
         if (item.dataset.planIndex === index) {
            return item.remove()
         }
      }
   }
   return (
      <div className={style.fieldJobWarp}>
         <div className={style.fieldJobTitle}>Kế hoạch tuần tháng tới</div>
         <ul className={style.fieldJobList}>
            {state.map((crr, index) => {
               return (
                  <li
                     className={`${style.fieldJobItem} create-plan`}
                     key={index}
                     data-plan-index={index}
                  >
                     <div className={style.fieldJobItemTitle}>Kế hoạch</div>
                     <p
                        className={style.fieldJobItemInput}
                        data-plan-input={index}
                        contentEditable="true"
                     />

                     <span
                        className={`material-symbols-outlined ${style.fieldJobItemDelete}`}
                        onClick={(e) => {
                           handelDeletePlanField(e.target.dataset.index)
                        }}
                        data-index={index}
                     >
                        delete
                     </span>
                  </li>
               )
            })}

            <div className={style.addJobWrap} onClick={handelAddPlanField}>
               <div className={style.addJobWrapText}>Thêm kế hoạch </div>
               <span className="material-symbols-outlined">add</span>
            </div>
         </ul>
      </div>
   )
}
/////////////////
function ProposeWrite() {
   const [state, setState] = useState([1])

   const handelAddProposeField = () => {
      const array = [...state, state[state.length - 1] + 1]
      setState(array)
   }
   const handelDeleteProposeField = (index) => {
      const arrayNode = document.querySelectorAll(`.create-propose`)
      for (const item of arrayNode) {
         if (item.dataset.proposeIndex === index) {
            return item.remove()
         }
      }
   }
   return (
      <div className={style.fieldJobWarp}>
         <div className={style.fieldJobTitle}>Ý kiến/Đề xuất</div>
         <ul className={style.fieldJobList}>
            {state.map((crr, index) => {
               return (
                  <li
                     className={`${style.fieldJobItem} create-propose`}
                     key={index}
                     data-propose-index={index}
                  >
                     <div className={style.fieldJobItemTitle}>Đề xuất</div>
                     <p
                        className={style.fieldJobItemInput}
                        data-propose-input={index}
                        contentEditable="true"
                     />

                     <span
                        className={`material-symbols-outlined ${style.fieldJobItemDelete}`}
                        onClick={(e) => {
                           handelDeleteProposeField(e.target.dataset.index)
                        }}
                        data-index={index}
                     >
                        delete
                     </span>
                  </li>
               )
            })}

            <div className={style.addJobWrap} onClick={handelAddProposeField}>
               <div className={style.addJobWrapText}>Thêm kế hoạch </div>
               <span className="material-symbols-outlined">add</span>
            </div>
         </ul>
      </div>
   )
}
/////////////////
function EquipmentUseWrite() {
   const [state, setState] = useState([1])

   const handelAddEquipmentField = () => {
      const array = [...state, state[state.length - 1] + 1]
      setState(array)
   }
   const handelDeleteEquipmentField = (index) => {
      const arrayNode = document.querySelectorAll(`.create-equip`)
      for (const item of arrayNode) {
         if (item.dataset.jobIndex === index) {
            return item.remove()
         }
      }
   }
   return (
      <div className={style.fieldJobWarp}>
         <div className={style.fieldJobTitle}>Vật tư đã sử dụng</div>
         <ul className={style.fieldJobList}>
            {state.map((crr, index) => {
               return (
                  <li
                     className={`${style.fieldIssueItem} create-equip`}
                     key={index}
                     data-job-index={index}
                  >
                     <div className={style.fieldJobItemTitle}>Vật tư</div>
                     <div className={style.fieldIssueItemContentWarp}>
                        <div className={style.fieldJobItemWarp2}>
                           <span className={style.fieldIssueItemTitleChild}>Mã vật tư</span>
                           <p
                              className={style.fieldJobItemInput}
                              data-equip-input="IDCode"
                              // data-job-input={index}
                              contentEditable="true"
                           />
                        </div>
                        <div className={style.fieldJobItemWarp2}>
                           <span className={style.fieldIssueItemTitleChild}>Tên vật tư*</span>
                           <p
                              className={style.fieldJobItemInput}
                              // data-job-input={index}
                              data-equip-input="name"
                              contentEditable="true"
                           />
                        </div>
                        <div className={style.fieldJobItemWarp2}>
                           <span className={style.fieldIssueItemTitleChild}>Số lượng*</span>
                           <p
                              className={style.fieldJobItemInput}
                              // data-job-input={index}
                              data-equip-input="amount"
                              contentEditable="true"
                           />
                        </div>
                     </div>

                     <span
                        className={`material-symbols-outlined ${style.fieldJobItemDelete}`}
                        onClick={(e) => {
                           handelDeleteEquipmentField(e.target.dataset.index)
                        }}
                        data-index={index}
                     >
                        delete
                     </span>
                  </li>
               )
            })}

            <div className={style.addJobWrap} onClick={handelAddEquipmentField}>
               <div className={style.addJobWrapText}>Thêm Vật Tư </div>
               <span className="material-symbols-outlined">add</span>
            </div>
         </ul>
      </div>
   )
}
/////////////////
