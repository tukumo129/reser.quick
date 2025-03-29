import { CreateUserForm } from "../components/CreateUserFormComponent";
import { AdminNoLoginHeaderContainer } from "../container/AdminLayoutContainer";

export function CreateUserView() {
  return (
    <>
      <AdminNoLoginHeaderContainer />
      <CreateUserForm />;
    </>
  );
}
