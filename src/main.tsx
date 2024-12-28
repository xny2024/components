import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router"
import './index.css'
import App from './App.tsx'
import MonacoEditor from './pages/monaco-editor/index.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/monaco-editor" element={<MonacoEditor />} />
    </Routes>
  </BrowserRouter>
)
