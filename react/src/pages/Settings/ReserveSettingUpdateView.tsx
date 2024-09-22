import { AdminLayout } from "../../components/AdminLayoutComponent";
import { LoadingSpinner } from "../../components/LoadingSpinnerComponent";
import { ReserveSettingComponent } from "../../components/Setting/ReserveSettingComponent";
import { useGetReserveSetting } from "../../services/SettingService/UseGetReserveSetting";

export function ReserveSettingUpdateView() {
  const { reserveSetting, isLoading, error } = useGetReserveSetting();

  if (isLoading) return <LoadingSpinner/>
  if (error) return <div>Error reserves</div>

  return (
    <AdminLayout pageName={"予約設定"} mainContents={<ReserveSettingComponent {...reserveSetting}/>}/>
  );
}
