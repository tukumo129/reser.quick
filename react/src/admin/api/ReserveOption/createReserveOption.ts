import { useMutation, UseMutationResult } from "react-query";
import { callPost } from "@/api/ApiCallBase";
import { ApiPath } from "@/enums/ApiPath";
import { ReserveOption } from "@/types/ReserveOption";

export type CreateReserveOptionParams = {
  reserve_option: {
    name: string;
    slot_time: number;
    price: number;
  };
};

export type CreateReserveOptionData = {
  reserveOption: ReserveOption;
};

export const useCreateReserveOptionMutation = (): UseMutationResult<
  CreateReserveOptionData,
  Error,
  CreateReserveOptionParams
> => {
  return useMutation<CreateReserveOptionData, Error, CreateReserveOptionParams>(
    (params: CreateReserveOptionParams) =>
      callPost(ApiPath.RESERVE_OPTIONS, params),
  );
};
