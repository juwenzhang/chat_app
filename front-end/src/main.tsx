import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import App from '@/App.tsx';
import 'uno.css';
import '@/assets/style.css';
import { ThemeProvider } from '@/context/themeContext';
import { useEffect } from 'react';
import { useThemeStore } from '@/store/useThemeStore';

const queryClient = new QueryClient();
const dev_mode = import.meta.env.VITE_DEV_MODE === 'true';

const Root: React.FC = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.body.className = `${theme}-theme`;
  }, [theme]);
  return (
    <StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <App theme={theme} />
            {dev_mode && <ReactQueryDevtools position='bottom-right' />}
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')!).render(<Root />);