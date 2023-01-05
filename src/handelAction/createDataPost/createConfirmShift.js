import { update } from 'firebase/database'
import { dbRT } from '../../firebase/firebaseConfig'
import { getFirebaseData } from '../getFirebaseData'

export default function createConfirmShift(refDirection,objectData ,handoverEquip,callBack) {

    updateDataFirebase(refDirection, objectData,handoverEquip).then(() => {
        getFirebaseData(refDirection)
           .then((result) => {
              console.log("🚀 ~ file: createConfirmShift.js:10 ~ .then ~ result", result.val())
              callBack(result.val())
           })
           .catch((error) => {
              alert(error)
           })
     })
     return true
  }
  ////////////
  
  function updateDataFirebase(ref, objectData,handoverEquip) {
     const updates = {}
     updates[`${ref}/confirm`] = objectData
     updates[`${ref}/status`] = ['normal','confirmed','lock']

     updates[`ShiftEquipHandover`] = handoverEquip
     return update(dbRT, updates)
}