import { update } from 'firebase/database'
import { dbRT } from '../../firebase/firebaseConfig'
import { getFirebaseData } from '../getFirebaseData'

export default function createShiftDataPost(callBack) {

   const equipElm = document.querySelectorAll('.create-equip')
   const issueElm = document.querySelectorAll('.create-issue')
   const orderElm = document.querySelectorAll('.create-order')
   const proposeElm = document.querySelectorAll('.create-propose')
   const handoverElm = document.querySelectorAll('.create-handover')
   const timeElm = document.getElementsByTagName('select')

   //////////
   const handover = []
   const equip = []
   const issue = []
   const order = []
   const propose = []
   const today = new Date()
   const monthStamp = today.getMonth() + 1 >= 10 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`
   const dateStamp = today.getDate() >= 10 ? today.getDate() : `0${today.getDate()}`
   const timeStamp = `${today.getFullYear()}-${monthStamp}-${dateStamp}`
   // tạo biến để tạo  giá trị upload
   let date = 0
   let month = 0
   let year = 0
   let shift = ''
   let session = ''
   let result = {}
   let authEmail = 'none'
   if (sessionStorage.getItem('user')) {
      const temp = JSON.parse(sessionStorage.getItem('user'))
      authEmail = temp.email
   }
   ///////// lấy giá trị từ trang viết báo cáo
   for (const value of timeElm) {
      if (value.name === 'shiftDateReport') {
         date = value.value
      }
      if (value.name === 'shiftMonthReport') {
         month = value.value
      }
      if (value.name === 'shiftYearReport') {
         year = value.value
      }
      if (value.name === 'shiftSessionReport') {
         session = value.value
      }
      if (value.name === 'shiftShiftReport') {
         shift = value.value
      }
   }
 
   //////////
   for (const value of proposeElm) {
      const temp = value.getElementsByTagName('p')
      const text = temp[0].innerText.trim()
      if (!(text === '')) {
         propose.push(text)
      }
   }
   ////////////
   for (const value of issueElm) {
      const temp = [...value.getElementsByTagName('p')] // rải để sử dụng với map()
      const result = {}
      temp.forEach((crr, index) => {
         const title = crr.dataset.issueInput
         result[title] = crr.innerText
      })
      issue.push(result)
   }
   ////////////

   for (const value of equipElm) {
      const temp = [...value.getElementsByTagName('p')] // rải để sử dụng với map()
      const result = {}
      temp.forEach((crr, index) => {
         const title = crr.dataset.equipInput
         result[title] = crr.innerText
      })
      equip.push(result)
   }
   ////////////
   for (const value of orderElm) {
      const temp = [...value.getElementsByTagName('p')] // rải để sử dụng với map()
      const result = {}
      temp.forEach((crr, index) => {
         const title = crr.dataset.orderInput
         result[title] = crr.innerText
      })
      order.push(result)
   }
   ////////////
   for (const value of handoverElm) {
      const temp = [...value.querySelectorAll('.handoverItem')] // rải để sử dụng với map()
      const result = {}
      temp.forEach((crr, index) => {
         const title = crr.dataset.handoverInput
         result[title] = crr.innerText
      })
      handover.push(result)
   }
   ////////////
   propose.length >= 1 ? (result.propose = propose) : (result.propose = ['...'])
   result.order= order
   result.handover = handover
   result.issue = issue
   result.status = ['normal']
   result.equipmentUsed = equip
   result.authEmail = authEmail
   result.user = shift
   result.date = { session: session ,date: date ,month: month, year: year, timestamp: timeStamp }
   // console.log(result)
   const ref = `Report/ShiftReport/${Date.now()}`
   updateDataFirebase(ref, result).then(() => {
      getFirebaseData(ref)
         .then((result) => {
            console.log("🚀 ~ file: createShiftDataPost.js:118 ~ .then ~ result", result.val())
            callBack(result.val())
         })
         .catch((error) => {
            alert(error)
         })
   })
   return true
}
////////////

function updateDataFirebase(ref, objectData) {
   objectData['ref'] = ref
   const updates = {}
   updates[ref] = objectData
   const objectDataNew = {}
   objectDataNew.authEmail = objectData.authEmail
   objectDataNew.ref = ref
   
   objectDataNew.user = objectData.user
   objectDataNew.date = objectData.date
   objectDataNew.type = 'shiftReport'
   updates[`NewReport/${Date.now()}`] = objectDataNew


   return update(dbRT, updates)
}
