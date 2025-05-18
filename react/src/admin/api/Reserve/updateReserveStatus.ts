import { UseMutationResult, useMutation } from "react-query";
import { callPut } from "@/api/ApiCallBase";
import { ApiPath } from "@/enums/ApiPath";
import { Reserve } from "@/types/Reserve";

export type UpdateReserveStatusParams = {
  reserveId: number;
  status: string;
};

export type UpdateReserveStatusData = {
  reserve: Reserve;
};

export const useUpdateReserveStatusMutation = (): UseMutationResult<
  UpdateReserveStatusData,
  Error,
  UpdateReserveStatusParams
> => {
  return useMutation<UpdateReserveStatusData, Error, UpdateReserveStatusParams>(
    (params: UpdateReserveStatusParams) => {
      const path = ApiPath.RESERVE_STATUS.replace(
        ":reserveId",
        params.reserveId.toString(),
      );
      return callPut(path, params);
    },
  );
};
