import { AppErrorComponent } from "../../components/AppErrorComponent";
import { AppLayout } from "../../components/AppLayoutComponent";

export function ErrorView() {
  return <AppLayout pageName={"エラー"} mainContents={<AppErrorComponent />} />;
}
