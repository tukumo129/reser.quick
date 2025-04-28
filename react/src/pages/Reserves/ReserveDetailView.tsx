import { useParams } from "react-router-dom";
import { AdminLayout } from "../../components/AdminLayoutComponent";
import { UpdateReserveForm } from "../../components/Reserves/ReserveDetailComponent";
import { useGetReserve } from "../../services/ReserveService/UseGetReserve";
import { LoadingSpinner } from "../../components/LoadingSpinnerComponent";
import { ErrorContent } from "../../components/ErrorComponent";

export function ReserveDetailView() {
  const { reserveId } = useParams();
  const { reserve, isLoading, error } = useGetReserve(Number(reserveId));

  const reserveDetail = {
    id: reserve.id,
    name: reserve.name,
    reserveId: reserve.reserveId,
    startDate: reserve.startDateTime.split(" ")[0],
    startTime: reserve.startDateTime.split(" ")[1],
    endDate: reserve.endDateTime.split(" ")[0],
    endTime: reserve.endDateTime.split(" ")[1],
    guestNumber: reserve.guestNumber,
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorContent />;

  return (
    <AdminLayout
      pageName={"予約詳細"}
      mainContents={<UpdateReserveForm reserve={reserveDetail} />}
    />
  );
}
