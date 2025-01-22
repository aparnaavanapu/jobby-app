import './App.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import LoginRoute from './components/LoginRoute'
import NotFoundRoute from './components/NotFoundRoute'
import Home from './components/Home'
import JobsRoute from './components/JobsRoute'
import JobItemDetailsRoute from './components/JobItemDetailsRoute'
import ProtectedRoute from './components/ProtectedRoute'

// These are the lists used in the application. You can move them to any component needed.
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

// Replace your code here
const App = () => {
  return(
    <BrowserRouter>
    <Routes>
        <Route exact path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route exact path="/login" element={<LoginRoute />} />
        <Route exact path="/jobs" element={<ProtectedRoute><JobsRoute salaryRangesList={salaryRangesList} employmentTypesList={employmentTypesList} /></ProtectedRoute>} />
        <Route exact path="/jobs/:id" element={<ProtectedRoute><JobItemDetailsRoute /></ProtectedRoute>} />
        <Route exact path="*" element={<NotFoundRoute />} />
      </Routes>
    </BrowserRouter>
  )
}
 
export default App
