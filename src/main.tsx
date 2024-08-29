import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'react-toastify/dist/ReactToastify.css';
import './Style/global.scss'

createRoot(document.getElementById('root')!).render(<App />)
