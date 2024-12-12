import { useQuery } from "react-query";
import { callGet } from "../../services/ApiCallBase";
import { ApiPath } from "../../services/ApiPath";

export type GetAppAuthData = {
  settings: {
    storeName: string
    maxConcurrentReserve: string
    reserveSlotTime: string
    defaultStayTime: string
    maxReserveNumber: string
    reserveMonthsLimit: string  
  }
};

const defaultValues = {
  storeName: '',
  maxConcurrentReserve: '',
  reserveSlotTime: '',
  defaultStayTime: '',
  maxReserveNumber: '',
  reserveMonthsLimit: '',
}

export const useGetAppSettings = (uuid: string ) => {
  const path = ApiPath.APP_AUTH.replace(':uuid', uuid.toString())

  const { data, isLoading, error } = useQuery<GetAppAuthData, Error>(
    [ApiPath.APP_AUTH, uuid], () => callGet(path));
  return {
    settings: data?.settings || defaultValues,
    isLoading,
    error,
  };
};
