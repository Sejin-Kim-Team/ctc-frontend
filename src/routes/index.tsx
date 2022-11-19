import { createBrowserRouter } from 'react-router-dom'
import App from '@/pages/App'
import MapTest from '@/pages/MapTest'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/map',
    element: <MapTest />,
  },
])
