import React, { Suspense } from 'react';
import NavBar from '@/components/NavBar';
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

function getLazyComponent(path: string, props: any) {
  path = path.replace('@/', './');
  const component = React.lazy(() => import(path));
  return React.createElement(component, props);
}

const App: React.FC<AppProps> = (props: AppProps) => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { isError, isLoading } = useFetch("auth/check", checkAuth, {});

  if (isLoading) return <AppLoading />;
  if (isError) return <AppError />;
  if (isCheckingAuth && !authUser) return <AppLoading />;
  const { theme } = props;
  
  return (
    <React.Fragment>
      <NavBar />
      <Suspense fallback={<AppLoading />}>
        <Routes>
          <Route path="/" element={
              authUser 
                ? getLazyComponent('@/pages/HomePage', { theme })
                : <Navigate to="/login"/>
            } 
          />
          <Route path="/signup" element={
              getLazyComponent('@/pages/SignupPage', { theme })
            } 
          />
          <Route path="/login" element={
              getLazyComponent('@/pages/LoginPage', { theme })
            } 
          />
          <Route path="/settings" element={
              getLazyComponent('@/pages/SettingsPage', { theme })
            } 
          />
          <Route path="/profile" element={
              getLazyComponent('@/pages/ProfilePage', { theme })
            }   
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
      <Toaster />
    </React.Fragment>
  );
};

export default App;