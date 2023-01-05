import style from './CreateShiftDocLayout.module.css'
import Header from './Header/Header'
import { useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { getFirebaseData } from '../../handelAction/getFirebaseData'

export default function CreateShiftDocLayout() {
   let location = useLocation() //dùng useLocation để lấy prop
   const [handoverEquip, setHandoverEquip] = useState([]);

   const user = location.state.user
   const today = new Date()
   const date = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
      27, 28, 29, 30, 31,
   ]
   const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
   const year = [2022, 2023, 2024, 2025]
   let auth = {}
   if (sessionStorage.getItem('user')) {
      auth = JSON.parse(sessionStorage.getItem('user'))
   } else {
      window.location.href = '/login'
   }
   ////////
   useEffect(() => {
      const timeElm = document.getElementsByTagName('select')
      //gán ngày tự động
      for (const Elm of timeElm) {
         if (Elm.name === 'shiftDateReport') {
            Elm.value = today.getDate()
         }
         if (Elm.name === 'shiftMonthReport') {
            Elm.value = today.getMonth() + 1
         }
         if (Elm.name === 'shiftYearReport') {
            Elm.value = today.getFullYear()
         }
      }
   }, [])
   ///////////
  
   useEffect(()=>{
       // TODO: goi lên firebase để lấy vật tu bàn giao của ca trước
      getFirebaseData('ShiftEquipHandover').then(data => {
         
         const dataResults = data.val()
         const initHandoverEquip = []
         for (const item in dataResults) {
            initHandoverEquip.push([
               dataResults[item]?.name,
               dataResults[item]?.amount,
               dataResults[item]?.unit,
            ]) //:chuyển qua dạng mảng
         }
         setHandoverEquip(initHandoverEquip)
      	
      })
   },[])
   return (
      <section className={style.warpPage}>
         <Header auth={auth} />
         {/* <h2>Đang phát triển, vui lòng quay lại sau!!!</h2> */}
         <section className={style.warpContent}>
            <section className={style.writeArea}>
               <div className={style.writeAreaTitle}>Báo Cáo Ca</div>
               <div className={style.writeAreaTime}>
                  Ca
                  <span className={style.space5}></span>
                  <select className={style.optionWeek} name="shiftShiftReport">
                     <option value={'HC'}>HC</option>
                     <option value={'D'}>D</option>
                     <option value={'E'}>E</option>
                     <option value={'F'}>F</option>
                  </select>
                  <span className={style.space10}></span>
                  <select className={style.date} name="shiftSessionReport">
                     <option value={'Ca Đêm'}>Ca Đêm</option>
                     <option value={'Ca Ngày'}>Ca Ngày</option>
                     <option value={'Ca HC'}>Ca HC</option>
                  </select>
                  <span className={style.spaceLR2dot5}></span>
                  Ngày
                  <span className={style.spaceLR2dot5}></span>
                  <select className={style.date} name="shiftDateReport">
                     {date.map((crr, index) => {
                        return (
                           <option value={crr} key={index}>
                              {crr}
                           </option>
                        )
                     })}
                  </select>
                  <span className={style.spaceLR2dot5}></span>
                  Tháng
                  <span className={style.spaceLR2dot5}></span>
                  <select className={style.date} name="shiftMonthReport">
                     {month.map((crr, index) => {
                        return (
                           <option value={crr} key={index}>
                              {crr}
                           </option>
                        )
                     })}
                  </select>
                  <span className={style.spaceLR2dot5}></span>
                  Năm
                  <span className={style.spaceLR2dot5}></span>
                  <select className={style.date} name="shiftYearReport">
                     {year.map((crr, index) => {
                        return (
                           <option value={crr} key={index}>
                              {crr}
                           </option>
                        )
                     })}
                  </select>
               </div>

               <IssueWrite />
               <EquipmentUseWrite />
               <OrderWrite />
               <ProposeWrite />
            </section>
            <section className={`${style.descriptionArea} ${style.space10} `}>
               Vật tư, thiết bị bàn giao
               <EquipmentHandover handoverEquip={handoverEquip}/>
            </section>
         </section>
      </section>
   )
}

/////////////////////
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
         <div className={style.fieldIssueTitle}>Công việc/ Sự cố trong CA</div>
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
               <div className={style.addIssueWrapText}>Thêm đầu việc </div>
               <span className="material-symbols-outlined">add</span>
            </div>
         </ul>
      </div>
   )
}

