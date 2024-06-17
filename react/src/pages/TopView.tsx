import { AdminLayout } from "../components/AdminLayout/component";
import { TopContents } from "../components/TopContents/component";

export function TopView() {
  return (
    <AdminLayout pageName={"TOP"}mainContents={<TopContents />}/>
  );
}
