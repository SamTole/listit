import { Route, Routes, Navigate } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { useAuthStore } from './store/authStore';
import { useEffect } from 'react';

// Protect routes that require authentication
const ProtectedRoute = ({children}) => {
  const {isAuthenticated} = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  return children;
}

// Redirect authenticated users to home page
const RedirectAuthenticatedUser = ({children}) => {
  const {isAuthenticated} = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to='/' replace />
  }

  // If not authenticated, return to current page
  return children;
}

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  // if (isCheckingAuth) {
  //   return <LoadingSpinner />;
  // }

  return (
    <div className='rubik-font'>
      <Routes>
        <Route path='/' element={<ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>} />
        <Route path='/signup' element={<RedirectAuthenticatedUser>
          <SignUpPage />
        </RedirectAuthenticatedUser>} />
        <Route path='/login' element={<RedirectAuthenticatedUser>
          <LoginPage />
        </RedirectAuthenticatedUser>} />
      </Routes>
    </div>
  )
}

export default App
