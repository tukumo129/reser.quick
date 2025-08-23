import { UseMutationResult, useMutation } from "react-query";
import { callDelete } from "@/api/ApiCallBase";
import { ApiPath } from "@/enums/ApiPath";

export type DeleteReserveOptionParams = {
  reserveOptionId: number;
};

export type DeleteReserveOptionData = null;

export const useDeleteReserveOptionMutation = (): UseMutationResult<
  DeleteReserveOptionData,
  Error,
  DeleteReserveOptionParams
> => {
  return useMutation<DeleteReserveOptionData, Error, DeleteReserveOptionParams>(
    (params: DeleteReserveOptionParams) => {
      const path = ApiPath.RESERVE_OPTION.replace(
        ":reserveOptionId",
        params.reserveOptionId.toString(),
      );
      return callDelete(path);
    },
  );
};
