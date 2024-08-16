import { UseMutationResult, useMutation } from "react-query";
import { callPut } from "../ApiCallBase";
import { ApiPath } from "../ApiPath";
import { Reserve } from "../../types/Reserve";

export type useUpdateReserveParams = {
  reserve:{
    name: string;
    guest_number: number;
    start_date_time: string;
    end_date_time: string;
  }
}

export type UpdateReserveData = {
  reserve: Reserve;
};

export const useUpdateReserveMutation = (reserveId: number): UseMutationResult<
  UpdateReserveData,
  Error,
  useUpdateReserveParams
> => {
  const path = ApiPath.RESERVE.replace(':reserveId', reserveId.toString())
  return useMutation<UpdateReserveData, Error, useUpdateReserveParams>(
    (params: useUpdateReserveParams) => callPut(path, params),
  );
};
