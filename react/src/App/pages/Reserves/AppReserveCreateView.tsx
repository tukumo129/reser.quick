import { AppLayout } from "../../components/AppLayoutComponent";
import { AppCreateReserveFormComponent } from "../../components/Reserves/AppCreateReserveFormComponent";

export function AppReserveCreateView() {
  return (
    <AppLayout pageName={"予約登録"} mainContents={<AppCreateReserveFormComponent />} />
  );
}
