import { useQuery } from "react-query";
import { callGet } from "@/api/ApiCallBase";
import { ApiPath } from "@/enums/ApiPath";

export type GetAppAuthData = {
  setting: GetAppSettingData;
};

export type GetAppSettingData = {
  storeName: string | null;
  reserveSlotTime: string | null;
  maxReserveNumber: string | null;
  reserveMonthsLimit: string | null;
};

const defaultValues = {
  storeName: null,
  reserveSlotTime: null,
  maxReserveNumber: null,
  reserveMonthsLimit: null,
};

export const useGetAppSettings = (uuid: string) => {
  const path = ApiPath.APP_AUTH.replace(":uuid", uuid.toString());

  const { data, isLoading, error } = useQuery<GetAppAuthData, Error>(
    [ApiPath.APP_AUTH, uuid],
    () => callGet(path),
  );
  return {
    settings: data?.setting || defaultValues,
    isLoading,
    error,
  };
};
