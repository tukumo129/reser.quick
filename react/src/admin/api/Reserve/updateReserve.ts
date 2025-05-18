import { UseMutationResult, useMutation } from "react-query";
import { callPut } from "@/api/ApiCallBase";
import { ApiPath } from "@/enums/ApiPath";
import { Reserve } from "@/types/Reserve";

export type UpdateReserveParams = {
  reserve: {
    name: string;
    guest_number: number;
    start_date_time: string;
    end_date_time: string;
  };
};

export type UpdateReserveData = {
  reserve: Reserve;
};

export const useUpdateReserveMutation = (
  reserveId: number,
): UseMutationResult<UpdateReserveData, Error, UpdateReserveParams> => {
  const path = ApiPath.RESERVE.replace(":reserveId", reserveId.toString());
  return useMutation<UpdateReserveData, Error, UpdateReserveParams>(
    (params: UpdateReserveParams) => callPut(path, params),
  );
};
