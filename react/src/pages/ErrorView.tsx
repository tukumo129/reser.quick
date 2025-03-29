import { AdminLayout } from "../components/AdminLayoutComponent";
import { ErrorContents } from "../components/ErrorComponent";

export function ErrorView() {
  return <AdminLayout pageName={"エラー"} mainContents={<ErrorContents />} />;
}
