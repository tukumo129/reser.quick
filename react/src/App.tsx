import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import { routePath } from "./enums/routePath";
import { LoginView } from "./pages/LoginView";
import { TopView } from "./pages/TopView";
import { ReserveView } from "./pages/Reserves/ReservesView";
import { ReserveCreateView } from "./pages/Reserves/ReserveCreateView";
import { ReserveDetailView } from "./pages/Reserves/ReserveDetailView";
import { SettingUpdateView } from "./pages/Settings/SettingUpdateView";
import { AppTopView } from "./App/pages/Reserves/AppTopView";
import { AppAuth } from "./App/components/AppAuthComponent";
import { RecoilRoot } from "recoil";
import { ErrorView } from "./pages/ErrorView";
import { AppReserveCreateView } from "./App/pages/Reserves/AppReserveCreateView";
import { CreateUserView } from "./pages/CreateUserView";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      useErrorBoundary: false,
    },
  },
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
            <Route path={routePath.CreateUser} element={<CreateUserView />} />
            <Route path={routePath.Reserves} element={<ReserveView />} />
            <Route
              path={routePath.ReserveCreate}
              element={<ReserveCreateView />}
            />
            <Route
              path={routePath.ReserveDetail}
              element={<ReserveDetailView />}
            />
            <Route path={routePath.Setting} element={<SettingUpdateView />} />

            {/* ユーザー画面 */}
            <Route
              path={routePath.AppTop}
              element={
                <AppAuth>
                  <AppTopView />
                </AppAuth>
              }
            />
            <Route
              path={routePath.AppReserveCreate}
              element={
                <AppAuth>
                  <AppReserveCreateView />
                </AppAuth>
              }
            />
            {/* エラー画面 */}
            <Route path={routePath.AppErrorPage} element={<ErrorView />} />
            <Route path="*" element={<ErrorView />} />
          </Routes>
        </RecoilRoot>
      </QueryClientProvider>
    </div>
  );
};

export default App;
