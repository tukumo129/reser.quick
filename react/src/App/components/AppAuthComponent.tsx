import { ReactNode, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../../components/LoadingSpinnerComponent";
import { useGetAppSettings } from "../api/UseGetAppSettings";
import { useAppSettingsRecoil } from "../recoils/AppSettingsRecoil";
import { useAppUuidRecoil } from "../recoils/AppUuidRecoil";
import { PageNotFoundComponent } from "./PageNotFoundComponent";

type AppAuthProps = {
  children: ReactNode;
};

export const AppAuth = ({ children }: AppAuthProps) => {
  const { setAppUuid } = useAppUuidRecoil();
  const { setAppSettings } = useAppSettingsRecoil();
  const { uuid } = useParams();
  const { settings, isLoading, error } = useGetAppSettings(String(uuid));

  useEffect(() => {
    setAppUuid(uuid ?? "");
    if (settings) {
      setAppSettings(settings);
    }
  }, [settings]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <PageNotFoundComponent />;

  return <>{children}</>;
};
