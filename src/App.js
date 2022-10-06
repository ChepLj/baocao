import { Route, Routes } from 'react-router-dom'
import './App.css'
import CreateWeekDocLayout from './Layout/CreateWeekDocLayout/CreateWeekDocLayout'
import CreateShiftDocLayout from './Layout/CreateShiftDocLayout/CreateShiftDocLayout'
import CreateMonthDocLayout from './Layout/CreateMonthDocLayout/CreateMonthDocLayout'
import CreateMaintenDocLayout from './Layout/CreateMaintenDocLayout/CreateMaintenDocLayout'
import LoginLayout from './Layout/LoginLayout/LoginLayout'
import MainLayout from './Layout/MainLayout/MainLayout'

function App() {
   return (
      <div className="App">
         <Routes>
            <Route path="/login" element={<LoginLayout />} />
            <Route path="/" element={<MainLayout />} />
            <Route path="/createweek" element={<CreateWeekDocLayout />} />
            <Route path="/createmonth" element={<CreateMonthDocLayout />} />
            <Route path="/createshift" element={<CreateShiftDocLayout />} />
            <Route path="/createmainten" element={<CreateMaintenDocLayout />} />
         </Routes>
      </div>
   )
}

export default App
