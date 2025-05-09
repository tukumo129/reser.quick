import { AdminLayout } from "../../components/AdminLayoutComponent";
import { ErrorContent } from "../../components/ErrorComponent";
import { LoadingSpinner } from "../../components/LoadingSpinnerComponent";
import { SettingComponent } from "../../components/Setting/SettingComponent";
import { useGetSetting } from "../../services/SettingService/UseGetSetting";

export function SettingUpdateView() {
  const { setting, reserveSiteUrl, isLoading, error } = useGetSetting();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorContent />;

  return (
    <AdminLayout
      pageName={"設定"}
      mainContents={
        <SettingComponent setting={setting} reserveSiteUrl={reserveSiteUrl} />
      }
    />
  );
}
