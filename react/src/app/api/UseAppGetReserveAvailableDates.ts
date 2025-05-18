import { useQuery } from "react-query";
import { callGet } from "@/api/ApiCallBase";
import { ApiPath } from "@/enums/ApiPath";

export type AppGetReserveAvailableDatesParams = {
  date: string;
};

export type AppGetReserveAvailableDatesData = {
  availableDates: {
    date: string;
    available: boolean;
  }[];
};

export const useAppGetReserveAvailableDates = (
  uuid: string,
  params: AppGetReserveAvailableDatesParams,
) => {
  const path = ApiPath.APP_RESERVE_DATES.replace(":uuid", uuid.toString());

  const { data, isLoading, error } = useQuery<
    AppGetReserveAvailableDatesData,
    Error
  >([ApiPath.APP_RESERVE_DATES, uuid, params], () => callGet(path, params));
  return {
    availableDates: data?.availableDates || [],
    isLoading,
    error,
  };
};
