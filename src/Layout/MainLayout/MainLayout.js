import { useEffect, useState } from 'react'
import { getFirebaseData } from '../../handelAction/getFirebaseData'
import Header from './Header/Header'
import style from './MainLayout.module.css'
import Collection from './Section/Collection/Collection'
import Filter from './Section/Filter/Filter'
import NewReport from './Section/NewReport/NewReport'

export default function MainLayout() {
   const [state, setState] = useState({ NewReport: '', Report: '' })
   const [filterState, setFilterState] = useState()

   let auth = {}
   if (sessionStorage.getItem('user')) {
      auth = JSON.parse(sessionStorage.getItem('user'))
   }
   useEffect(() => {
      getFirebaseData('/')
         .then((result) => {
            setState(result.val())
            // console.log(result.val())
         })
         .catch((error) => {
            alert(error)
         })
   }, [filterState])

   return (
      <section className={style.warpPage}>
         <Header user={state.User} auth={auth} />
         <section className={style.warpContent}>
            <section className={style.leftSideContent}>
               <Filter
                  user={state.User}
                  callback={(value) => {
                     setFilterState(value)
                  }}
               />
            </section>
            <section className={style.rightSideContent}>
               <section className={style.newReport}>
                  <NewReport data={state.NewReport} />
               </section>
               <section className={style.collection}>
                  <Collection data={state.Report} filter={filterState} />
               </section>
            </section>
         </section>
      </section>
   )
}
