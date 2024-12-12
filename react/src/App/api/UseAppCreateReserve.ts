import { UseMutationResult, useMutation } from "react-query";
import { Reserve } from "../../types/Reserve";
import { callPost } from "../../services/ApiCallBase";
import { ApiPath } from "../../services/ApiPath";

export type useAppCreateReserveParams = {
  reserve:{
    name: string;
    guest_number: number;
    start_date_time: string;
  }
}

export type AppCreateReserveData = {
  reserve: Reserve;
};

export const useAppCreateReserveMutation = (): UseMutationResult<
  AppCreateReserveData,
  Error,
  useAppCreateReserveParams
> => {
  return useMutation<AppCreateReserveData, Error, useAppCreateReserveParams>(
    (params: useAppCreateReserveParams) => callPost(ApiPath.APP_RESERVES, params),
  )
}
