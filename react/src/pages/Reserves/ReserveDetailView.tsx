import { useParams } from "react-router-dom";
import { AdminLayout } from "../../components/AdminLayoutComponent";
import { UpdateReserveForm } from "../../components/Reserves/ReserveDetailComponent";
import { useGetReserve } from "../../services/ReserveService/UseGetReserve";
import { LoadingSpinner } from "../../components/LoadingSpinnerComponent";

export function ReserveDetailView() {
  const {reserveId} = useParams()
  const { reserve, isLoading, error } = useGetReserve(Number(reserveId));

  const reserveDetail = {
    id: reserve.id,
    name: reserve.name,
    startDate: reserve.start_date_time.split(' ')[0],
    startTime: reserve.start_date_time.split(' ')[1],
    endDate: reserve.end_date_time.split(' ')[0],
    endTime: reserve.end_date_time.split(' ')[1],
    guestNumber: reserve.guest_number,
  }

  if (isLoading) return <LoadingSpinner/>
  if (error) return <div>Error reserves</div>

  return (
    <AdminLayout
      pageName={"予約詳細"}
      mainContents={<UpdateReserveForm reserve={reserveDetail} />}
    />
  );
}
