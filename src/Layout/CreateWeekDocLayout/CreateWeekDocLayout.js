import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import style from './CreateWeekDocLayout.module.css';
import Header from './Header/Header';
import LeftSide from './LeftSide/LeftSide';
import RightSide from './RightSide/RightSide';
import { handelOpenImageFile, handelOpenTextFile } from '../../FCComponent/browserFile';

export default function CreateWeekDocLayout() {
   const [jobState, setJobState] = useState([{ id: 1, status: 'ok' }]);
   const [snackBarOpen, setSnackBarOpen] = useState(false);
   const [imageArray1, setImageArray1] = useState([]);
   const [imageArray2, setImageArray2] = useState([]);
   const [imageArray3, setImageArray3] = useState([]);
   const [imageArray4, setImageArray4] = useState([]);
   const [imageArrays, setImageArrays] = useState([]);
   let location = useLocation(); //dùng useLocation để lấy prop
   const user = location.state.user;

   let auth = {};
   if (sessionStorage.getItem('user')) {
      auth = JSON.parse(sessionStorage.getItem('user'));
   } else {
      window.location.href = '/login';
   }
   ////////

   //TODO: handle add image
   const handleAddImage = (id) => {
      // Clone the jobState array immutably
      const updatedJobState = jobState.map((item) => {
         if (item.id === id) {
            // Log the matching item

            // Ensure status is an array and its length is less than 4
            if (Array.isArray(item.status) && item.status.length < 4) {
               const handleNewArray = (image) => {
                  // Add image to the status array (or create a new array if status is not set)
                  const updatedStatus = [...(item.status || []), image];

                  console.log('Updated status array:', updatedStatus);

                  // Update item status in the copied array
                  item.status = updatedStatus;

                  // Set the updated state
                  setJobState(updatedJobState);
               };

               // Trigger the file handler and pass the function to process the image
               handelOpenImageFile(handleNewArray);
            } else if (!Array.isArray(item.status)) {
               // If status is not an array, initialize it with the new image
               const handleNewArray = (image) => {
                  // Initialize status as an array with the new image
                  item.status = [image];

                  console.log('Initialized status array:', item.status);

                  // Set the updated state
                  setJobState(updatedJobState);
               };

               // Trigger the file handler to select image
               handelOpenImageFile(handleNewArray);
            } else {
               // Show snack bar if status array length is 4 or more
               setSnackBarOpen(true);
            }
         }

         return item; // Return the updated or unmodified item
      });
   };
   //TODO_END: handle add image

   //TODO: choose file
   const handleChooseFile = (id) => {

      handelOpenTextFile((file) => {
         const updatedJobState = jobState.map((item) => {
            if (item.id === id) {
               item.attach = [file];
               setJobState(updatedJobState);
            }
            return item; // Return the updated or unmodified item
         });
      });
   };
   //TODO_END: choose file
   return (
      <section className={style.container}>
         <Header auth={auth} />
         <section className={style.contentWrap}>
            <div className={style.leftSide}>
               <LeftSide user={user} handleAddImage={handleAddImage} jobState={jobState} setJobState={setJobState} handleChooseFile={handleChooseFile} />
            </div>
            <div className={style.rightSide}>
               <RightSide jobState={jobState} setJobState={setJobState}  />
            </div>
         </section>

         <Snackbar open={snackBarOpen} autoHideDuration={6000} onClose={() => setSnackBarOpen(false)}>
            <Alert onClose={() => setSnackBarOpen(false)} severity="warning" sx={{ width: '100%', color: 'red' }}>
               Maximum 4 images in this line!
            </Alert>
         </Snackbar>
      </section>
   );
}
