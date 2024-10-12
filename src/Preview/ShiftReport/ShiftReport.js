import style from './ShiftReport.module.css'
import { logoPomina,confirm } from '../../static/svg/sgv'
import createConfirmShift from '../../handelAction/createDataPost/createConfirmShift'
import { useState } from 'react';
import { getFirebaseData } from './../../handelAction/getFirebaseData';

export default function ShiftReport({ content }) {
   const [state, setState] = useState(content)

   const handelIDConfirm = (inputText) => {
      // *TODO: làm chức năng xác nhận bằng Mã định danh
      getFirebaseData('UserID').then((result) => {
         const IDList = result.val()
      
         for(const userID in IDList) {
            console.log("🚀 ~ file: ShiftReport.js:17 ~ getFirebaseData ~ state?.authEmail", state?.authEmail)
            console.log("🚀 ~ file: ShiftReport.js:17 ~ getFirebaseData ~ userID.email", userID.email)
            if( IDList[userID].email == state?.authEmail)

            {
               alert('Lỗi! Email của mã định danh trùng với email tạo báo cáo, không chấp nhận Giao ca và Nhận ca cùng 1 user\n vui lòng thử lại !')
               return //:không chấp nhận
            }
            if (userID == inputText) {
               const confirmedCallback = (contentCallback) => {
                  // *TODO: làm chức năng render lại khi đã xác nhận thành công
                  setState(contentCallback)
               }
               const objectData = {}
               objectData.user = IDList[userID].email   
               objectData.status = true
               objectData.message = 'Đã được xác nhận thành công bằng Mã định danh'
               objectData.type = 'UserID'
               objectData.time = Date.now()
               const refDirection = content?.ref
               const handoverEquip = content?.handover
               createConfirmShift(refDirection, objectData, handoverEquip, confirmedCallback)
               return //:thoát sau khi đã xác nhận đúng UserID

            }
         }
         alert('Không tìm thấy User nào có mã định danh tương ứng, vui lòng thử lại !')

      }
      )
   }

   const handelLoginConfirm = () => {
      // *TODO: làm chức năng xác nhận bằng Login
      const confirmedCallback = (contentCallback) => {
         // *TODO: làm chức năng render lại khi đã xác nhận thành công
         setState(contentCallback)
      }
      const objectData = {}
      objectData.user = currentUser
      objectData.status = true
      objectData.message = 'đã được xác nhận thành công bằng Email'
      objectData.type = 'Login'
      objectData.time = Date.now()
      const refDirection = content?.ref
      const handoverEquip = content?.handover

      createConfirmShift(refDirection, objectData,handoverEquip, confirmedCallback)
   }
   // Lấy current user login
   let currentUser = 'none'
   if (sessionStorage.getItem('user')) {
      const temp = JSON.parse(sessionStorage.getItem('user'))
      currentUser = temp.email
   }
   ////

   // TODO: gọi lên firebase để lấy vậy tư bàn giao cả ca trước
   return (
      <section className={`${style.warp} shift-warp`}>
         <header className={`${style.header} shift-header`}>
            <div className={`${style.headerItem} shift-headerItem`}>
               <div className={`${style.logoImg} shift-logoImg`}>{logoPomina}</div>
               {/* <span  style={{ fontSize: '0.7rem'}}>Nhà máy  Pomina3</span> */}
            </div>
            <div
               className={`${style.headerItem} ${style.headerItemBorderLR} shift-headerItem shift-headerItemBorderLR`}
            >
               <span className={`${style.headerTitle} shift-headerTitle`} style={{ fontSize: '1.5rem', fontWeight: 700 }}>Báo Cáo CA</span>
               <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>Bảo Trì Điện BF </span>
            </div>
            <div className={`${style.headerItemInfo} shift-headerItemInfo`}>
               <div className={`${style.infoItem} shift-infoItem`}>
                  Ca
                  <span  className={`${style.infoItemChild} shift-infoItemChild`}  style={{color:'red'}} 
                  >
                     {content?.shift}
                  </span>
               </div>
               <div className={`${style.infoItem} shift-infoItem`}>
                  Tháng
                  <span className={`${style.infoItemChild} shift-infoItemChild`} style={{color:'blue'}}
                  >
                     {content?.date.month}
                  </span>
               </div>
               <div className={`${style.infoItem} shift-infoItem`}>
                  Năm
                  <span className={`${style.infoItemChild} shift-infoItemChild`} style={{color:'green'}}
                  >
                     {content?.date.year}
                  </span>
               </div>
            </div>
            {/* confirm */}
            <div className={`${style.confirmImg} shift-confirmImg`}>
               {state?.confirm?.status && confirm}
            </div>
         </header>
         <div className={`${style.timeStamp} shift-timeStamp`}>
            {state?.date?.session}, Ngày {state?.date?.date} Tháng {state?.date?.month} năm{' '}
            {state?.date?.year}
         </div>
         <section style={{ width: '100%', textAlign: 'center', paddingBottom: '1.2rem' }}>
            <table  className={`${style.table} shift-table`}>
               <caption className={`${style.tableCaption} shift-tableCaption`}>
                  I. Các công việc/Sự cố trong Ca
               </caption>
               <thead>
                  <tr>
                     <th className={`${style.tableTitle} shift-tableTitle`} style={{ width: '4%' }}>
                        Stt
                     </th>
                     <th
                        className={`${style.tableTitle} shift-tableTitle`}
                        style={{ width: '15%' }}
                     >
                        Khu vực
                     </th>
                     <th className={`${style.tableTitle} shift-tableTitle`}>Nội dung</th>
                     <th
                        className={`${style.tableTitle} shift-tableTitle`}
                        style={{ width: '13%' }}
                     >
                        Thời gian
                     </th>
                     <th
                        className={`${style.tableTitle} shift-tableTitle`}
                        style={{ width: '15%' }}
                     >
                        Kết quả
                     </th>
                  </tr>
               </thead>
               {state?.issue.map((crr, index) => {
                  return (
                     <tbody key={index}>
                        <tr>
                           <td className={`${style.tableContent} shift-tableContent`}>
                              {index + 1}
                           </td>
                           <td className={`${style.tableContent} shift-tableContent`}>
                              {crr?.area}
                           </td>
                           <td className={`${style.tableContent} shift-tableContent`}>
                              {crr?.name}
                           </td>
                           <td className={`${style.tableContent} shift-tableContent`}>
                              {crr?.time}
                           </td>
                           <td className={`${style.tableContent} shift-tableContent`}>
                              {crr?.result}
                           </td>
                        </tr>
                     </tbody>
                  )
               })}
            </table>
            {/* /// */}
            <table  className={`${style.table} shift-table`}>
               <caption className={`${style.tableCaption} shift-tableCaption`}>
                  II. KSKV/ CA trước giao việc
               </caption>
               <thead >
                  <tr>
                     <th className={`${style.tableTitle} shift-tableTitle`} style={{ width: '4%' }}>
                        Stt
                     </th>
                     <th
                        className={`${style.tableTitle} shift-tableTitle`}
                        style={{ width: '22%' }}
                     >
                        Người giao
                     </th>
                     <th className={`${style.tableTitle} shift-tableTitle`}>Công việc</th>
                  </tr>
               </thead>
               {state?.order.map((crr, index) => {
                  return (
                     <tbody key={index}>
                        <tr>
                           <td className={`${style.tableContent} shift-tableContent`}>
                              {index + 1}
                           </td>
                           <td className={`${style.tableContent} shift-tableContent`}>
                              {crr?.people}
                           </td>
                           <td className={`${style.tableContent} shift-tableContent`}>
                              {crr?.content}
                           </td>
                        </tr>
                     </tbody>
                  )
               })}
            </table>
            {/* /// */}
            <table  className={`${style.table} shift-table`}>
               <caption className={`${style.tableCaption} shift-tableCaption`}>
                  III. Ý kiến/Đề xuất
               </caption>
               <thead>
                  <tr>
                     <th className={`${style.tableTitle} shift-tableTitle`} style={{ width: '4%' }}>
                        Stt
                     </th>
                     <th className={`${style.tableTitle} shift-tableTitle`}>Ý kiến/Đề xuất</th>
                  </tr>
               </thead>

               {state?.propose.map((crr, index) => {
                  return (
                     <tbody key={index}>
                        <tr>
                           <td className={`${style.tableContent} shift-tableContent`}>
                              {index + 1}
                           </td>
                           <td className={`${style.tableContent} shift-tableContent`}>{crr}</td>
                        </tr>
                     </tbody>
                  )
               })}
            </table>
            <span style={{ width: '100%' ,fontSize: '0.6em',paddingLeft: '13px'}}>------------\***/ ------------</span>

            <table border="1px" className={`${style.table} shift-table`}>
               <thead>
                  <tr>
                     <th
                        className={`${style.tableTitle} shift-tableTitle`}
                        style={{ width: '50%' }}
                     >
                        Vật tư đã sử dụng trong Ca
                     </th>
                     <th className={`${style.tableTitle} shift-tableTitle`}>Vật tư Bàn Giao</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td style={{ verticalAlign: 'top' }}>
                        <table className={`${style.tableChild} shift-tableChild`} border={'1px'}>
                           <thead>
                              <tr>
                                 <th
                                    className={`${style.tableTitleChild} shift-tableTitleChild`}
                                    style={{ width: '10%' }}
                                 >
                                    Stt
                                 </th>
                                 <th
                                    className={`${style.tableTitleChild} shift-tableTitleChild`}
                                    style={{ width: '25%' }}
                                 >
                                    Mã vật tư
                                 </th>
                                 <th className={`${style.tableTitleChild} shift-tableTitleChild`}>
                                    Tên vật tư
                                 </th>
                                 <th
                                    className={`${style.tableTitleChild} shift-tableTitleChild`}
                                    style={{ width: '15%' }}
                                 >
                                    Số lượng
                                 </th>
                                 <th
                                    className={`${style.tableTitleChild} shift-tableTitleChild`}
                                    style={{ width: '15%' }}
                                 >
                                    Đơn vị
                                 </th>
                              </tr>
                           </thead>
                           {state?.equipmentUsed.map((crr, index) => {
                              return (
                                 <tbody key={index}>
                                    <tr>
                                       <td
                                          className={`${style.tableContentChild} shift-tableTitleChild`}
                                       >
                                          {index + 1}
                                       </td>
                                       <td
                                          className={`${style.tableContentChild} shift-tableTitleChild`}
                                       >
                                          {crr?.IDCode}
                                       </td>

                                       <td
                                          className={`${style.tableContentChild} shift-tableTitleChild`}
                                       >
                                          {crr?.name}
                                       </td>
                                       <td
                                          className={`${style.tableContentChild} shift-tableTitleChild`}
                                       >
                                          {crr?.amount}
                                       </td>
                                       <td
                                          className={`${style.tableContentChild} shift-tableTitleChild`}
                                       >
                                          {crr?.unit}
                                       </td>
                                    </tr>
                                 </tbody>
                              )
                           })}
                        </table>
                     </td>
                     <td style={{ verticalAlign: 'top' }}>
                        <table className={`${style.tableChild} shift-tableChild`} border={'1px'}>
                           <thead>
                              <tr>
                                 <th
                                    className={`${style.tableTitleChild} shift-tableTitleChild`}
                                    style={{ width: '10%' }}
                                 >
                                    Stt
                                 </th>

                                 <th className={`${style.tableTitleChild} shift-tableTitleChild`}>
                                    Tên vật tư
                                 </th>
                                 <th
                                    className={`${style.tableTitleChild} shift-tableTitleChild`}
                                    style={{ width: '15%' }}
                                 >
                                    Số lượng
                                 </th>
                                 <th
                                    className={`${style.tableTitleChild} shift-tableTitleChild`}
                                    style={{ width: '15%' }}
                                 >
                                    Đơn vị
                                 </th>
                              </tr>
                           </thead>
                           {state?.handover.map((crr, index) => {
                              return (
                                 <tbody key={index}>
                                    <tr>
                                       <td
                                          className={`${style.tableContentChild} shift-tableContentChild`}
                                       >
                                          {index + 1}
                                       </td>

                                       <td
                                          className={`${style.tableContentChild} shift-tableContentChild`}
                                       >
                                          {crr?.name}
                                       </td>
                                       <td
                                          className={`${style.tableContentChild} shift-tableContentChild`}
                                       >
                                          {crr?.amount}
                                       </td>
                                       <td
                                          className={`${style.tableContentChild} shift-tableContentChild`}
                                       >
                                          {crr?.unit}
                                       </td>
                                    </tr>
                                 </tbody>
                              )
                           })}
                        </table>
                     </td>
                  </tr>
               </tbody>
            </table>
            {/* Ký tên */}
            {/*  */}
            <div className={`${style.signWrap} shift-signWrap`}>
               <table className={`${style.table} shift-table`} border={'1px'}>
                  <thead>
                     <tr>
                        <th
                           className={`${style.tableTitle} shift-tableTitle`}
                           style={{ width: '50%' }}
                        >
                           Giao ca
                        </th>
                        <th className={`${style.tableTitle} shift-tableTitle`}>Nhận ca</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td className={`${style.tableSignContent} shift-tableSignContent`}>
                           {/* <span>Đã ký</span> */}
                           <span>{(state.authEmail ??= 'none')}</span>
                        </td>
                        {/* hiện/ẩn khung ký xác nhận  */}
                        {state?.confirm?.status ? (
                           // *TODO: nếu đã xác nhận thì hiện mã này
                           <td className={`${style.tableSignContent} shift-tableSignContent`}>
                              <div>{state?.confirm?.user}</div>
                              <div
                                 style={{ fontSize: '0.6rem', fontStyle: 'italic', color: '#ccc' }}
                              >
                                 {state?.confirm?.message}
                              </div>
                           </td>
                        ) : (
                           // *TODO: nếu Chưa xác nhận thì hiện mã này
                           // Tiếp tục check điều kiện Auth khác current_user

                           <td
                              className={`${style.tableSignContent} shift-hidden `}
                              style={{ display: 'flex', flexDirection: 'column' }}
                           >
                              {state?.authEmail === currentUser || currentUser === 'none' ? (
                                
                                 // TODO: nếu cùng user hoặc chưa đăng nhập thì hiện nhập mã định danh hoặc nút chuyển hướng đăng nhập
                                 <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div className={`${style.tableSignContentIDConfirm} `}>
                                       <input
                                          className={`${style.IDConfirmInput} `}
                                          type="password"
                                          name="confirm"
                                          placeholder="Nhập mã Định Danh"
                                       ></input>
                                       <button
                                          className={`${style.IDConfirmButton} `}
                                          onClick={()=>{
                                             const text = document.querySelector(`.${style.IDConfirmInput} `).value
                                             handelIDConfirm(text)}}
                                       >
                                          Xác Nhận
                                       </button>
                                    </div>
                                    <span className={`${style.tableSignContentText} `}>
                                       -*hoặc*-
                                    </span>
                                    <a
                                       className={`${style.tableSignContentLoginConfirm} `}
                                       href="/login"
                                    >
                                       {' '}
                                       Đăng nhập để xác nhận{' '}
                                    </a>
                                 </div>
                              ) : (
                                 // *TODO: nếu khác user và đã đăng nhập thì hiện nút để nhán xác nhận
                                 <div>
                                    <button
                                       className={`${style.LoginConfirmButton} `}
                                       onClick={handelLoginConfirm}
                                    >
                                       Xác Nhận
                                    </button>
                                    <span className={`${style.LoginConfirmLetter} `}>
                                       {'('}
                                       {currentUser}
                                       {')'}
                                    </span>
                                 </div>
                              )}
                           </td>
                        )}
                     </tr>
                  </tbody>
               </table>
            </div>
            <div className={`${style.time} shift-time`}>{(state.date.timestamp ??= 'none')}</div>
         </section>
         {/* phần này là phần cuối */}
         {/* <div className={`${style.auth} auth`}>{(content.authEmail ??= 'none')}</div> */}
      </section>
   )
}
///

