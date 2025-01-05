import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import { routePath } from "./enums/routePath";
import { LoginView } from "./pages/LoginView";
import { TopView } from "./pages/TopView";
import { ReserveView } from "./pages/Reserves/ReservesView";
import { ReserveCreateView } from "./pages/Reserves/ReserveCreateView";
import { ReserveDetailView } from "./pages/Reserves/ReserveDetailView";
import { StoreSettingUpdateView } from "./pages/Settings/StoreSettingUpdateView";
import { ReserveSettingUpdateView } from "./pages/Settings/ReserveSettingUpdateView";
import { AppReserveCreateView } from "./App/pages/Reserves/AppReserveCreateView";
import { AppAuth } from "./App/components/AppAuthComponent";
import { RecoilRoot } from "recoil";
import { ErrorView } from "./pages/ErrorView";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      useErrorBoundary: false,
    }
  }
});

const App: React.FC = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Routes>
            {/* 管理画面 */}
            <Route path={routePath.Login} element={<LoginView />} />
            <Route path={routePath.Top} element={<TopView />} />
            <Route path={routePath.Reserves} element={<ReserveView />} />
            <Route path={routePath.ReserveCreate} element={<ReserveCreateView />} />
            <Route path={routePath.ReserveDetail} element={<ReserveDetailView />} />
            <Route path={routePath.StoreSetting} element={<StoreSettingUpdateView />} />
            <Route path={routePath.ReserveSetting} element={<ReserveSettingUpdateView />} />

            {/* ユーザー画面 */}
            <Route path={routePath.AppTop} element={<AppAuth><AppReserveCreateView /></AppAuth>} />
            <Route path={routePath.AppReserveCreate} element={<AppAuth><AppReserveCreateView /></AppAuth>} />
            {/* エラー画面 */}
            <Route path={routePath.appErrorPage} element={<ErrorView />} />
            <Route path="*" element={<ErrorView />} />
          </Routes>
        </RecoilRoot>
      </QueryClientProvider>
    </div>
  );
};

export default App;
