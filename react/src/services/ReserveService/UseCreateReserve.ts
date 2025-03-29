import { UseMutationResult, useMutation } from "react-query";
import { callPost } from "../ApiCallBase";
import { ApiPath } from "../ApiPath";
import { Reserve } from "../../types/Reserve";

export type useCreateReserveParams = {
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
  useCreateReserveParams
> => {
  return useMutation<CreateReserveData, Error, useCreateReserveParams>(
    (params: useCreateReserveParams) => callPost(ApiPath.RESERVES, params),
  );
};
