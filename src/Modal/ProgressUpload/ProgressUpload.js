import { Box, Button, Dialog, DialogTitle, LinearProgress } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
// import postDataToDB from "../../../api/postDataToDB";
import postDataToStorage from '../../api/postDataToStorage';
import { getFirebaseData } from '../../handelAction/getFirebaseData';
import createMonthDataPost from '../../handelAction/createDataPost/createMonthDataPost';
import createWeekDataPost from '../../handelAction/createDataPost/createWeekDataPost';
import createShiftDataPost from '../../handelAction/createDataPost/createShiftDataPost';
import style from './ProgressUpload.module.css';
import { MIMEtype } from '../../FCComponent/MIMEtype';

import { update } from 'firebase/database'
import { dbRT } from '../../firebase/firebaseConfig'

export default function ProgressUpload({ reRender, mediaData, type }) {
   //TODO: mount
   console.log('%cProgressUpload Render', 'color:green');
   useEffect(() => {
      return () => {
         console.log('%cProgressUpload Unmount', 'color:red');
      };
   }, []);
   //TODO_EMD: mount
   const [state, setState] = useState({ state: 'init', data: '' });
   console.log('🚀 ~ ProgressUpload ~ state:', state);
   const idUpload = useRef(Date.now());
   // console.log('🚀 ~ ProgressUpload ~ state:', state);
   const [fileProgressState, setFileProgressState] = useState({ bytesTransferred: '0', totalBytes: '0' });
   const [imageBlobArray, setImageBlobArray] = useState([]);
   // console.log('🚀 ~ ProgressUpload ~ imageBlobArray:', imageBlobArray);

   //TODO: make data
   useEffect(() => {
      if (true) {
         switch (type) {
            case 'weekReport': {
               createWeekDataPost(setState);
               break;
            }
            case 'monthReport': {
               createMonthDataPost(reRender);
               break;
            }
            case 'shiftReport': {
               createShiftDataPost(reRender);
               break;
            }
         }
      }
   }, []);
   //TODO_END: make data

   //TODO: create new Array image
   useEffect(() => {
      for (let key in mediaData?.images) {
         const dataTypeTemp = mediaData?.images[key];
         // console.log('🚀 ~ useEffect ~ dataTypeTemp:', dataTypeTemp);
         const arrayTemp = [];
         for (const objItem of dataTypeTemp) {
            let index = 1;
            for (const item of objItem.images) {
               arrayTemp.push({ line: `${key}-${objItem.id}_${index}`, image: item, process: { bytesTransferred: '0', totalBytes: '0' } });
               index++;
            }
         }

         setImageBlobArray(arrayTemp);
      }
   }, []);

   //TODO_END: create new Array image
   //TODO: Upload
   switch (state.state) {
      case 'file Upload': {
         if (fileProgressState.bytesTransferred <= 0 && !state.uploadInProgress) {
            setState((prevState) => ({ ...prevState, uploadInProgress: true }));

            if (mediaData.attachments[0]) {
               const file = mediaData.attachments[0];
               const temp = file.name.split('.');
               const tag = temp[temp.length - 1];
               const fileName = file.name + '.' + tag; //! làm sắn để sau này bổ sung tên tập tin từ người dùng nhâp vào
               const ref = `REPORT/${state.data?.reportType}/${idUpload.current}/FILE/${fileName}`;

               const callback = (messenger, result) => {
                  if (messenger === 'Upload completed successfully') {
                     state.data.attachments[0] = { fileRef: ref, fileURL: result };
                     setState((prevState) => ({
                        ...prevState,
                        state: 'image Upload',
                        uploadInProgress: false,
                     }));
                  } else if (messenger === 'Upload Failed') {
                     setState((prevState) => ({ ...prevState, state: 'error', uploadInProgress: false }));
                  }
               };

               if (file.type === '') {
                  const tagTemp = temp[temp.length - 1];
                  const newMetadata = {
                     contentType: MIMEtype[tagTemp],
                  };
                  postDataToStorage(file, ref, fileName, callback, setFileProgressState, newMetadata);
               } else {
                  postDataToStorage(file, ref, fileName, callback, setFileProgressState);
               }
            } else {
               setState((prevState) => ({
                  state: 'image',
                  data: prevState.data,
                  uploadInProgress: false,
               }));
            }
         }
         break;
      }

      case 'image Upload': {
         if (!state.uploadInProgress) {
            setState((prevState) => ({ ...prevState, uploadInProgress: true }));
            if (imageBlobArray.length === 0) {
               setState((prevState) => ({
                  state: 'data upload',
                  data: prevState.data,
                  uploadInProgress: false,
               }));
            } else {
               const finishArrayCheck = [];
               imageBlobArray.forEach((crr, index) => {
                  const file = crr.image;
                  const fileName = `Index ${index} : ${crr.line}`;
                  const ref = `REPORT/${state.data.reportType}/${idUpload.current}/IMAGE/${fileName}`;
                  const callback = (messenger, result) => {
                     if (messenger === 'Upload completed successfully') {
                        const temp = { fileRef: ref, fileURL: result };
                        state.data.images.push(temp);

                        finishArrayCheck.push(index);
                        if (finishArrayCheck.length === imageBlobArray.length) {
                           setState((prevState) => ({
                              state: 'data upload',
                              data: prevState.data,
                              uploadInProgress: false,
                           }));
                        }
                     } else if (messenger === 'Upload Failed') {
                        setState('error');
                     }
                  };
                  const handleProgressUpload = (progressState) => {
                     const arrayTemp = [...imageBlobArray];
                     arrayTemp[index].process.bytesTransferred = progressState.bytesTransferred;
                     arrayTemp[index].process.totalBytes = progressState.totalBytes;
                     setImageBlobArray(arrayTemp);
                  };
                  postDataToStorage(file, ref, fileName, callback, handleProgressUpload);
               });
            }
         }

         break;
      }
      case 'data upload': {
         if (!state.uploadInProgress) {
            setState((prevState) => ({ ...prevState, uploadInProgress: true }));


            const updateDataFirebase = (ref, objectData) =>{
               objectData['ref'] = ref
               // const newRef = ref
               const updates = {}
               updates[ref] = objectData
               const objectDataNew = {}
               objectDataNew.authEmail = objectData.authEmail
               objectDataNew.ref = ref
               objectDataNew.user = objectData.user
               objectDataNew.date = objectData.date
               objectDataNew.type = 'weekReport'
               updates[`NewReport/${idUpload.current}`] = objectDataNew
               //   for (const key in objectData) {
               //     updates["Report"] = objectData[key];
               //   }
            
               // console.log(updates);
            
               return update(dbRT, updates)
            }
            const ref = `Report/WeekReport/${idUpload.current}`;
            updateDataFirebase(ref, state.data).then(() => {
               getFirebaseData(ref)
                  .then((result) => {
                     // console.log(result.val())
                     reRender(result.val());
                  })
                  .catch((error) => {
                     alert(error);
                  });
            });



           
         }
      }
   }
   //TODO_END: Upload
   return (
      <section className={style.container}>
         <div className={style.content}>
            <header className={style.header}>
               {state.state !== 'done' ? (
                  <>
                     <h3 className={style.titleHeader}>Data is on upload progress. please wait !!!</h3>
                     <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                     </Box>
                  </>
               ) : (
                  <h3 className={style.titleHeader}>Data upload is done !!!</h3>
               )}
            </header>
            <div className={style.item}>
               <div className={style.itemChild}>
                  <span className={style.itemChildTitle}>Report Type: </span>
                  <span>{state.data?.reportType}</span>
               </div>
               <div className={style.itemChild}>
                  <span className={style.itemChildTitle}>Reporter: </span>
                  <span>{state.data?.user}</span>
               </div>
            </div>
            <div className={style.item}>
               <div className={style.itemChildTitle}>Attachments</div>
               <div className={style.listItem}>
                  <span className={style.listItemText}>
                     &diams;
                     {mediaData?.attachments[0]?.name}
                  </span>
                  <span className={style.listItemData}>
                     {fileProgressState?.bytesTransferred}/{fileProgressState?.totalBytes} Byte
                  </span>
               </div>
            </div>
            <div className={style.item}>
               <div className={style.itemChildTitle}>Images</div>
               {imageBlobArray.map((crr, index) => {
                  return (
                     <div className={style.listItem} key={index}>
                        <span className={style.listItemText}>
                           &diams;
                           {`Index ${index + 1} :     ${crr.line}`}
                        </span>
                        <span className={style.listItemData}>
                           {crr.process?.bytesTransferred}/{crr.process?.totalBytes} Byte
                        </span>
                     </div>
                  );
               })}
            </div>
            <div className={style.item}>
               <div className={style.itemChildTitle}>Data</div>
               {state === 'done' ? <div className={style.listItem}>upload done</div> : <div className={style.listItem}>waiting upload ...</div>}
            </div>
            <Dialog open={state === 'done'} fullWidth>
               <DialogTitle>Data upload is done !!!</DialogTitle>
               <div className={style.doneButton}>
                  <Button
                     variant="contained"
                     sx={{ m: 1, width: '300px' }}
                     onClick={() => {
                        window.location.replace('/');
                     }}
                  >
                     Back to Home
                  </Button>
                  <Button
                     variant="contained"
                     color="success"
                     sx={{ m: 1, width: '300px' }}
                     onClick={() => {
                        const state = state.data?.ref;
                        window.history.pushState([...state.split('/'), 'direct'], '', '/');
                        window.location.href = '/';
                     }}
                  >
                     Show new item uploaded
                  </Button>
               </div>
            </Dialog>
         </div>
      </section>
   );
}
