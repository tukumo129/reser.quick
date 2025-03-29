import { useQuery } from "react-query";
import { callGet } from "../../services/ApiCallBase";
import { ApiPath } from "../../services/ApiPath";

export type GetReserveAvailableDatesParams = {
  date: string;
};

export type GetReserveAvailableDatesData = {
  availableDates: {
    date: string;
    available: boolean;
  }[];
};

export const useGetReserveAvailableDates = (
  uuid: string,
  params: GetReserveAvailableDatesParams,
) => {
  const path = ApiPath.APP_RESERVE_DATES.replace(":uuid", uuid.toString());

  const { data, isLoading, error } = useQuery<
    GetReserveAvailableDatesData,
    Error
  >([ApiPath.APP_RESERVE_DATES, uuid, params], () => callGet(path, params));
  return {
    availableDates: data?.availableDates || [],
    isLoading,
    error,
  };
};
