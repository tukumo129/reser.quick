import { AdminLayout } from "../../components/AdminLayoutComponent";
import { CreateReserveForm } from "../../components/Reserves/ReserveCreateFormComponent";

export function ReserveCreateView() {
  return (
    <AdminLayout pageName={"予約登録"} mainContents={<CreateReserveForm />} />
  );
}
