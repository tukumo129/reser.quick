import { AppLayout } from "../../components/AppLayoutComponent";
import { AppTopComponent } from "../../components/Reserves/AppTopComponent";

export function AppTopView() {
  return (
    <AppLayout pageName={"予約登録"} mainContents={<AppTopComponent />} />
  );
}
