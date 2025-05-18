import { useMutation, UseMutationResult } from "react-query";
import { callPost } from "@/api/ApiCallBase";
import { ApiPath } from "@/enums/ApiPath";
import { Reserve } from "@/types/Reserve";

export type CreateReserveParams = {
  reserve: {
    name: string;
    guest_number: number;
    start_date_time: string;
    end_date_time: string;
  };
};

export type CreateReserveData = {
  reserve: Reserve;
};

export const useCreateReserveMutation = (): UseMutationResult<
  CreateReserveData,
  Error,
  CreateReserveParams
> => {
  return useMutation<CreateReserveData, Error, CreateReserveParams>(
    (params: CreateReserveParams) => callPost(ApiPath.RESERVES, params),
  );
};
