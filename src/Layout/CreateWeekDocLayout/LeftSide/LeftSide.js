import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import { Button } from '@mui/material';
import { useState,useEffect } from 'react';
import style from './LeftSide.module.css';

export default function LeftSide({ user, handleAddImage, jobState, setJobState, handleChooseFile }) {
   return (
      <section className={style.warpPage}>
         <section className={style.writeArea}>
            <div className={style.writeAreaTitle}>Báo Cáo Tuần</div>
            <div className={style.writeAreaTime}>
               Tuần{' '}
               <select className={style.optionWeek} name="weekWeekReport">
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
               </select>
               {' .'}
               Tháng{' '}
               <select className={style.optionMonth} name="monthWeekReport">
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
                     );
                  })}
               </select>{' '}
            </div>
            <i style={{ fontSize: '0.8rem' }}>(Ngày đầu tiên của Tuần 1 sẽ là Thứ 2 đầu tiên của tháng)</i>
            <JobWrite handleAddImage={handleAddImage} jobState={jobState} setJobState={setJobState} handleChooseFile={handleChooseFile} />
            <IssueWrite />
            <PlanWrite />
            <ProposeWrite />
         </section>
      </section>
   );
}

/////////////////////

function JobWrite({ handleAddImage ,jobState, setJobState, handleChooseFile }) {


   const handelAddJobField = () => {
      // const array = [...state, state[state.length - 1] + 1];

      const array = [...jobState];
      array.push({id: jobState.length + 1 , status: 'ok'} );
      setJobState(array);
   };
   const handelDeleteJobField = (id) => {
   console.log("🚀 ~ handelDeleteJobField ~ index:", id)
  
      const arrayNode = document.querySelectorAll(`.create-job`);
      for (const item of arrayNode) {
         console.dir(item)
         if (+item.dataset.jobIndex === id) {
            item.remove()
            let array = [...jobState]
            array[id-1].status = 'deleted'
            setJobState([...array])
            break;
         }
            
      }
      
   };
console.log("left",jobState)
   return (
      <div className={style.fieldJobWarp}>
         <div className={style.fieldJobTitle}>Công việc đã làm trong tuần</div>
         <ul className={style.fieldJobList}>
            { jobState?.map((crr, index) => {
               
               return (
                  <li className={`${style.fieldJobItem} create-job`} key={index} data-job-index={crr.id} data-job-id={crr.id} >
                     <div className={style.fieldJobItemTitle}>Công việc {crr.id}</div>
                     <p className={style.fieldJobItemInput} data-job-input={index} contentEditable="true" />

                     <div>
                        <Button
                           sx={{
                              padding: '1px 4px', // Adjust the padding
                              fontSize: '0.6rem', // Adjust the font size
                              minWidth: 'auto', // Remove the default minWidth
                           }}
                           variant="outlined"
                           size="small"
                           color="primary"
                           startIcon={<AddPhotoAlternateIcon />}
                           onClick={() => {
                              handleAddImage(crr.id);
                           }}
                        >
                           0
                        </Button>
                        <Button
                           sx={{
                              padding: '1px 4px', // Adjust the padding
                              fontSize: '0.6rem', // Adjust the font size
                              minWidth: 'auto', // Remove the default minWidth
                              ml: 1,
                           }}
                           variant="outlined"
                           size="small"
                           color="primary"
                           startIcon={<AttachFileIcon />}
                           onClick={() => {
                              handleChooseFile(crr.id);
                           }}
                        >
                           0
                        </Button>
                     </div>
                     <span
                        className={`material-symbols-outlined ${style.fieldJobItemDelete}`}
                        onClick={(e) => {
                           handelDeleteJobField(crr.id);
                        }}
                     >
                        delete
                     </span>
                  </li>
               );
            })}

            <div className={style.addJob_addImageWrap}>
               <div className={style.addJobWrap} onClick={handelAddJobField}>
                  <div className={style.addJobWrapText}>Thêm công việc </div>
                  <span className="material-symbols-outlined">add</span>
               </div>
            </div>
         </ul>
      </div>
   );
}
/////////////////

function IssueWrite() {
   const [state, setState] = useState([1]);

   const handelAddIssueField = () => {
      const array = [...state, state[state.length - 1] + 1];
      setState(array);
   };
   const handelDeleteIssueField = (index) => {
      const arrayNode = document.querySelectorAll(`.create-issue`);
      for (const item of arrayNode) {
         if (item.dataset.issueIndex === index) {
            return item.remove();
         }
      }
   };
   return (
      <div className={style.fieldIssueWarp}>
         <div className={style.fieldIssueTitle}>Sự cố xảy ra trong tuần</div>
         <ul className={style.fieldIssueList}>
            {/*  */}
            {state.map((crr, index) => {
               return (
                  <IssueWriteElement
                     key={index}
                     index={index}
                     callBack={(indexFB) => {
                        handelDeleteIssueField(indexFB);
                     }}
                  />
               );
            })}

            {/*  */}
            <div className={style.addIssueWrap} onClick={handelAddIssueField}>
               <div className={style.addIssueWrapText}>Thêm sự cố </div>
               <span className="material-symbols-outlined">add</span>
            </div>
         </ul>
      </div>
   );
}