function IssueWriteElement({ index, callBack }) {
   return (
      <li className={`${style.fieldIssueItem} create-issue`} data-issue-index={index}>
         <div className={style.fieldIssueItemTitle}>Công việc</div>
         <div className={style.fieldIssueItemContentWarp}>
            {/*  */}
            <div className={style.fieldIssueItemContentWarpItem}>
               <div className={style.fieldIssueItemTitleChild}>Tên đầu việc*</div>
               <p
                  className={style.fieldIssueItemInput}
                  data-issue-input="name"
                  contentEditable="true"
               />
            </div>
            <div className={style.fieldIssueItemContentWarpItem}>
               <div className={style.fieldIssueItemTitleChild}>Thời gian xử lý</div>
               <p
                  className={style.fieldIssueItemInput}
                  data-issue-input="time"
                  contentEditable="true"
               />
            </div>
            {/*  */}
            {/*  */}
            <div className={style.fieldIssueItemContentWarpItem}>
               <div className={style.fieldIssueItemTitleChild}>Chi tiết</div>
               <p
                  className={style.fieldIssueItemInput}
                  data-issue-input="content"
                  contentEditable="true"
               />
            </div>
            {/*  */}
            <div className={style.fieldIssueItemContentWarpItem}>
               <div className={style.fieldIssueItemTitleChild}>Biện pháp khắc phục</div>
               <p
                  className={style.fieldIssueItemInput}
                  data-issue-input="solution"
                  contentEditable="true"
               />
            </div>
            {/*  */}
            {/*  */}
            <div className={style.fieldIssueItemContentWarpItem}>
               <div className={`${style.fieldIssueItemTitleChild} ${style.redColor}`}>
                  Kết quả/ Ghi chú CA sau*
               </div>
               <p
                  className={style.fieldIssueItemInput}
                  data-issue-input="result"
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
                        <div className={style.fieldIssueItemContentWarpItem}>
                           <span className={style.fieldIssueItemTitleChild}>Mã vật tư</span>
                           <p
                              className={style.fieldJobItemInput}
                              data-equip-input="IDCode"
                              // data-job-input={index}
                              contentEditable="true"
                           />
                        </div>
                        <div className={style.fieldIssueItemContentWarpItem}>
                           <span className={style.fieldIssueItemTitleChild}>Tên vật tư*</span>
                           <p
                              className={style.fieldJobItemInput}
                              // data-job-input={index}
                              data-equip-input="name"
                              contentEditable="true"
                           />
                        </div>
                        <div className={style.fieldIssueItemContentWarpItem}>
                           <span className={style.fieldIssueItemTitleChild}>Số lượng*</span>
                           <p
                              className={style.fieldJobItemInput}
                              // data-job-input={index}
                              data-equip-input="amount"
                              contentEditable="true"
                           />
                        </div>
                        <div className={style.fieldIssueItemContentWarpItem}>
                           <span className={style.fieldIssueItemTitleChild}>Đơn Vị*</span>
                           <p
                              className={style.fieldJobItemInput}
                              // data-job-input={index}
                              data-equip-input="unit"
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
function OrderWrite() {
   const [state, setState] = useState([1])

   const handelAddOrderField = () => {
      const array = [...state, state[state.length - 1] + 1]
      setState(array)
   }
   const handelDeleteOrderField = (index) => {
      const arrayNode = document.querySelectorAll(`.create-order`)
      for (const item of arrayNode) {
         if (item.dataset.proposeIndex === index) {
            return item.remove()
         }
      }
   }
   return (
      <div className={style.fieldJobWarp}>
         <div className={style.fieldJobTitle}>KSKV/ CA trước giao việc</div>
         <ul className={style.fieldJobList}>
            {state.map((crr, index) => {
               return (
                  <li
                     className={`${style.fieldIssueItem} create-order`}
                     key={index}
                     data-order-index={index}
                  >
                     <div className={style.fieldJobItemTitle}>Công việc</div>

                     <div className={style.fieldIssueItemContentWarp}>
                        <div className={style.fieldIssueItemContentWarpItem}>
                           <div className={style.fieldIssueItemTitleChild}>Nội dung</div>
                           <p
                              className={style.fieldJobItemInput}
                              data-order-input="content"
                              contentEditable="true"
                           />
                        </div>
                        <div className={style.fieldIssueItemContentWarpItem}>
                           <div className={style.fieldIssueItemTitleChild}>Người giao</div>
                           <p
                              className={style.fieldJobItemInput}
                              data-order-input="people"
                              contentEditable="true"
                           />
                        </div>
                     </div>

                     <span
                        className={`material-symbols-outlined ${style.fieldJobItemDelete}`}
                        onClick={(e) => {
                           handelDeleteOrderField(e.target.dataset.index)
                        }}
                        data-index={index}
                     >
                        delete
                     </span>
                  </li>
               )
            })}

            <div className={style.addJobWrap} onClick={handelAddOrderField}>
               <div className={style.addJobWrapText}>Thêm công việc </div>
               <span className="material-symbols-outlined">add</span>
            </div>
         </ul>
      </div>
   )
}

//////////////// Vật tue bàn giao///////////////////
function EquipmentHandover({handoverEquip}) {

   const [state, setState] = useState([])
   useEffect(()=>{
      setState([...handoverEquip])
   },[handoverEquip])


   const handelAddEquipmentField = () => {
      const motherFieldElm = document.querySelector('.add-handover-equip')
      const nameEquip = motherFieldElm.querySelector('.name').innerText
      const amountEquip = motherFieldElm.querySelector('.amount').innerText
      const unitEquipElm = motherFieldElm.querySelector('.unit').value

      if (nameEquip !== '' && amountEquip !== '') {
         // kiểm tra nếu có dữ liệu thì mới cho thêm
         const array = [...state, [nameEquip, amountEquip, unitEquipElm]]
         motherFieldElm.querySelector('.name').innerText = '' // xoa sau khi them
         motherFieldElm.querySelector('.amount').innerText = '' // xoa sau khi them
         motherFieldElm.querySelector('.unit').value = 'Cái'
         setState(array)
      } else {
         alert('Tên Vật Tư và Số Lượng không được bỏ trống !!!')
      }
   }
   const handelDeleteEquipmentField = (indexDlt) => {
      const indexDltParseInt = parseInt(indexDlt, 10)
      const newArray = []
      state.forEach((crr, index) => {
         if (index !== indexDltParseInt) {
            newArray.push(crr)
         }
      })
      setState(newArray)
   }
 
   return (
      <div className={style.fieldJobWarp}>
         <div className={`${style.fieldEquipHandOverWrap}`}>
            <ul
               className={style.fieldJobList}
               style={{ padding: 0, marginTop: '3px', marginBottom: '3px' }}
            >
               {state.map((crr, index) => {
                  return (
                     <li className={`${style.fieldEquipHandOverItem} create-handover`} key={index}>
                        <span
                           className={`material-symbols-outlined ${style.fieldJobItemDelete}`}
                           onClick={(e) => {
                              handelDeleteEquipmentField(e.target.dataset.index)
                           }}
                           data-index={index}
                        >
                           delete
                        </span>
                        <span
                           className={style.spaceLR5}
                           style={{ width: '20px', textAlign: 'right' }}
                        >
                           {index + 1}.
                        </span>
                        <span
                           className="handoverItem"
                           style={{ color: 'blue', flex: 1, flexBasis: '100%' }}
                           data-handover-input="name"
                        >
                           {crr[0]}
                        </span>
                        <p
                           className={`${style.fieldJobItemInput} handoverItem`}
                           style={{ color: 'blue', paddingTop: 0, paddingBottom: 0 }}
                           data-handover-input="amount"
                           // data-job-input={index}
                           contentEditable="true"
                           suppressContentEditableWarning={true}
                        >
                           {crr[1]}
                        </p>
                        <span className={`${style.unit} handoverItem`} 
                           data-handover-input="unit">
                           {crr[2]}
                        </span>
                     </li>
                  )
               })}
            </ul>
         </div>
         {/* ///////////////////////////////// */}
         <div className={style.fieldJobTitle}>Thêm vật tư/ Thiết bị mới</div>
         <section className={style.fieldJobList}>
            <div className={`${style.fieldIssueItem} add-handover-equip`}>
               <div className={style.fieldIssueItemContentWarp}>
                  <div className={style.fieldIssueItemContentWarpItem}>
                     <span className={style.fieldIssueItemTitleChild}>Tên vật tư*</span>
                     <p className={`${style.fieldJobItemInput} name`} contentEditable="true" />
                  </div>
                  <div className={style.fieldIssueItemContentWarpItem}>
                     <span className={style.fieldIssueItemTitleChild}>Số lượng*</span>
                     <p
                        className={`${style.fieldJobItemInput} amount`}
                        style={{ textAlign: 'right' }}
                        contentEditable="true"
                     />
                     <span className={style.space5}></span>
                     <select className={`${style.optionUnit} unit`} name="unit">
                        <option value={'Cái'}>Cái</option>
                        <option value={'Bộ'}>Bộ</option>
                        <option value={'Mét'}>Mét</option>
                        <option value={'Cuộn'}>Cuộn</option>
                        <option value={'Thanh'}>Thanh</option>
                        <option value={'Hộp'}>Hộp</option>
                     </select>
                     <span className={style.spaceLR2dot5}></span>
                  </div>
               </div>
            </div>

            <div className={style.addJobWrap} onClick={handelAddEquipmentField}>
               <div className={style.addJobWrapText}>Thêm Vật Tư </div>
               <span className="material-symbols-outlined">add</span>
            </div>
         </section>
      </div>
   )
}

/////////////////handel even///////////////////////
