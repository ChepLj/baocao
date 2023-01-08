   //TODO: lấy thời gian API trên http://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh
   let getTimeAPICount = 0
 export default function getTimeAPI(callBackResultTime) {
    fetch('https://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh')
       .then((response) => response.json())
       .then((data) => {
          console.log(data)
          const timeAPI = (data.datetime ??= '')
          const todayAPI = new Date(timeAPI)
        callBackResultTime(timeFormat(todayAPI))
       })
       .catch((error)=>{
          getTimeAPICount++
          if(getTimeAPICount<5){ //:gọi API 5 lần nếu không được thì không gọi nữa, và lấy giờ của máy tính
            getTimeAPI()
          }else{
             console.log(error)
             const today = new Date() //:nếu không lấy được thời gian bằng API thì lấy thời gian của máy tính
            callBackResultTime(timeFormat(today))
          }

       })
 }

//TODO: định dạng thời gian
  function timeFormat (today){
       // Format thời gian
       const monthStamp = today.getMonth() + 1 >= 10 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`
       const dateStamp = today.getDate() >= 10 ? today.getDate() : `0${today.getDate()}`
       const yearStamp = today.getFullYear()
       const timeStamp = `${today.getFullYear()}-${monthStamp}-${dateStamp}`
       const hourStamp = today.getHours()

        const nowInMillisecond = today.getTime()
       

    return {
        yearStamp: Number(yearStamp),
        monthStamp:Number(monthStamp),
        dateStamp:Number(dateStamp),
        timeStamp:timeStamp,
        nowInMillisecond: Number(nowInMillisecond),
        hourStamp: Number(hourStamp)
    }

 }