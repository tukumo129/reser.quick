import { LoginForm } from "../components/LoginFormComponent";
import { AdminNoLoginHeaderContainer } from "../container/AdminLayoutContainer";

export function LoginView() {
  return (
    <>
      <AdminNoLoginHeaderContainer />
      <LoginForm />;
    </>
  );
}
