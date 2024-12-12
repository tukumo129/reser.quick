import { AppLayout } from "../../components/AppLayoutComponent";
import { AppCreateReserveComponent } from "../../components/Reserves/AppReserveCreateFormComponent";

export function AppReserveCreateView() {
  return (
    <AppLayout pageName={"予約登録"}mainContents={<AppCreateReserveComponent />}/>
  );
}
