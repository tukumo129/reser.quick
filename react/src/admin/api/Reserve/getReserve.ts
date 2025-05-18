import { useQuery } from "react-query";
import { callGet } from "@/api/ApiCallBase";
import { ApiPath } from "@/enums/ApiPath";
import { Reserve } from "@/types/Reserve";

export type GetReserveData = {
  reserve: Reserve;
};

const defaultValues = {
  id: 0,
  contractId: 0,
  reserveId: "",
  name: "",
  guestNumber: 0,
  startDateTime: "",
  endDateTime: "",
  uuid: "",
};

export const useGetReserve = (reserveId: number) => {
  const path = ApiPath.RESERVE.replace(":reserveId", reserveId.toString());
  const { data, isLoading, error } = useQuery<GetReserveData, Error>(
    [ApiPath.RESERVE, reserveId],
    () => callGet(path),
  );
  return {
    reserve: data?.reserve || defaultValues,
    isLoading,
    error,
  };
};
