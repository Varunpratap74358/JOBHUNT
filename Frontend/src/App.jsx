import { createBrowserRouter, RouterProvider, Routes } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import JobsAdmin from './components/admin/JobsAdmin'
import PostJobs from './components/admin/PostJobs'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/jobs',
    element: <Jobs />,
  },
  {
    path: '/description/:id',
    element: <JobDescription />,
  },
  {
    path: '/brows',
    element: <Browse />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  //admin routes
  {
    path: '/admin/companies',
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/companies/create',
    element: (
      <ProtectedRoute>
        <CompanyCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/companies/:id',
    element: (
      <ProtectedRoute>
        <CompanySetup />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/jobs',
    element: (
      <ProtectedRoute>
        <JobsAdmin />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/jobs/create',
    element: (
      <ProtectedRoute>
        <PostJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/jobs/:id/applicants',
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ),
  },
])

const App = () => {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
