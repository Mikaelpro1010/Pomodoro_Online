import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx'
import Login from './pages/login/page.jsx'
import Register from './pages/register/page.jsx'
import About from './pages/about/page.jsx'
import Pomodoro from './pages/pomodoro/page.jsx'
import GerenciamentoUsers from './pages/gerenciamentoUsers/page.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/pomodoro" element={<ProtectedRoute><Pomodoro /></ProtectedRoute>}></Route>
        <Route path="/gerenciamento_users" element={<ProtectedRoute><GerenciamentoUsers /></ProtectedRoute>}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
