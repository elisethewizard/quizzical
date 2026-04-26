import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Background from './components/Background.tsx'

createRoot(document.getElementById('root') as HTMLElement).render(
    <>
        <div className='app-cont'>
            <App />
        </div>
        <Background />
    </>
)