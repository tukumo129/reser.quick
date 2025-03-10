import { useParams } from "react-router-dom";
import { AppLayout } from "../../components/AppLayoutComponent";
import { AppCreateReserveFormComponent } from "../../components/Reserves/AppCreateReserveFormComponent";

export function AppReserveCreateView() {
  const { date } = useParams()
  return (
    <AppLayout pageName={"予約登録"} mainContents={<AppCreateReserveFormComponent startDate={date ?? ''} />} />
  );
}
