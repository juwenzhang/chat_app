import React, { Suspense } from 'react';
import NavBar from '@/components/NavBar';
import HomePage from '@/pages/HomePage';
import SignupPage from '@/pages/SignupPage';
import LoginPage from '@/pages/LoginPage';
import SettingsPage from '@/pages/SettingsPage';
import ProfilePage from '@/pages/ProfilePage';
import AppLoading from './components/AppLoading';
import AppError from './components/AppError';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { useFetch } from './hooks/useFetch';
import { Toaster } from 'react-hot-toast';

interface AppProps {
  children?: React.ReactNode,
  theme: "light" | "dark";
}

const App: React.FC<AppProps> = (props: AppProps) => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { isError, isLoading } = useFetch("auth/check", checkAuth, {})
  // const navigate = useNavigate();
  // const location = useLocation();
  // const routerJump = (path: string) => {
  //   if (location.pathname !== path) {
  //     navigate(path);
  //   }
  // }
  if (isLoading) return <AppLoading />
  if (isError) return <AppError />
  if (isCheckingAuth && !authUser) return <AppLoading />
  const { theme } = props;
  
  return (
    <React.Fragment>
      <NavBar />
      <Suspense fallback={<AppLoading />}>
        {/* you also can use useRoutes Hooks and routes config 
            to complete router config realise: 
              e.g.: const router = useRoutes(routesConfig) 
                rootRoute we use router(need to e.g. to get) to render
                but children routes we use Outlet(do not need to get) to render
        */}
        <Routes>
          <Route path="/" element={authUser ? <HomePage theme={theme} /> : <Navigate to="/login"/>} />
          <Route path="/signup" element={<SignupPage theme={theme} />} />
          <Route path="/login" element={<LoginPage theme={theme} />} />
          <Route path="/settings" element={<SettingsPage theme={theme} />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
      <Toaster />
    </React.Fragment>
  )
};
export default App;