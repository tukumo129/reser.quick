import { AdminLayout } from "../components/AdminLayout/component";
import { ReservesContents } from "../components/ReservesContents/component";

export function ReserveView() {
  return (
    <AdminLayout pageName={"予約一覧"}mainContents={<ReservesContents />}/>
  );
}
