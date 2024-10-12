//JSX: Right side component

import { Button } from '@mui/material';
import { handelOpenTextFile } from '../../../FCComponent/browserFile';
import { getKeyByValue } from '../../../FCComponent/getKeyByValue';
import style from './RightSide.module.css';
import { MIMEtype } from '../../../FCComponent/MIMEtype';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import noImageAvailable from '../../../static/img/No_Image_Available.jpg';

export default function RightSide({ prop, jobState, setJobState }) {
   console.log('🚀 ~ RightSide ~ jobState:', jobState);
   const arrayImageRender = [1, 2, 3, 4];
   //TODO: choose file
   const handleChooseFile = () => {
      handelOpenTextFile(prop.setFile);
   };
   //TODO_END: choose file
   //TODO: handle delete image
   const handleDeleteImage = (id, itemIndex) => {
      //     const newArray = prop?.[`imageArray${lineIndex}`].filter((element, index) => {
      //        return itemIndex !== index;
      //     });

      //     prop?.[`setImageArray${lineIndex}`](newArray);
      //  };
      const updatedJobState = jobState.map((item) => {
         if (item.id === id) {
            console.log(item);

            if (Array.isArray(item.status) && item.status.length > 1) {
               const handleNewArray = item.status.filter((image, index) => {
                  return itemIndex !== index;
               });
               item.status = handleNewArray;
            } else {
               item.status = 'ok';
            }
         }

         return item;
      });
      setJobState(updatedJobState);
   };

   //TODO_END: handle delete image
   return (
      <section className={style.rightSide}>
         <div className={style.rightSideFile}>
            <div className={style.rightSideFileHeader}>
               <span style={{ color: 'black', fontWeight: 600, textAlign: 'start' }}>File*</span>
               {jobState.map((crr, index) => {
                  if (Array.isArray(crr.attach)) {
                     return (
                        <div className={style.rightSideFileList} key={index}>
                           {crr.id}
                           <div style={{ color: 'green', fontWeight: 600, textAlign: 'start', margin: '5px' }}>
                              {prop?.file?.name ? prop.file.name : '...'}
                           </div>
                           <div style={{ color: 'gray', fontStyle: 'italic', textAlign: 'start', margin: '5px' }}>
                              <span style={{ padding: '5px' }}>type: {prop?.file?.type ? getKeyByValue(MIMEtype, prop.file.type) : '...'}</span>
                              <span style={{ padding: '5px' }}>size: {prop?.file?.size ? prop.file.size : '...'} BYTE</span>
                           </div>
                        </div>
                     );
                  }
               })}
            </div>
         </div>
         <div className={style.rightSideFile}>
            <div className={style.rightSideFileHeader}>
               <span style={{ color: 'black', fontWeight: 600, textAlign: 'start' }}>Image</span>
            </div>
            {jobState.map((crr, index) => {
               if (Array.isArray(crr.status)) {
                  return (
                     <section className={style.rightSideImageList} key={index}>
                        {crr.id}
                        {arrayImageRender.map((crrItem, indexItem) => {
                           return (
                              <div className={style.rightSideImageItem} key={`${crr?.id}-${indexItem}`}>
                                 <img
                                    className={style.rightSideImageItemImage}
                                    alt=""
                                    src={crr.status[indexItem] ? URL.createObjectURL(crr.status[indexItem]) : noImageAvailable}
                                 />
                                 <div className={style.rightSideImageItemDeleteIcon} onClick={() => handleDeleteImage(crr.id, indexItem)}>
                                    <HighlightOffRoundedIcon className={style.rightSideImageItemDeleteIconItem} />
                                 </div>
                              </div>
                           );
                        })}
                     </section>
                  );
               }
            })}
         </div>
      </section>
   );
}

//JSX_END: Right side component
