import { ReactNode, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { routePath } from "../../enums/routePath";
import { LoadingSpinner } from "../../components/LoadingSpinnerComponent";
import { useGetAppSettings } from "../api/UseGetAppSettings";
import { useAppSettingsRecoil } from "../recoils/AppSettingsRecoil";

type AppAuthProps = {
  children: ReactNode
}

export const AppAuth = ({ children }: AppAuthProps) => {
  const { setAppSettings } = useAppSettingsRecoil()
  const { uuid } = useParams()
  const navigate = useNavigate()
  const { settings, isLoading, error } = useGetAppSettings(String(uuid))

  useEffect(() => {
    if (settings) {
      setAppSettings(settings)
    }
  }, [settings])

  if (isLoading) return <LoadingSpinner />
  if (error) navigate(routePath.AppErrorPage)

  return (
    <>{children}</>
  )
};