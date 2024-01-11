import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import UserPage from './pages/UserPage'
import SignUp from './pages/SignUp'
import Index from './pages/Index'
import Settings from './pages/Settings'


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/:username' element={ <UserPage /> }></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/' element={<Index />}></Route>
          <Route path='/settings' element={<Settings />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
