import { AdminLayout } from "../../components/AdminLayoutComponent";
import { LoadingSpinner } from "../../components/LoadingSpinnerComponent";
import { StoreSettingComponent } from "../../components/Setting/StoreSettingComponent";
import { useGetStoreSetting } from "../../services/SettingService/UseGetStoreSetting";

export function StoreSettingUpdateView() {
  const { storeSetting, isLoading, error } = useGetStoreSetting();

  if (isLoading) return <LoadingSpinner/>
  if (error) return <div>Error reserves</div>

  return (
    <AdminLayout pageName={"店舗設定"}mainContents={<StoreSettingComponent {...storeSetting}/>}/>
  );
}
