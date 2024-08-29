import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'react-toastify/dist/ReactToastify.css';
import './style/global.scss'

createRoot(document.getElementById('root')!).render(<App />)
