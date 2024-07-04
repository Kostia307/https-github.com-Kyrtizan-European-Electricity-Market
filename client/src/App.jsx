import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateProvider from './CreateProvider';
import UpdateProvider from './UpdateProvider';
import Providers from './Providers';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <BrowserRouter>
       <Routes>
        <Route path='/' element={<Providers />}></Route>
        <Route path='/create' element={<CreateProvider />}></Route>
        <Route path='/update/:id' element={<UpdateProvider />}></Route>
       </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
