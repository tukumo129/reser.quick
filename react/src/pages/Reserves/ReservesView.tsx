import { AdminLayout } from "../../components/AdminLayoutComponent";
import { ReservesContents } from "../../components/Reserves/ReservesComponent";

export function ReserveView() {
  return (
    <AdminLayout pageName={"予約一覧"}mainContents={<ReservesContents />}/>
  );
}
