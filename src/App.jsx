import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import { BrowserRouter, Route, Routes } from 'react-router'
import CreateContact from './pages/CreateContact'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Hero />} />
          <Route path='/create-contact' element={<CreateContact />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
