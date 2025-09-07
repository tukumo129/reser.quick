import { useQuery } from "react-query";
import { callGet } from "@/api/ApiCallBase";
import { ApiPath } from "@/enums/ApiPath";

export type GetAppAuthData = {
  setting: GetAppSettingData;
  reserveOptions: GetAppReserveOptionData[];
};

export type GetAppSettingData = {
  storeName: string | null;
  reserveSlotTime: string | null;
  maxReserveNumber: number;
  reserveMonthsLimit: number;
  reserveBlockMinutes: number;
};
export type GetAppReserveOptionData = {
  id: number;
  name: string;
  slotTime: number;
  price: number;
};

const settingsDefaultValues = {
  storeName: null,
  reserveSlotTime: null,
  maxReserveNumber: 10,
  reserveMonthsLimit: 3,
  reserveBlockMinutes: 30,
};

const reserveOptionsDefaultValues = [
  {
    id: 0,
    name: "",
    slotTime: 0,
    price: 0,
  },
];

export const useGetAppSettings = (uuid: string) => {
  const path = ApiPath.APP_AUTH.replace(":uuid", uuid.toString());

  const { data, isLoading, error } = useQuery<GetAppAuthData, Error>(
    [ApiPath.APP_AUTH, uuid],
    () => callGet(path),
  );
  return {
    settings: data?.setting || settingsDefaultValues,
    reserveOptions: data?.reserveOptions || reserveOptionsDefaultValues,
    isLoading,
    error,
  };
};
