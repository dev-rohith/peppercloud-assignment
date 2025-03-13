import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import FormManager from './pages/FormManager'
import FormView from './pages/FormView'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/form/create' element={<FormManager />} />
       <Route path='/form/:id/edit' element={<FormManager />} />
       <Route path='/form/:id' element={<FormView />} />
       
    </Routes>
  )
}
export default App