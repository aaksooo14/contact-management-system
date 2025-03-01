import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';

// Lazy Loading Components
const CreateContact = lazy(() => import('./pages/CreateContact'));
const ViewContact = lazy(() => import('./components/ViewContact'));
const EditContact = lazy(() => import('./components/EditContact'));

const App = () => {
  return (

    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<Hero />} />
          <Route path='/create-contact' element={<CreateContact />} />
          <Route path='/view-contact/:id' element={<ViewContact />} />
          <Route path='/edit-contact/:id' element={<EditContact />} />
        </Routes>
      </Suspense>
    </>

  );
};

export default App;
