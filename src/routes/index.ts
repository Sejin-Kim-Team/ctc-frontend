import { createBrowserRouter } from 'react-router-dom'
import App from '@/pages/App/App'

export const router = createBrowserRouter([
  {
    path: '/',
    element: App(),
  },
])
