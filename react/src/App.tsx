import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { routePath } from "./enums/routePath";
import { CreateReserveComponent } from "@/admin/feature/CreateReserve/createReserveComponent";
import { CreateReserveOptionComponent } from "@/admin/feature/CreateReserveOption/createReserveOptionComponent";
import { CreateUserComponent } from "@/admin/feature/CreateUser/createUserFormComponent";
import { ErrorComponent } from "@/admin/feature/ErrorPage/errorComponent";
import { PasswordForgotComponent } from "@/admin/feature/PasswordForgot/passwordForgotComponent";
import { PasswordResetComponent } from "@/admin/feature/PasswordReset/passwordResetComponent";
import { ReserveDetailComponent } from "@/admin/feature/Reserve/reserveDetailComponent";
import { ReserveOptionDetailComponent } from "@/admin/feature/ReserveOption/reserveOptionDetailComponent";
import { ReserveOptionsComponent } from "@/admin/feature/ReserveOptions/reserveOptionsComponent";
import { ReservesComponent } from "@/admin/feature/Reserves/reservesComponent";
import { SettingComponent } from "@/admin/feature/Setting/settingComponent";
import { TopComponent } from "@/admin/feature/Top/topComponent";
import { UserLoginComponent } from "@/admin/feature/UserLogin/userLoginFormComponent";
import { AppAuth } from "@/app/feature/Auth/AppAuthComponent";
import { AppCreateReserveComponent } from "@/app/feature/CreateReserve/AppCreateReserveFormComponent";
import { AppTopComponent } from "@/app/feature/Top/AppTopComponent";
import { PageNotFoundComponent } from "@/feature/PageNofFound/pageNotFoundComponent";

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
  const googleKey = import.meta.env.VITE_GOOGLE_KEY;

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={googleKey}>
          <RecoilRoot>
            <Routes>
              {/* 管理画面 */}
              <Route path={routePath.Login} element={<UserLoginComponent />} />
              <Route
                path={routePath.PasswordForgot}
                element={<PasswordForgotComponent />}
              />
              <Route
                path={routePath.PasswordReset}
                element={<PasswordResetComponent />}
              />
              <Route path={routePath.Top} element={<TopComponent />} />
              <Route
                path={routePath.CreateUser}
                element={<CreateUserComponent />}
              />
              <Route
                path={routePath.Reserves}
                element={<ReservesComponent />}
              />
              <Route
                path={routePath.ReserveCreate}
                element={<CreateReserveComponent />}
              />
              <Route
                path={routePath.ReserveDetail}
                element={<ReserveDetailComponent />}
              />
              <Route
                path={routePath.ReserveOptions}
                element={<ReserveOptionsComponent />}
              />
              <Route
                path={routePath.ReserveOptionCreate}
                element={<CreateReserveOptionComponent />}
              />
              <Route
                path={routePath.ReserveOptionDetail}
                element={<ReserveOptionDetailComponent />}
              />
              <Route path={routePath.Setting} element={<SettingComponent />} />

              {/* ユーザー画面 */}
              <Route
                path={routePath.AppTop}
                element={
                  <AppAuth>
                    <AppTopComponent />
                  </AppAuth>
                }
              />
              <Route
                path={routePath.AppReserveCreate}
                element={
                  <AppAuth>
                    <AppCreateReserveComponent />
                  </AppAuth>
                }
              />
              {/* エラー画面 */}
              <Route
                path={routePath.AppErrorPage}
                element={<ErrorComponent />}
              />
              <Route
                path={routePath.ErrorNotFound}
                element={<PageNotFoundComponent />}
              />
            </Routes>
          </RecoilRoot>
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
