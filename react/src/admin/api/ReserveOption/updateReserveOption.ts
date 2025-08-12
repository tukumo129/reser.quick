import { UseMutationResult, useMutation } from "react-query";
import { callPut } from "@/api/ApiCallBase";
import { ApiPath } from "@/enums/ApiPath";
import { ReserveOption } from "@/types/ReserveOption";

export type UpdateReserveOptionParams = {
  reserve_option: {
    name: string;
    slot_time: number;
    price: number;
  };
};

export type UpdateReserveOptionData = {
  reserveOption: ReserveOption;
};

export const useUpdateReserveOptionMutation = (
  reserveOptionId: number,
): UseMutationResult<
  UpdateReserveOptionData,
  Error,
  UpdateReserveOptionParams
> => {
  const path = ApiPath.RESERVE_OPTION.replace(
    ":reserveOptionId",
    reserveOptionId.toString(),
  );
  return useMutation<UpdateReserveOptionData, Error, UpdateReserveOptionParams>(
    (params: UpdateReserveOptionParams) => callPut(path, params),
  );
};
