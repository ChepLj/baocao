//JSX: Right side component

import { Button } from '@mui/material';
import { handelOpenTextFile } from '../../../FCComponent/browserFile';
import { getKeyByValue } from '../../../FCComponent/getKeyByValue';
import style from './RightSide.module.css';
import { MIMEtype } from '../../../FCComponent/MIMEtype';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import noImageAvailable from '../../../static/img/No_Image_Available.jpg';

export default function RightSide({ prop, jobState, setJobState, handleChooseFile, file ,setFile}) {

   const arrayImageRender = [1, 2, 3, 4];



   
   //TODO: handle delete File
   const handleDeleteFile = (id, itemIndex) => {
      setFile('')
   }
   //TODO: handle delete File
   //TODO: handle delete image
   const handleDeleteImage = (id, itemIndex) => {
      //     const newArray = prop?.[`imageArray${lineIndex}`].filter((element, index) => {
      //        return itemIndex !== index;
      //     });

      //     prop?.[`setImageArray${lineIndex}`](newArray);
      //  };
      const updatedJobState = jobState.map((item) => {
         if (item.id === id) {
            if (Array.isArray(item.images) && item.images.length > 1) {
               const handleNewArray = item.images.filter((image, index) => {
                  return itemIndex !== index;
               });
               item.images = handleNewArray;
            } else {
               item.images = [];
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
               <Button variant="outlined" size="small" color="primary" startIcon={<AttachFileIcon />} onClick={handleChooseFile}>
                  choose file
               </Button>
            </div>
            <div style={{ color: 'green', fontWeight: 600, textAlign: 'start', margin: '5px' }}>{file?.name ? file.name : '...'}</div>
            <div style={{ color: 'gray', fontStyle: 'italic', textAlign: 'start', margin: '5px' }}>
               {file?.size ? <span
                  className={`material-symbols-outlined ${style.fileDeleteIcon}`}
                  onClick={(e) => {
                     handleDeleteFile();
                  }}
               >
                  delete
               </span> :""}
               
               <span style={{ padding: '5px' }}>type: {file?.type ? getKeyByValue(MIMEtype, file?.type) : '...'}</span>
               <span style={{ padding: '5px' }}>size: {file?.size ? file.size : '...'} BYTE</span>
            </div>
         </div>
         <div className={style.rightSideFile}>
            <div className={style.rightSideFileHeader}>
               <span style={{ color: 'black', fontWeight: 600, textAlign: 'start' }}>Image</span>
            </div>
            {jobState.map((crr, index) => {
               if (crr.images.length) {
                  return (
                     <section className={style.rightSideImageList} key={index}>
                        {crr.id}
                        {arrayImageRender.map((crrItem, indexItem) => {
                           return (
                              <div className={style.rightSideImageItem} key={`${crr?.id}-${indexItem}`}>
                                 <img
                                    className={style.rightSideImageItemImage}
                                    alt=""
                                    src={crr.images[indexItem] ? URL.createObjectURL(crr.images[indexItem]) : noImageAvailable}
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
