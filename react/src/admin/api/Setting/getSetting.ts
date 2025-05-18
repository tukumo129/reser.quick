import { useQuery } from "react-query";
import { callGet } from "@/api/ApiCallBase";
import { ApiPath } from "@/enums/ApiPath";

export type GetSettingData = {
  setting: GetSetting;
  reserveSiteUrl: string;
};

export type OpenTime = {
  id: number | null;
  type: number;
  date: string | null;
  week: number | null;
  startTime: string | null;
  endTime: string | null;
  maxAvailableReserve: number | null;
};

export type GetSetting = {
  storeName: string;
  reserveSlotTime: string;
  maxReserveNumber: number | null;
  reserveMonthsLimit: number | null;
  maxAvailableReserve: number | null;
  openTimes: OpenTime[];
};

const defaultValues = {
  storeName: "",
  reserveSlotTime: "5",
  maxReserveNumber: null,
  reserveMonthsLimit: null,
  maxAvailableReserve: null,
  openTimes: [],
};

export const useGetSetting = () => {
  const { data, isLoading, error } = useQuery<GetSettingData, Error>(
    [ApiPath.SETTING],
    () => callGet(ApiPath.SETTING),
  );
  return {
    setting: data?.setting || defaultValues,
    reserveSiteUrl: data?.reserveSiteUrl || "",
    isLoading,
    error,
  };
};
