import { update } from 'firebase/database'
import { dbRT } from '../firebase/firebaseConfig'
import { getFirebaseData } from './getFirebaseData'


export default function progressUpload (data,   callBack,imageBlobArray,stateTest,setStateTest, setImageBlobArray,fileProgressState, setFileProgressState){

    switch(stateTest){
        case 'mot': {
            for (let i=0; i++; i<10000){}
            setStateTest('hai')
        }
        case 'hai': {
            for (let i=0; i++; i<10000){}
            setStateTest('ba')
        }
        case 'ba': {
            for (let i=0; i++; i<10000){}
            setStateTest('mot')
        }
    }

 



   const ref = `Report/WeekReport/${Date.now()}`
   updateDataFirebase(ref, data).then(() => {
      getFirebaseData(ref)
         .then((result) => {
            // console.log(result.val())
            callBack(result.val())
         })
         .catch((error) => {
            alert(error)
         })
   })
   return true


}


function updateDataFirebase(ref, objectData) {
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
    updates[`NewReport/${Date.now()}`] = objectDataNew
    //   for (const key in objectData) {
    //     updates["Report"] = objectData[key];
    //   }
 
    // console.log(updates);
 
    return update(dbRT, updates)
 }
 