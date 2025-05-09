import { PasswordForgotComponent } from "../components/PasswordForgotComponent";
import { AdminNoLoginHeaderContainer } from "../container/AdminLayoutContainer";

export function PasswordForgotView() {
  return (
    <>
      <AdminNoLoginHeaderContainer />
      <PasswordForgotComponent />;
    </>
  );
}
