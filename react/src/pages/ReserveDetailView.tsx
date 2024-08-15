import { AdminLayout } from "../components/AdminLayoutComponent";
import { ReserveDetailContents } from "../components/ReserveDetailComponent";

export function ReserveDetailView() {
  return (
    <AdminLayout pageName={"予約詳細"}mainContents={<ReserveDetailContents />}/>
  );
}
