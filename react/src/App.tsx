import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginView } from './pages/LoginView';
import './output.css';
import { TopView } from './pages/TopView';
import { routePath } from './enums/routePath';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path={routePath.Login} element={<LoginView />} />
          <Route path={routePath.Top} element={<TopView />} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
};

export default App;
