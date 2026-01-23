import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router';

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Animals from './pages/Animals';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/animals/new' element={<Animals/>}/>
        </Routes>
    </BrowserRouter>,
)
