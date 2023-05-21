import { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const PetList = lazy(() => import('./pages/PetList'))
// const PetDetail = lazy(() => import('./pages/PetDetail'));
// const EditPet = lazy(() => import('./pages/EditPet'));
// const AddPet = lazy(() => import('./pages/AddPet'));

function App() {
  const [petToEdit, setPetToEdit] = useState(null);
  return (
    <div>
      <Router>
        <h1>Pet Shelter</h1>
        <Link to='/add'>
          <button>Add New Pet</button>
        </Link>

        <Routes>
          <Route
            path='/'
            element={<Suspense fallback={<></>}><PetList /></Suspense>}
          />

          {/* <Route
            path='/:petId'
            element={<Suspense fallback={<></>}><PetDetail /></Suspense>}
          />

          <Route
            path='/petId/edit'
            element={<Suspense fallback={<></>}><EditPet /></Suspense>}
          />

          <Route
            path='/add'
            element={<Suspense fallback={<></>}><AddPet /></Suspense>}
          /> */}
        </Routes>
      </Router>
    </div>
  )
}

export default App
