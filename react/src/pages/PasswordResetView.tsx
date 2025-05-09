import { PasswordResetComponent } from "../components/PasswordResetComponent";
import { AdminNoLoginHeaderContainer } from "../container/AdminLayoutContainer";

export function PasswordResetView() {
  return (
    <>
      <AdminNoLoginHeaderContainer />
      <PasswordResetComponent />;
    </>
  );
}
