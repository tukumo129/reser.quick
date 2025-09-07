import { ReactNode, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetAppSettings } from "@/app/api/UseAppGetSettings";
import { useAppReserveOptionsRecoil } from "@/app/recoils/AppReserveOptionsRecoil";
import { useAppSettingsRecoil } from "@/app/recoils/AppSettingsRecoil";
import { useAppUuidRecoil } from "@/app/recoils/AppUuidRecoil";
import { LoadingSpinner } from "@/feature/LoadingSpinner/loadingSpinnerComponent";
import { PageNotFoundComponent } from "@/feature/PageNofFound/pageNotFoundComponent";

type AppAuthProps = {
  children: ReactNode;
};

export const AppAuth = ({ children }: AppAuthProps) => {
  const { setAppUuid } = useAppUuidRecoil();
  const { setAppSettings } = useAppSettingsRecoil();
  const { setAppReserveOptions } = useAppReserveOptionsRecoil();
  const { uuid } = useParams();
  const { settings, reserveOptions, isLoading, error } = useGetAppSettings(
    String(uuid),
  );

  useEffect(() => {
    setAppUuid(uuid ?? "");
    if (settings) {
      setAppSettings(settings);
    }
  }, [settings]);

  useEffect(() => {
    if (reserveOptions) {
      setAppReserveOptions(reserveOptions);
    }
  }, [reserveOptions]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <PageNotFoundComponent />;

  return <>{children}</>;
};