function IssueWriteElement({ index, callBack }) {
   return (
      <li className={`${style.fieldIssueItem} create-issue`} data-issue-index={index}>
         <div className={style.fieldIssueItemTitle}>Sự cố</div>
         <div className={style.fieldIssueItemContentWarp}>
            {/*  */}
            <div className={style.fieldIssueItemContentWarpItem}>
               <div className={style.fieldIssueItemTitleChild}>Tên sự cố*</div>
               <p className={style.fieldIssueItemInput} data-issue-input="name" contentEditable="true" />
            </div>
            <div className={style.fieldIssueItemContentWarpItem}>
               <div className={style.fieldIssueItemTitleChild}>Ngày*</div>
               <p className={style.fieldIssueItemInput} data-issue-input="date" contentEditable="true" />
            </div>
            {/*  */}
            {/*  */}
            <div className={style.fieldIssueItemContentWarpItem}>
               <div className={style.fieldIssueItemTitleChild}>Nội dung*</div>
               <p className={style.fieldIssueItemInput} data-issue-input="content" contentEditable="true" />
            </div>
            {/*  */}
            <div className={style.fieldIssueItemContentWarpItem}>
               <div className={style.fieldIssueItemTitleChild}>Biện pháp khắc phục*</div>
               <p className={style.fieldIssueItemInput} data-issue-input="solution" contentEditable="true" />
            </div>
            {/*  */}
         </div>
         <span
            className={`material-symbols-outlined ${style.fieldIssueItemDelete}`}
            onClick={(e) => {
               callBack(e.target.dataset.index);
            }}
            data-index={index}
         >
            delete
         </span>
      </li>
   );
}

///////////////////
function PlanWrite() {
   const [state, setState] = useState([1]);

   const handelAddPlanField = () => {
      const array = [...state, state[state.length - 1] + 1];
      setState(array);
   };
   const handelDeletePlanField = (index) => {
      const arrayNode = document.querySelectorAll(`.create-plan`);
      for (const item of arrayNode) {
         if (item.dataset.planIndex === index) {
            return item.remove();
         }
      }
   };
   return (
      <div className={style.fieldJobWarp}>
         <div className={style.fieldJobTitle}>Kế hoạch tuần tới</div>
         <ul className={style.fieldJobList}>
            {state.map((crr, index) => {
               return (
                  <li className={`${style.fieldJobItem} create-plan`} key={index} data-plan-index={index}>
                     <div className={style.fieldJobItemTitle}>Kế hoạch</div>
                     <p className={style.fieldJobItemInput} data-plan-input={index} contentEditable="true" />

                     <span
                        className={`material-symbols-outlined ${style.fieldJobItemDelete}`}
                        onClick={(e) => {
                           handelDeletePlanField(e.target.dataset.index);
                        }}
                        data-index={index}
                     >
                        delete
                     </span>
                  </li>
               );
            })}

            <div className={style.addJobWrap} onClick={handelAddPlanField}>
               <div className={style.addJobWrapText}>Thêm kế hoạch </div>
               <span className="material-symbols-outlined">add</span>
            </div>
         </ul>
      </div>
   );
}
/////////////////
function ProposeWrite() {
   const [state, setState] = useState([1]);

   const handelAddProposeField = () => {
      const array = [...state, state[state.length - 1] + 1];
      setState(array);
   };
   const handelDeleteProposeField = (index) => {
      const arrayNode = document.querySelectorAll(`.create-propose`);
      for (const item of arrayNode) {
         if (item.dataset.proposeIndex === index) {
            return item.remove();
         }
      }
   };
   return (
      <div className={style.fieldJobWarp}>
         <div className={style.fieldJobTitle}>Ý kiến/Đề xuất</div>
         <ul className={style.fieldJobList}>
            {state.map((crr, index) => {
               return (
                  <li className={`${style.fieldJobItem} create-propose`} key={index} data-propose-index={index}>
                     <div className={style.fieldJobItemTitle}>Đề xuất</div>
                     <p className={style.fieldJobItemInput} data-propose-input={index} contentEditable="true" />

                     <span
                        className={`material-symbols-outlined ${style.fieldJobItemDelete}`}
                        onClick={(e) => {
                           handelDeleteProposeField(e.target.dataset.index);
                        }}
                        data-index={index}
                     >
                        delete
                     </span>
                  </li>
               );
            })}

            <div className={style.addJobWrap} onClick={handelAddProposeField}>
               <div className={style.addJobWrapText}>Thêm kế hoạch </div>
               <span className="material-symbols-outlined">add</span>
            </div>
         </ul>
      </div>
   );
}
