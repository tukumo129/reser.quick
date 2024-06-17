import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import { routePath } from "./enums/routePath";
import { LoginView } from "./pages/LoginView";
import { TopView } from "./pages/TopView";
import { ReserveView } from "./pages/ReservesView";
import { ReserveCreateView } from "./pages/ReserveCreateView";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path={routePath.Login} element={<LoginView />} />
          <Route path={routePath.Top} element={<TopView />} />
          <Route path={routePath.Reserves} element={<ReserveView />} />
          <Route path={routePath.ReserveCreate} element={<ReserveCreateView />} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
};

export default App;
