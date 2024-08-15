import { AdminLayout } from "../components/AdminLayoutComponent";
import { TopContents } from "../components/TopComponent";

export function TopView() {
  return (
    <AdminLayout pageName={"TOP"}mainContents={<TopContents />}/>
  );
}
