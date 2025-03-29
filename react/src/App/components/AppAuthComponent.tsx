import { ReactNode, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRoutePath, routePath } from "../../enums/routePath";
import { LoadingSpinner } from "../../components/LoadingSpinnerComponent";
import { useGetAppSettings } from "../api/UseGetAppSettings";
import { useAppSettingsRecoil } from "../recoils/AppSettingsRecoil";
import { useAppUuidRecoil } from "../recoils/AppUuidRecoil";

type AppAuthProps = {
  children: ReactNode;
};

export const AppAuth = ({ children }: AppAuthProps) => {
  const { appUuid, setAppUuid } = useAppUuidRecoil();
  const { setAppSettings } = useAppSettingsRecoil();
  const { uuid } = useParams();
  const navigate = useNavigate();
  const { settings, isLoading, error } = useGetAppSettings(String(uuid));

  useEffect(() => {
    setAppUuid(uuid ?? "");
    if (settings) {
      setAppSettings(settings);
    }
  }, [settings]);

  if (isLoading) return <LoadingSpinner />;
  if (error) navigate(getRoutePath(routePath.AppErrorPage, appUuid));

  return <>{children}</>;
};
