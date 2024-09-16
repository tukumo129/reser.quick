import { useQuery } from "react-query";
import { callGet } from "../ApiCallBase";
import { ApiPath } from "../ApiPath";

type GetStoreSetting = {
  storeSetting: GetStoreSettingData
}

export type WeekOpenTime = {
  week: number
  openTime: string
  closeTime: string
}

export type DayOpenTime = {
  date: string
  openTime: string
  closeTime: string
}

export type GetStoreSettingData = {
  storeName: string;
  dayOpenTimes: DayOpenTime[]
  weekOpenTimes: WeekOpenTime[]
}

const defaultValues = {
  storeName: '',
  dayOpenTimes: [],
  weekOpenTimes: [],
}

export const useGetStoreSetting = () => {
  const { data, isLoading, error } = useQuery<GetStoreSetting, Error>(
    [ApiPath.STORE_SETTING], () => callGet(ApiPath.STORE_SETTING));
  return {
    storeSetting: data?.storeSetting || defaultValues,
    isLoading,
    error,
  };
};
